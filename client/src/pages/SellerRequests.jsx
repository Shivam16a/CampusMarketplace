import React, { useEffect, useState } from "react";
import API from "../utils/api";
import RequestCard from "../components/Purchase/RequestCard";

const SellerRequests = () => {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const { data } = await API.get("/purchase/seller");
      setRequests(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="container mt-4">
      <h3>Incoming Purchase Requests</h3>

      {requests.length === 0 ? (
        <p>No requests yet.</p>
      ) : (
        requests.map((req) => (
          <RequestCard
            key={req._id}
            request={req}
            refresh={fetchRequests}
          />
        ))
      )}
    </div>
  );
};

export default SellerRequests;