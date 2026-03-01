import React, { useEffect, useState } from "react";
import API from "../../utils/api";

const ManageUsers = () => {
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        const { data } = await API.get("/auth/all");
        setUsers(data);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const deleteUser = async (id) => {
        if (!window.confirm("Delete this user?")) return;

        await API.delete(`/auth/admin/${id}`);
        setUsers(users.filter((u) => u._id !== id));
    };

    const toggleBan = async (id) => {
        await API.put(`/admin/ban/${id}`);
        fetchUsers();
    };

    return (
        <div>
            <h3 className="mb-4">
                <i className="fa fa-users me-2"></i>
                Manage Users
            </h3>

            <div className="table-responsive">
                <table className="table table-bordered table-hover">

                    <thead className="table-dark">
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                    {user.isBanned ? (
                                        <span className="badge bg-danger">Banned</span>
                                    ) : (
                                        <span className="badge bg-success">Active</span>
                                    )}
                                </td>
                                <td>
                                    <button
                                        onClick={() => toggleBan(user._id)}
                                        className="btn btn-warning btn-sm me-2"
                                    >
                                        <i className="fa fa-ban"></i>
                                    </button>

                                    <button
                                        onClick={() => deleteUser(user._id)}
                                        className="btn btn-danger btn-sm"
                                    >
                                        <i className="fa fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default ManageUsers;