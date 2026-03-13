import React from "react";
import API from "../../utils/api";
import RequestStatusBadge from "./RequestStatusBadge";

const RequestCard = ({ request, refresh }) => {
  const updateStatus = async (status) => {
    try {
      await API.put(`/purchase/${request._id}`, { status });
      refresh();
    } catch (error) {
      console.error(error.message);
      alert("Action failed");
    }
  };
  // console.log(request);
  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
        <h5>{request.item?.name}</h5>
        <p>Price: ₹{request.item?.price}</p>
        <p>Buyer: {request.buyer?.username}</p>
        <p>Phone: {request.buyer?.phone}</p>

        <RequestStatusBadge status={request.status} />

        {request.status === "Pending" && (
          <div className="mt-3">
            <button
              className="btn btn-success btn-sm me-2"
              onClick={() => updateStatus("Accepted")}
            >
              Accept
            </button>

            <button
              className="btn btn-danger btn-sm"
              onClick={() => updateStatus("Rejected")}
            >
              Reject
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestCard;