import React, { useEffect, useState } from "react";
import API from "../utils/api";

const MyListings = () => {
  const [items, setItems] = useState([]);

  const fetchMyItems = async () => {
    const { data } = await API.get("/items/my-items");
    setItems(data);
  };

  useEffect(() => {
    fetchMyItems();
  }, []);

  const deleteItem = async (id) => {
    await API.delete(`/items/${id}`);
    fetchMyItems();
  };

  const updateStatus = async (id, status) => {
    await API.put(`/items/status/${id}`, { status });
    fetchMyItems();
  };

  return (
    <div className="container mt-4">
      <h3>My Listings</h3>

      {items.map((item) => (
        <div key={item._id} className="card mb-3 p-3">
          <h5>{item.name}</h5>
          <p>Status: {item.status}</p>

          <select
            onChange={(e) => updateStatus(item._id, e.target.value)}
            className="form-select mb-2"
          >
            <option>Available</option>
            <option>Reserved</option>
            <option>Sold</option>
          </select>

          <button
            className="btn btn-danger btn-sm"
            onClick={() => deleteItem(item._id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default MyListings;