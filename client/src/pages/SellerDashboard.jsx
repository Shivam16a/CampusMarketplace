import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";

const SellerDashboard = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyItems = async () => {
    try {
      const { data } = await api.get("/items/my-items");
      setItems(data);
    } catch (error) {
      console.error(error.response?.data?.message || "Error fetching items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyItems();
  }, []);

  const deleteHandler = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?"))
      return;

    try {
      await api.delete(`/items/${id}`);
      setItems(items.filter((item) => item._id !== id));
    } catch (error) {
      alert(error.response?.data?.message || "Delete failed");
    }
  };

  const statuscolor = (roles) => {
    switch (roles) {
      case "Available":
        return "bg-success";
      case "Sold":
        return "bg-warning";
      default:
        return "bg-danger";
    }
  }

  const updateStatus = async (id, newStatus) => {
    try {
      await api.put(`/items/status/${id}`, { status: newStatus });

      setItems((prevItems) =>
        prevItems.map((item) =>
          item._id === id ? { ...item, status: newStatus } : item
        )
      );
    } catch (error) {
      alert("Status update failed");
    }
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>My Listed Items</h3>
        <Link to="/add-item" className="btn btn-primary">
          + Add New Item
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="alert alert-info text-center">
          You haven't listed any items yet.
        </div>
      ) : (
        <div className="row">
          {items.map((item) => (
            <div key={item._id} className="col-md-4 mb-4">
              <div className="card shadow-sm h-100">

                {/* Image */}
                <img
                  src={`http://localhost:6550/uploads/${item.images[0]}`}
                  className="card-img-top"
                  alt={item.name}
                  style={{ height: "200px", objectFit: "cover" }}
                />

                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="text-muted mb-1">₹{item.price}</p>

                  {/* Status Badge */}
                  <span
                    className={`badge mb-2 ${statuscolor(item.status)}`}
                  >
                    {item.status || "available"}
                  </span>

                  <div className="mt-auto">
                    <Link
                      to={`/edit-item/${item._id}`}
                      className="btn btn-warning btn-sm me-2"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => deleteHandler(item._id)}
                      className="btn btn-danger btn-sm me-2"
                    >
                      Delete
                    </button>

                    <select
                      value={item.status || "available"}
                      onChange={(e) => updateStatus(item._id, e.target.value)}
                      className="form-select form-select-sm"
                    >
                      <option value="Available">Available</option>
                      <option value="Reserved">Reserved</option>
                      <option value="Sold">Sold</option>
                    </select>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SellerDashboard;