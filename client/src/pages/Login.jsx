import React, { useState } from "react";
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:6550/api/auth/login",
        formData
      );

      localStorage.setItem("userInfo", JSON.stringify(data));

      alert("Login Successful", data);

      window.location.href = "/";

    } catch (err) {
      console.log(err.response?.data?.message  || "something wents wrong");
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="row w-100">
        <div className="col-11 col-sm-8 col-md-6 col-lg-4 mx-auto">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-body p-4 p-md-5">

              {/* Title */}
              <div className="text-center mb-4">
                <h3 className="fw-bold">Login</h3>
                <p className="text-muted small">
                  Welcome back to <span className="fw-semibold">ExchangeCircle</span>
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit}>

                {/* Email */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    <i className="fa fa-envelope me-2 text-primary"></i>
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="form-control form-control-lg"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Password */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    <i className="fa fa-lock me-2 text-primary"></i>
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    className="form-control form-control-lg"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Login Button */}
                <div className="d-grid mb-3">
                  <button type="submit" className="btn btn-primary btn-lg">
                    <i className="fa fa-sign-in me-2"></i>
                    Login
                  </button>
                </div>

                {/* Register Link */}
                <div className="text-center">
                  <p className="mb-0 small">
                    Don't have an account?{" "}
                    <a href="/register" className="text-decoration-none fw-semibold">
                      Register
                    </a>
                  </p>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;