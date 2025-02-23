import { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { QrReader } from "react-qr-reader";

// Optional: pre-defined categories, etc.
const products = [
  { id: "P001", category: "Pharmaceuticals", subCategory: "OTC Drugs" },
  { id: "P002", category: "Pharmaceuticals", subCategory: "Prescription Drugs" },
  { id: "P006", category: "PPE",            subCategory: "Gloves" },
  { id: "P007", category: "PPE",            subCategory: "Masks" },
  { id: "P008", category: "Medical Devices", subCategory: "Diagnostic Tools" },
  { id: "P011", category: "Consumables",    subCategory: "Bandages" },
  { id: "P015", category: "Health and Wellness", subCategory: "Vitamins" },
  { id: "P018", category: "Emergency Supplies",  subCategory: "First-Aid" },
];

const categories = [...new Set(products.map((p) => p.category))];

const AddNewProductForm = ({ onClose }) => {
  // Extended form data to store extra fields from QR (batch_id, expiry_date, etc.)
  const [formData, setFormData] = useState({
    product_id: "",
    product_name: "",
    batch_id: "",
    expiry_date: "",
    product_qty: "",
    product_price: "",
    product_location: "",
    category: "",
    subcategory: "",
    threshold_amount: 50,
  });

  // Toggle to show/hide the scanner
  const [showScanner, setShowScanner] = useState(false);
  // Flag to avoid re-scanning the same code
  const [scanned, setScanned] = useState(false);

  // When a QR is detected or there's an error, this function is called
  const handleScanResult = (result, error) => {
    if (result?.text && !scanned) {
      setScanned(true); // prevent multiple triggers
      // Example data:
      // "product_id:65f4901a1234567890abcdea,product_name:Paracetamol500mg,batch_id:65f4951a1234567890abcdea,quantity_in_batch:100,expiry_date:2026-02-23"

      const text = result.text.trim();
      // 1) Split on commas
      const pairs = text.split(",");
      // 2) Build an object from "key:value" pairs
      const dataObj = {};
      pairs.forEach((item) => {
        const [key, value] = item.split(":");
        if (key && value) {
          dataObj[key.trim()] = value.trim();
        }
      });

      console.log("Scanned data:", dataObj);

      // 3) Merge into form data
      setFormData((prev) => ({
        ...prev,
        product_id: dataObj.product_id || prev.product_id,
        product_name: dataObj.product_name || prev.product_name,
        batch_id: dataObj.batch_id || prev.batch_id,
        expiry_date: dataObj.expiry_date || prev.expiry_date,
        product_qty: dataObj.quantity_in_batch || prev.product_qty,
        // You can set others if needed, or keep them as is
      }));

      setShowScanner(false);
      alert("QR code scanned! Fields updated.");
    }

    if (error) {
      console.error("QR Scan Error:", error);
      // You can show an alert or just ignore repeated "No QR found" warnings
    }
  };

  // Handle input changes in normal form fields
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCategoryChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      category: e.target.value,
      subcategory: "",
    }));
  };

  // Submit the form to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convert numeric fields
      const formattedData = {
        ...formData,
        product_price: parseFloat(formData.product_price) || 0,
        product_qty: parseInt(formData.product_qty, 10) || 0,
        threshold_amount: parseInt(formData.threshold_amount, 10) || 0,
      };

      const response = await axios.post(
        "http://localhost:8000/api/products/create",
        formattedData
      );

      alert("Product added successfully");
      console.log(response.data);
      onClose();
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product");
    }
  };

  const filteredSubcategories = formData.category
    ? [
        ...new Set(
          products
            .filter((p) => p.category === formData.category)
            .map((p) => p.subCategory)
        ),
      ]
    : [];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[600px] max-w-xl">
        <h2 className="text-2xl font-medium mb-8 text-left">Add New Product</h2>

        {/* Toggle to open QR scanner */}
        <div className="mb-4">
          <button
            type="button"
            onClick={() => {
              setShowScanner(true);
              setScanned(false); // allow scanning again if user re-opens
            }}
            className="px-4 py-2 bg-green-600 text-white rounded-md"
          >
            Scan QR Code
          </button>
        </div>

        {/* QR Scanner Section */}
        {showScanner && (
          <div className="mb-4">
            <QrReader
              onResult={handleScanResult}
              // If you have a rear camera on your laptop, "environment" might work.
              // Otherwise, try "user" for the front camera:
              constraints={{ facingMode: "environment" }}
              containerStyle={{ width: "100%" }}
            />
            <button
              type="button"
              onClick={() => setShowScanner(false)}
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md"
            >
              Cancel Scan
            </button>
          </div>
        )}

        {/* Our Product Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          {/* Example: Product ID from QR */}
          <div className="col-span-2">
            <label className="block text-sm font-medium mb-2">Product ID</label>
            <input
              type="text"
              name="product_id"
              value={formData.product_id}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium mb-2">
              Product Name
            </label>
            <input
              type="text"
              name="product_name"
              value={formData.product_name}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>

          {/* Example: Batch ID from QR */}
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-2">
              Batch ID
            </label>
            <input
              type="text"
              name="batch_id"
              value={formData.batch_id}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>

          {/* Example: Expiry Date from QR */}
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-2">
              Expiry Date
            </label>
            <input
              type="text"
              name="expiry_date"
              value={formData.expiry_date}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium mb-2">Quantity</label>
            <input
              type="number"
              name="product_qty"
              value={formData.product_qty}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium mb-2">
              Unit Price (Rs.)
            </label>
            <input
              type="number"
              name="product_price"
              value={formData.product_price}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium mb-2">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleCategoryChange}
              className="w-full border px-3 py-2 rounded-md"
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium mb-2">
              Sub Category
            </label>
            <select
              name="subcategory"
              value={formData.subcategory}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md"
              disabled={!formData.category}
              required
            >
              <option value="">Select Subcategory</option>
              {filteredSubcategories.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium mb-2">Location</label>
            <input
              type="text"
              name="product_location"
              value={formData.product_location}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>

          <div className="col-span-2 flex justify-between mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded-md"
            >
              Discard
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

AddNewProductForm.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default AddNewProductForm;
