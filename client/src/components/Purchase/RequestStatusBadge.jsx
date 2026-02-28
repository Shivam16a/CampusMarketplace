import React from "react";

const RequestStatusBadge = ({ status }) => {
  let color = "secondary";

  if (status === "Pending") color = "warning";
  if (status === "Accepted") color = "success";
  if (status === "Rejected") color = "danger";

  return <span className={`badge bg-${color}`}>{status}</span>;
};

export default RequestStatusBadge;