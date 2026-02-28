import React from "react";
import API from "../../utils/api";

const PurchaseButton = ({ itemId }) => {
  const handleRequest = async () => {
    try {
      await API.post(`/purchase/${itemId}`);
      alert("Purchase Request Sent ✅");
    } catch (error) {
      alert(error.response?.data?.message || "Request failed");
    }
  };

  return (
    <button className="btn btn-primary w-100 mt-3" onClick={handleRequest}>
      Request to Buy
    </button>
  );
};

export default PurchaseButton;