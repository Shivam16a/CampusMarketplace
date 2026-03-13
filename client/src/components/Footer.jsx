import React from "react";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="campus-footer text-light pt-5 mt-3">
      <div className="container">
        <div className="row gy-4">

          {/* Brand */}
          <div className="col-md-4">
            <h3 className="fw-bold brand text-primary">
              <img src="/vite.svg" alt="logo" width={40}/> CampusMart
            </h3>

            <p className="footer-text">
              CampusMart is a student marketplace where students can easily
              buy and sell used items within the campus community.
              Save money, reduce waste, and help fellow students.
            </p>

            <div className="social-icons mt-3">
              <i className="fa-brands fa-facebook"></i>
              <i className="fa-brands fa-instagram"></i>
              <i className="fa-brands fa-twitter"></i>
              <i className="fa-brands fa-linkedin"></i>
            </div>
          </div>

          {/* Links */}
          <div className="col-md-2">
            <h5 className="footer-title">Quick Links</h5>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/products">Browse Items</a></li>
              <li><a href="/sell">Sell Product</a></li>
              <li><a href="/help">Help Center</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-md-3">
            <h5 className="footer-title">Support</h5>
            <ul className="footer-links">
              <li><a href="/about">About Us</a></li>
              <li><a href="/contact">Contact</a></li>
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/terms">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-md-3">
            <h5 className="footer-title">Contact</h5>

            <p>
              <i className="fa-solid fa-envelope me-2"></i>
              support@campusmart.com
            </p>

            <p>
              <i className="fa-solid fa-phone me-2"></i>
              +91 8002632535
            </p>

            <p>
              <i className="fa-solid fa-location-dot me-2"></i>
              Campus Area, India
            </p>
          </div>

        </div>

        {/* Bottom */}
        <div className="footer-bottom mt-4">
          © {new Date().getFullYear()} CampusMart | Built by Shivam Kumar
        </div>
      </div>
    </footer>
  );
};

export default Footer;