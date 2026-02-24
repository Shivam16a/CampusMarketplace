import React, { useEffect, useState } from "react";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const fetchUsers = async () => {
    const { data } = await axios.get(
      "http://localhost:6550/api/auth/all",
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 🔴 Delete User
  const deleteUser = async (id) => {
    if (window.confirm("Delete this user?")) {
      await axios.delete(
        `http://localhost:6550/api/auth/admin/${id}`,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      fetchUsers();
    }
  };

  // 🟢 Update User Role / Admin
  const updateUser = async () => {
    await axios.put(
      `http://localhost:6550/api/auth/admin/${editUser._id}`,
      editUser,
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    setEditUser(null);
    fetchUsers();
  };

  return (
    <div className="container-fluid p-4 main-content">
      <h2 className="mb-4">
        <i className="fas fa-users me-2"></i>All Users
      </h2>

      <div className="table-responsive">
        <table className="table table-bordered table-hover shadow">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Admin</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, index) => (
              <tr key={u._id}>
                <td>{index + 1}</td>
                <td>{u.username}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>{u.isAdmin ? "Yes" : "No"}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => setEditUser(u)}
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => deleteUser(u._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editUser && (
        <div className="card p-3 mt-4 shadow">
          <h5>Edit User</h5>

          <select
            className="form-select mb-2"
            value={editUser.role}
            onChange={(e) =>
              setEditUser({ ...editUser, role: e.target.value })
            }
          >
            <option value="user">User</option>
            <option value="Seller">Seller</option>
          </select>

          <div className="form-check mb-2">
            <input
              type="checkbox"
              className="form-check-input"
              checked={editUser.isAdmin}
              onChange={(e) =>
                setEditUser({ ...editUser, isAdmin: e.target.checked })
              }
            />
            <label className="form-check-label">
              Is Admin
            </label>
          </div>

          <button className="btn btn-success" onClick={updateUser}>
            Update
          </button>
        </div>
      )}
    </div>
  );
};

export default Users;