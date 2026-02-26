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
  });

  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    if (selectedFiles.length + images.length > 5) {
      alert("Maximum 5 images allowed");
      return;
    }

    setImages([...images, ...selectedFiles]);
  };

  const removeImage = (index) => {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (images.length < 3) {
      alert("Minimum 3 images required");
      return;
    }

    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    images.forEach((img) => {
      data.append("images", img);
    });

    try {
      await API.post("/items", data);
      alert("Item Added Successfully");
      setImages([]);
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  return (
    <div className="container mt-4">
      <h3>Add Item</h3>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Item Name"
          onChange={handleChange}
          required
          className="form-control mb-2"
        />

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          required
          className="form-control mb-2"
        />

        <select
          name="category"
          onChange={handleChange}
          className="form-control mb-2"
        >
          <option>Books</option>
          <option>Gadgets</option>
          <option>Stationery</option>
          <option>Others</option>
        </select>

        <input
          name="price"
          type="number"
          placeholder="Price"
          onChange={handleChange}
          className="form-control mb-2"
        />

        <select
          name="condition"
          onChange={handleChange}
          className="form-control mb-2"
        >
          <option>New</option>
          <option>Used</option>
        </select>

        <div className="form-check mb-2">
          <input
            type="checkbox"
            name="exchangeOption"
            onChange={handleChange}
            className="form-check-input"
          />
          <label>Exchange Option</label>
        </div>

        {/* Image Upload */}
        <input
          type="file"
          multiple
          onChange={handleImageChange}
          className="form-control mb-2"
        />

        <small className="text-muted">
          Minimum 3 images required. Maximum 5 allowed.
        </small>

        {/* Image Preview */}
        <div className="d-flex gap-2 mt-3 flex-wrap">
          {images.map((img, index) => (
            <div key={index} style={{ position: "relative" }}>
              <img
                src={URL.createObjectURL(img)}
                alt="preview"
                width="100"
                height="100"
                style={{ objectFit: "cover", borderRadius: "8px" }}
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                style={{
                  position: "absolute",
                  top: "-5px",
                  right: "-5px",
                  background: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "50%",
                  width: "20px",
                  height: "20px",
                  fontSize: "12px",
                }}
              >
                ×
              </button>
            </div>
          ))}
        </div>

        <button className="btn btn-primary mt-3">
          Add Item
        </button>
      </form>
    </div>
  );
};

export default AddItem;