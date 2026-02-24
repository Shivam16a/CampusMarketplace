import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    gender: "",
    collagemane: "",
    department: "",
    password: "",
  });

  const [profilepic, setProfilepic] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const dataToSend = new FormData();

      Object.keys(formData).forEach((key) => {
        dataToSend.append(key, formData[key]);
      });

      if (profilepic) {
        dataToSend.append("profilepic", profilepic);
      }

      const { data } = await axios.post(
        "http://localhost:6550/api/auth/register",
        dataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      localStorage.setItem("userInfo", JSON.stringify(data));

      alert("Registration Successful ✅");
      window.location.href = "/";

    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center py-5"
      style={{
        // background: "linear-gradient(135deg, #1e3c72, #2a5298)",
        minHeight: "100vh",
      }}
    >
      <div
        className="card shadow-lg p-4"
        style={{
          width: "100%",
          maxWidth: "500px",
          borderRadius: "20px",
          transition: "transform 0.4s ease",
        }}
      >
        <h3 className="text-center mb-4 fw-bold text-primary">
          <i className="fas fa-user-plus me-2"></i>
          Register
        </h3>

        {error && (
          <div className="alert alert-danger text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div className="mb-3">
            <label className="form-label">
              <i className="fas fa-user me-2 text-primary"></i>
              Username
            </label>
            <input
              type="text"
              name="username"
              className="form-control rounded-pill"
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label">
              <i className="fas fa-envelope me-2 text-primary"></i>
              Email
            </label>
            <input
              type="email"
              name="email"
              className="form-control rounded-pill"
              onChange={handleChange}
              required
            />
          </div>

          {/* Phone */}
          <div className="mb-3">
            <label className="form-label">
              <i className="fas fa-phone me-2 text-primary"></i>
              Phone
            </label>
            <input
              type="number"
              name="phone"
              className="form-control rounded-pill"
              onChange={handleChange}
              required
            />
          </div>

          {/* Gender */}
          <div className="mb-3">
            <label className="form-label">
              <i className="fas fa-venus-mars me-2 text-primary"></i>
              Gender
            </label>
            <select
              name="gender"
              className="form-select rounded-pill"
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          {/* College */}
          <div className="mb-3">
            <label className="form-label">
              <i className="fas fa-university me-2 text-primary"></i>
              College Name
            </label>
            <input
              type="text"
              name="collagemane"
              className="form-control rounded-pill"
              onChange={handleChange}
              required
            />
          </div>

          {/* Department */}
          <div className="mb-3">
            <label className="form-label">
              <i className="fas fa-book me-2 text-primary"></i>
              Department
            </label>
            <input
              type="text"
              name="department"
              className="form-control rounded-pill"
              onChange={handleChange}
              required
            />
          </div>

          {/* Profile Pic */}
          <div className="mb-3">
            <label className="form-label">
              <i className="fas fa-image me-2 text-primary"></i>
              Profile Picture
            </label>
            <input
              type="file"
              className="form-control"
              onChange={(e) => setProfilepic(e.target.files[0])}
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label">
              <i className="fas fa-lock me-2 text-primary"></i>
              Password
            </label>
            <input
              type="password"
              name="password"
              className="form-control rounded-pill"
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 rounded-pill fw-semibold"
          >
            <i className="fas fa-user-check me-2"></i>
            Register
          </button>
        </form>

        <div className="text-center mt-3">
          <small>
            Already have an account?{" "}
            <a href="/login" className="fw-bold text-decoration-none">
              Login
            </a>
          </small>
        </div>
      </div>

      {/* 3D Hover Animation */}
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

export default Register;