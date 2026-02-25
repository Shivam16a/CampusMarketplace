import React, { useState } from "react";
import API from "../utils/api";

const AddItem = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "Books",
    price: "",
    condition: "Used",
    exchangeOption: false,
    images: [],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, images: e.target.files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "images") {
        for (let i = 0; i < formData.images.length; i++) {
          data.append("images", formData.images[i]);
        }
      } else {
        data.append(key, formData[key]);
      }
    });

    try {
      await API.post("/items", data);
      alert("Item Added Successfully");
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  return (
    <div className="container mt-4">
      <h3>Add Item</h3>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Item Name" onChange={handleChange} required className="form-control mb-2" />
        <textarea name="description" placeholder="Description" onChange={handleChange} required className="form-control mb-2" />
        
        <select name="category" onChange={handleChange} className="form-control mb-2">
          <option>Books</option>
          <option>Gadgets</option>
          <option>Stationery</option>
          <option>Others</option>
        </select>

        <input name="price" type="number" placeholder="Price" onChange={handleChange} className="form-control mb-2" />

        <select name="condition" onChange={handleChange} className="form-control mb-2">
          <option>New</option>
          <option>Used</option>
        </select>

        <div className="form-check mb-2">
          <input type="checkbox" name="exchangeOption" onChange={handleChange} className="form-check-input" />
          <label>Exchange Option</label>
        </div>

        <input type="file" multiple onChange={handleImageChange} className="form-control mb-2" />

        <button className="btn btn-primary">Add Item</button>
      </form>
    </div>
  );
};

export default AddItem;