import React, { useEffect, useState } from "react";
import API from "../utils/api";
import RequestCard from "../components/Purchase/RequestCard";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [requests, setRequests] = useState([]);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const fetchRequests = async () => {
    try {
      const { data } = await API.get("/purchase/seller");
      setRequests(data);
    } catch (error) {
      console.error(error.message || "Failed to load requests");
    }
  };
  //order list

  const statusOrder = {
    Pending: 1,
    Rejected: 2,
    Accepted: 3,
  };

  const sortedRequests = [...requests].sort(
    (a, b) => statusOrder[a.status] - statusOrder[b.status]
  );

  // Fetch Profile Function (Now outside useEffect)
  const fetchProfile = async () => {
    try {
      const { data } = await API.get("/auth/profile");
      setUser(data);
    } catch (error) {
      console.error(error.message || "Failed to load profile");
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchRequests();
  }, []);

  //  Handle Input Change
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Update Profile
  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      await API.put("/auth/profile", user);
      alert("Profile Updated Successfully");
      setEditMode(false);
      fetchProfile();
    } catch (error) {
      console.error(error.message || "Update failed");
    }
  };

  if (!user) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">

          <div className="card border-0 shadow-sm p-4 rounded-4">

            {/* TOP SECTION */}
            <div className="row align-items-center">

              <div className="col-md-4 text-center mb-3 mb-md-0">
                <img
                  src={`https://campusmarketplace-cw77.onrender.com/uploads/${user.profilepic}`}
                  alt="Profile"
                  className="rounded-circle border"
                  width="150"
                  height="150"
                  style={{ objectFit: "cover" }}
                />
              </div>

              <div className="col-md-8">
                <div className="d-flex align-items-center mb-3">
                  <h4 className="fw-bold me-3 mb-0">
                    {user.username}
                  </h4>

                  <button
                    className="btn btn-outline-dark btn-sm"
                    onClick={() => setEditMode(!editMode)}
                  >
                    {editMode ? "Cancel" : "Edit Profile"}
                  </button>
                </div>

                {/* Bio Section */}
                <div className="mt-3">
                  <p><i className="fa fa-envelope me-2"></i>{user.email}</p>
                  <p><i className="fa fa-phone me-2"></i>{user.phone}</p>
                  <p><i className="fa fa-venus-mars me-2"></i>{user.gender}</p>
                  <p><i className="fa fa-university me-2"></i>{user.collagename}</p>
                  <p><i className="fa fa-book me-2"></i>{user.department}</p>
                </div>
              </div>
            </div>

            {/* 🔥 EDIT FORM SLIDE DOWN */}
            <div className={`collapse mt-4 ${editMode ? "show" : ""}`}>
              <div className="card card-body bg-light border-0 rounded-3">

                <form onSubmit={updateProfile}>
                  <div className="row">

                    <div className="col-md-6 mb-3">
                      <input
                        type="text"
                        name="username"
                        className="form-control"
                        value={user.username}
                        onChange={handleChange}
                        placeholder="Username"
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <input
                        type="text"
                        name="phone"
                        className="form-control"
                        value={user.phone}
                        onChange={handleChange}
                        placeholder="Phone"
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <input
                        type="text"
                        name="collegeName"
                        className="form-control"
                        value={user.collagename}
                        onChange={handleChange}
                        placeholder="College Name"
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <input
                        type="text"
                        name="department"
                        className="form-control"
                        value={user.department}
                        onChange={handleChange}
                        placeholder="Department"
                      />
                    </div>

                  </div>

                  <div className="text-end">
                    <button type="submit" className="btn btn-dark btn-sm">
                      Save Changes
                    </button>
                  </div>
                </form>

              </div>
            </div>

            <hr className="my-4" />
          </div>
        </div>
      </div>
      {userInfo?.role === "seller" && (<>
        <div className="mt-4">
          <h5>Purchase Requests</h5>

          {requests.length === 0 ? (
            <p>No requests yet</p>
          ) : (
            sortedRequests.map((req) => (
              <RequestCard key={req._id} request={req} refresh={fetchRequests} />
            ))
          )}
        </div>
      </>)}

    </div>
  );
};

export default Profile;