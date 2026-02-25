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
      console.log(err.response?.data?.message  || "something wents wrong");
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="row w-100">
        <div className="col-11 col-sm-10 col-md-8 col-lg-6 mx-auto">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-body p-4 p-md-5">

              {/* Title */}
              <div className="text-center mb-4">
                <h3 className="fw-bold">Register</h3>
                <p className="text-muted small">
                  Create your ExchangeCircle account
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="row">

                  {/* Username */}
                  <div className="col-md-6 mb-3">
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
                  <div className="col-md-6 mb-3">
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
                  <div className="col-md-6 mb-3">
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
                  <div className="col-md-6 mb-3">
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
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* College Name */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">
                      <i className="fa fa-university me-2 text-primary"></i>
                      College Name
                    </label>
                    <input
                      type="text"
                      name="collagemane"
                      className="form-control"
                      placeholder="Enter college name"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Department */}
                  <div className="col-md-6 mb-3">
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
                  <div className="col-12 mb-3">
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

                {/* Register Button */}
                <div className="d-grid mt-3">
                  <button type="submit" className="btn btn-primary btn-lg">
                    <i className="fa fa-user-plus me-2"></i>
                    Register
                  </button>
                </div>

                {/* Login Link */}
                <div className="text-center mt-3">
                  <p className="small mb-0">
                    Already have an account?{" "}
                    <a href="/login" className="fw-semibold text-decoration-none">
                      Login
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

export default Register;