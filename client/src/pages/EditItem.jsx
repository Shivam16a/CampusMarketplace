import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../utils/api";

const EditItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    condition: "",
    exchangeOption: false,
  });

  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);

  // Fetch item data
  useEffect(() => {
    const fetchItem = async () => {
      const { data } = await API.get(`/items/${id}`);
      setFormData({
        name: data.name,
        description: data.description,
        category: data.category,
        price: data.price,
        condition: data.condition,
        exchangeOption: data.exchangeOption,
      });
      setExistingImages(data.images);
    };

    fetchItem();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    setNewImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    for (let i = 0; i < newImages.length; i++) {
      data.append("images", newImages[i]);
    }

    await API.put(`/items/${id}`, data);

    alert("Item Updated Successfully");
    navigate("/my-listings");
  };

  return (
    <div className="container mt-4">
      <h3>Edit Item</h3>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="form-control mb-2"
          required
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="form-control mb-2"
          required
        />

        <select
          name="category"
          value={formData.category}
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
          value={formData.price}
          onChange={handleChange}
          className="form-control mb-2"
        />

        <select
          name="condition"
          value={formData.condition}
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
            checked={formData.exchangeOption}
            onChange={handleChange}
            className="form-check-input"
          />
          <label>Exchange Option</label>
        </div>

        <div className="mb-3">
          <label>Existing Images:</label>
          <div className="d-flex gap-2 mt-2">
            {existingImages.map((img, index) => (
              <img
                key={index}
                src={`http://localhost:6550/uploads/${img}`}
                alt=""
                width="80"
                height="80"
                style={{ objectFit: "cover" }}
              />
            ))}
          </div>
        </div>

        <input
          type="file"
          multiple
          onChange={handleImageChange}
          className="form-control mb-3"
        />

        <button className="btn btn-primary">Update Item</button>
      </form>
    </div>
  );
};

export default EditItem;