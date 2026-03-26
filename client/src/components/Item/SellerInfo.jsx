import React from "react";

const SellerInfo = ({ seller }) => {
  if (!seller) return null;

  return (
    <div className="card p-3 shadow-sm">
      <h5>Seller Information</h5>

      {seller.profilepic && (
        <img
          src={`https://campusmarketplace-cw77.onrender.com/uploads/${seller.profilepic}`}
          alt="seller"
          className="rounded-circle mb-2"
          width="80"
          height="80"
        />
      )}

      <p><strong>Name:</strong> {seller.username}</p>
      <p><strong>Email:</strong> {seller.email}</p>
      <p><strong>College Name:</strong> {seller.collagename}</p>
    </div>
  );
};

export default SellerInfo;