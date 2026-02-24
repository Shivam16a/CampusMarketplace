import React, { useState, useEffect } from "react";
import './styles/Navbar.css'

const Navbar = () => {
  const [open, setOpen] = useState(false);

  // Example: user localStorage se le rahe hain
  const user = JSON.parse(localStorage.getItem("userInfo"));

  return (
    <>
      {/* Toggle Button (Mobile) */}
      <button
        className="btn btn-dark d-md-none position-fixed m-3"
        style={{ zIndex: "1050" }}
        onClick={() => setOpen(!open)}
      >
        <i className="fas fa-bars"></i>
      </button>

      {/* Sidebar */}
      <div className={`glass-sidebar ${open ? "active" : ""}`}>

        {/* Top Logo */}
        <div className="text-center mb-4">
          <h4 className="fw-bold text-white">
            <i className="fas fa-layer-group me-2"></i>
            ExchangeCircle
          </h4>
        </div>

        {/* Menu */}
        <ul className="nav flex-column flex-grow-1">

          <li className="nav-item mb-3">
            <a href="/" className="nav-link text-white">
              <i className="fas fa-home me-2"></i> Dashboard
            </a>
          </li>

          <li className="nav-item mb-3">
            <a href="/profile" className="nav-link text-white">
              <i className="fas fa-user me-2"></i> Profile
            </a>
          </li>

          <li className="nav-item mb-3">
            <a href="/users" className="nav-link text-white">
              <i className="fas fa-users me-2"></i> Users
            </a>
          </li>

          <li className="nav-item mb-3">
            <a href="/settings" className="nav-link text-white">
              <i className="fas fa-cog me-2"></i> Settings
            </a>
          </li>

        </ul>

        {/* Bottom Profile Section */}
        <div className="profile-section text-center text-white mt-auto">
          <div className="profile-img mb-2">
            <img
              src={
                user?.profilepic
                  ? `http://localhost:6550/uploads/${user.profilepic}`
                  : "https://via.placeholder.com/80"
              }
              alt="Profile"
            />
          </div>
          <h6 className="mb-1">{user?.username || "Guest User"}</h6>
          <a href="/login" className="text-danger small">
            <i className="fas fa-sign-out-alt me-1"></i> Logout
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;