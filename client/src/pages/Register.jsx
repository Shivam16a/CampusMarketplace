import React, { useState } from "react";
import API from "../utils/api";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    gender: "",
    collagename: "",
    department: "",
    password: "",
  });

  const [profilepic, setProfilepic] = useState(null);
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

      const { data } = await API.post("/auth/register",
        dataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      localStorage.setItem("userInfo", JSON.stringify(data));

      toast.success("Registration Successful ✅");
      window.location.href = "/";

    } catch (err) {
      toast.warning(err.response?.data?.message);
      console.log(err.response?.data?.message || "something wents wrong");
    }
  };

  return (
    <div className="container-fluid py-3 py-md-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8 col-xl-6">
          <div className="card shadow-lg border-0 rounded-4 w-100">
            <div className="card-body p-3 p-sm-4 p-md-5">

              {/* Title */}
              <div className="text-center mb-4">
                <h3 className="fw-bold">
                  <img src="/vite.svg" width={35} alt="logo" /> Register
                </h3>
                <p className="text-muted small">
                  Create your CampusMart account
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="row g-3">

                  {/* Username */}
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">
                      <i className="fa fa-user me-2 text-primary"></i>
                      Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      className="form-control"
                      placeholder="Enter username"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">
                      <i className="fa fa-envelope me-2 text-primary"></i>
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Enter email"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">
                      <i className="fa fa-phone me-2 text-primary"></i>
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      className="form-control"
                      placeholder="Enter phone number"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Gender */}
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">
                      <i className="fa fa-venus-mars me-2 text-primary"></i>
                      Gender
                    </label>
                    <select
                      name="gender"
                      className="form-select"
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Gender</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>

                  {/* College */}
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">
                      <i className="fa fa-university me-2 text-primary"></i>
                      College Name
                    </label>
                    <input
                      type="text"
                      name="collagename"
                      className="form-control"
                      placeholder="Enter college name"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Department */}
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">
                      <i className="fa fa-book me-2 text-primary"></i>
                      Department
                    </label>
                    <input
                      type="text"
                      name="department"
                      className="form-control"
                      placeholder="Enter department"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Profile Picture */}
                  <div className="col-12">
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
                  <div className="col-12">
                    <label className="form-label fw-semibold">
                      <i className="fa fa-lock me-2 text-primary"></i>
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Enter password"
                      onChange={handleChange}
                      required
                    />
                  </div>

                </div>

                {/* Button */}
                <div className="d-grid mt-4">
                  <button className="btn btn-primary btn-lg">
                    <i className="fa fa-user-plus me-2"></i>
                    Register
                  </button>
                </div>

                {/* Login */}
                <div className="text-center mt-3">
                  <p className="small">
                    Already have an account?{" "}
                    <Link to="/login" className="fw-semibold text-decoration-none">
                      Login
                    </Link>
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

export default Register;