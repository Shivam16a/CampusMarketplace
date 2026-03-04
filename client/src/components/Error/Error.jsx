import React from "react";
import "./Error.css";

const ErrorPage = () => {
    return (
        <div className="error-container d-flex align-items-center justify-content-center text-center">
            <div className="content">
                <img
                    src="https://cdn-icons-png.flaticon.com/512/564/564619.png"
                    alt="404"
                    className="error-img mb-4"
                />

                <h1 className="display-1 fw-bold text-white glitch">404</h1>
                <h3 className="text-light mb-3">Oops! Page Not Found</h3>
                <p className="text-light opacity-75 mb-4">
                    The page you are looking for might have been removed or is temporarily unavailable.
                </p>

                <a href="/" className="btn btn-warning px-4 py-2 fw-semibold home-btn">
                    Go Back Home
                </a>
            </div>
        </div>
    );
};

export default ErrorPage;