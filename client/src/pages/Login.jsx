import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:6550/api/auth/login",
        { email, password }
      );

      // Save token in localStorage
      localStorage.setItem("userInfo", JSON.stringify(data));

      alert("Login Successful ✅",data);

      // redirect (agar react-router use kar rahe ho)
      window.location.href = "/";

    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
    >
      <div
        className="card shadow-lg p-4"
        style={{
          width: "100%",
          maxWidth: "400px",
          borderRadius: "20px",
          transition: "transform 0.4s ease",
        }}
      >
        <h3 className="text-center mb-4 fw-bold text-primary">
          <i className="fas fa-user-circle me-2"></i>
          Login
        </h3>

        {error && (
          <div className="alert alert-danger text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-3">
            <label className="form-label fw-semibold">
              <i className="fas fa-envelope me-2 text-primary"></i>
              Email
            </label>
            <input
              type="email"
              className="form-control rounded-pill"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label fw-semibold">
              <i className="fas fa-lock me-2 text-primary"></i>
              Password
            </label>
            <input
              type="password"
              className="form-control rounded-pill"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="btn btn-primary w-100 rounded-pill fw-semibold"
          >
            <i className="fas fa-sign-in-alt me-2"></i>
            Login
          </button>
        </form>

        <div className="text-center mt-3">
          <small>
            Don’t have an account?{" "}
            <a href="/register" className="fw-bold text-decoration-none">
              Register
            </a>
          </small>
        </div>
      </div>

      {/* 3D Hover */}
      <style>
        {`
          .card:hover {
            transform: perspective(1000px) rotateX(5deg) rotateY(5deg);
            box-shadow: 0px 10px 0px #ccc,10px 0px 20px #ccc !important;
          }
        `}
      </style>
    </div>
  );
};

export default Login;