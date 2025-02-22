# content_based_filtering.py
import numpy as np

def build_category_mapping():
    # Fixed order of categories (for one-hot encoding)
    categories = ["Fruits", "Vegetables", "Snacks", "Rice", "Flour", "Spices", "Sugar", "Salt", "Oil", "Ghee", "Beverages", "Sweets"]
    cat_to_index = {cat: i for i, cat in enumerate(categories)}
    return cat_to_index, len(categories)

def get_item_feature_vectors(products):
    """
    For each product, create a feature vector X_j.
    Uses a one-hot encoding for the product category (12 dimensions) and appends a normalized price.
    """
    cat_to_index, cat_dim = build_category_mapping()
    max_price = max(product['unit_price'] for product in products)
    feature_vectors = {}
    for product in products:
        one_hot = np.zeros(cat_dim)
        category = product['category']
        if category in cat_to_index:
            one_hot[cat_to_index[category]] = 1
        price_norm = product['unit_price'] / max_price  # normalized price in [0,1]
        feature_vector = np.concatenate([one_hot, [price_norm]])
        feature_vectors[product['_id']] = feature_vector
    return feature_vectors

def build_user_profiles(buyers, interactions, item_feature_vectors):
    """
    Build a user preference profile P_i as the average of the feature vectors for items the user interacted with.
    (Implements Equation (3) in our model.)
    """
    user_profiles = {buyer['_id']: [] for buyer in buyers}
    for inter in interactions:
        buyer_id = inter['buyer_id']
        product_id = inter['product_id']
        if product_id in item_feature_vectors:
            user_profiles[buyer_id].append(item_feature_vectors[product_id])
    user_profiles_avg = {}
    for buyer_id, vectors in user_profiles.items():
        if vectors:
            user_profiles_avg[buyer_id] = np.mean(vectors, axis=0)
        else:
            user_profiles_avg[buyer_id] = np.zeros(len(next(iter(item_feature_vectors.values()))))
    return user_profiles_avg

def compute_content_scores(buyers, products, interactions):
    """
    Compute content-based recommendation scores R̂_ij = P_i^T X_j.
    (Implements Equation (4) in our model.)
    """
    item_feature_vectors = get_item_feature_vectors(products)
    user_profiles = build_user_profiles(buyers, interactions, item_feature_vectors)
    scores = {}
    for buyer in buyers:
        buyer_id = buyer['_id']
        scores[buyer_id] = {}
        for product in products:
            product_id = product['_id']
            Xj = item_feature_vectors[product_id]
            Pi = user_profiles[buyer_id]
            scores[buyer_id][product_id] = np.dot(Pi, Xj)
    return scores

def get_bundle_recommendations(selected_product_id, products, top_n=3):
    """
    For a given product (already purchased), compute cosine similarity with all other products 
    based on content features and return the top_n most similar products.
    This provides a "bundled" recommendation.
    """
    from numpy.linalg import norm
    
    item_feature_vectors = get_item_feature_vectors(products)
    if selected_product_id not in item_feature_vectors:
        return []
    selected_vector = item_feature_vectors[selected_product_id]
    similarities = []
    for product in products:
        pid = product['_id']
        if pid == selected_product_id:
            continue
        vec = item_feature_vectors[pid]
        # Compute cosine similarity
        cos_sim = np.dot(selected_vector, vec) / (norm(selected_vector) * norm(vec) + 1e-8)
        similarities.append((pid, cos_sim))
    # Sort by descending similarity and return top_n recommendations
    similarities.sort(key=lambda x: x[1], reverse=True)
    return similarities[:top_n]