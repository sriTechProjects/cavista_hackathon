import { useState } from "react";
import PropTypes from "prop-types";

const AddNewProductForm = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    unit: "",
    price: "",
    actualPrice: "",
    status: "available",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[600px] max-w-xl">
        <h2 className="text-2xl font-medium mb-8 text-left">Add New Product</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-2">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium mb-2">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium mb-2">Unit Type</label>
            <input
              type="text"
              name="unit"
              value={formData.unit}
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
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>

          <div className="col-span-2 flex justify-between mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-[#f1f1f1] shadow-sm rounded-md"
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
  onSubmit: PropTypes.func.isRequired,
};

export default AddNewProductForm;
