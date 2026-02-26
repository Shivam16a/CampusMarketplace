import React from "react";

const ItemInfo = ({ item }) => {
  return (
    <div className="card p-3 mb-3 shadow-sm">
      <h3>{item.name}</h3>

      <h4 className="text-success">₹ {item.price}</h4>

      <p>{item.description}</p>

      <p><strong>Category:</strong> {item.category}</p>
      <p><strong>Condition:</strong> {item.condition}</p>
      <p><strong>Status:</strong> 
        <span className={`badge ms-2 ${
          item.status === "Available"
            ? "bg-success"
            : item.status === "Reserved"
            ? "bg-warning"
            : "bg-danger"
        }`}>
          {item.status}
        </span>
      </p>

      <p>
        <strong>Exchange Option:</strong>{" "}
        {item.exchangeOption ? "Available" : "Not Available"}
      </p>

      <p className="text-muted">
        Posted on: {new Date(item.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
};

export default ItemInfo;