# collaborative_filtering.py
import numpy as np

def build_interaction_matrix(buyers, products, interactions):
    """
    Build the user-item interaction matrix R.
    Rows correspond to buyers and columns to products.
    R[i,j] = 1 if buyer i interacted with product j, else 0.
    """
    buyer_ids = [buyer['_id'] for buyer in buyers]
    product_ids = [product['_id'] for product in products]
    buyer_to_index = {bid: i for i, bid in enumerate(buyer_ids)}
    product_to_index = {pid: j for j, pid in enumerate(product_ids)}
    num_buyers = len(buyer_ids)
    num_products = len(product_ids)
    R = np.zeros((num_buyers, num_products))
    
    for inter in interactions:
        buyer_id = inter['buyer_id']
        product_id = inter['product_id']
        if buyer_id in buyer_to_index and product_id in product_to_index:
            R[buyer_to_index[buyer_id], product_to_index[product_id]] = 1
    return R, buyer_to_index, product_to_index

def matrix_factorization(R, k=2, epochs=50, lr=0.01, reg=0.1):
    """
    Perform matrix factorization using Stochastic Gradient Descent (SGD).
    Minimize:
       sum_{(i,j) in K} (Rij - U_i^T V_j)^2 + reg (||U_i||^2 + ||V_j||^2)
    (Equations (1) and (2) in our mathematical model.)
    """
    num_buyers, num_products = R.shape
    U = np.random.rand(num_buyers, k)
    V = np.random.rand(num_products, k)
    
    for epoch in range(epochs):
        for i in range(num_buyers):
            for j in range(num_products):
                if R[i, j] > 0:  # update only known interactions
                    error = R[i, j] - np.dot(U[i, :], V[j, :])
                    U[i, :] += lr * (error * V[j, :] - reg * U[i, :])
                    V[j, :] += lr * (error * U[i, :] - reg * V[j, :])
    R_pred = np.dot(U, V.T)
    return U, V, R_pred