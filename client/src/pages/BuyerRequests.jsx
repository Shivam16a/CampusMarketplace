import React, { useEffect, useState } from "react";
import API from "../utils/api";

const BuyerRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const { data } = await API.get("/purchase/buyer");
      setRequests(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (loading) return <h3 className="text-center mt-5">Loading...</h3>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">My Purchase Requests</h2>

      {requests.length === 0 ? (
        <p>No requests yet.</p>
      ) : (
        <div className="row">
          {requests.map((req) => (
            <div key={req._id} className="col-md-4 mb-4">
              <div className="card shadow">
                <img
                  src={`http://localhost:6550/uploads/${req.item.images[0]}`}
                  className="card-img-top"
                  alt={req.item.name}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5>{req.item.name}</h5>
                  <p>Price: ₹{req.item.price}</p>
                  <p>
                    Seller: <strong>{req.seller.username}</strong>
                  </p>

                  <p>
                    Status:{" "}
                    <span
                      className={`badge ${
                        req.status === "Pending"
                          ? "bg-warning"
                          : req.status === "Accepted"
                          ? "bg-success"
                          : "bg-danger"
                      }`}
                    >
                      {req.status}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BuyerRequests;