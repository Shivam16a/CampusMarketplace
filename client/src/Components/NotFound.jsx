import React from "react";

const NotFound = () => {
  return (
    <div className="container text-center py-5">
      <h1 className="display-3 text-danger">404</h1>
      <h4>Page Not Found</h4>
      <a href="/" className="btn btn-primary mt-3">
        Go Back Home
      </a>
    </div>
  );
};

export default NotFound;