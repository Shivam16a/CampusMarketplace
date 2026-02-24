import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState({});
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const fetchProfile = async () => {
    const { data } = await axios.get(
      "http://localhost:6550/api/auth/profile",
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    setUser(data);
  };

  useEffect(() => {
    if (!userInfo) {
      window.location.href = "/login";
    } else {
      fetchProfile();
    }
  }, []);

  const updateProfile = async () => {
    await axios.put(
      "http://localhost:6550/api/auth/profile",
      user,
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    alert("Profile Updated");
    fetchProfile();
  };

  const deleteProfile = async () => {
    if (window.confirm("Delete your account?")) {
      await axios.delete(
        "http://localhost:6550/api/auth/profile",
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      localStorage.removeItem("userInfo");
      window.location.href = "/login";
    }
  };

  return (
    <div className="container-fluid p-4">
      <div className="card shadow p-4">

        <h4 className="mb-3">My Profile</h4>

        {/* Profile Image */}
        <div className="text-center mb-3">
          <img
            src={
              user.profilepic
                ? `http://localhost:6550/uploads/${user.profilepic}`
                : "https://via.placeholder.com/120"
            }
            alt="Profile"
            className="rounded-circle"
            style={{ width: "120px", height: "120px", objectFit: "cover" }}
          />
        </div>

        {/* Username */}
        <input
          className="form-control mb-2"
          value={user.username || ""}
          onChange={(e) =>
            setUser({ ...user, username: e.target.value })
          }
        />

        {/* Email */}
        <input
          className="form-control mb-2"
          value={user.email || ""}
          onChange={(e) =>
            setUser({ ...user, email: e.target.value })
          }
        />

        {/* Role (readonly) */}
        <input
          className="form-control mb-3"
          value={user.role || ""}
          disabled
        />

        <button
          className="btn btn-success me-2"
          onClick={updateProfile}
        >
          Update
        </button>

        <button
          className="btn btn-danger"
          onClick={deleteProfile}
        >
          Delete Account
        </button>

      </div>
    </div>
  );
};

export default Profile;