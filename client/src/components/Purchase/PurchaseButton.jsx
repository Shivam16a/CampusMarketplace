import React from "react";
import { useNavigate } from "react-router-dom";
import API from "../../utils/api";

const PurchaseButton = ({ itemId }) => {
  const navigate = useNavigate();
  const handleRequest = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (!userInfo) {
        navigate("/login");
      } else {
        await API.post(`/purchase/${itemId}`);
        alert("Purchase Request Sent");
      }
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