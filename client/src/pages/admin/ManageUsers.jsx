import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../../utils/api";

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();

    const query = new URLSearchParams(location.search);
    const keyword = query.get("search") || "";

    const fetchUsers = async (searchKeyword = "") => {
        try {
            let url = "/auth/all"; // default: all users
            if (searchKeyword) url = `/admin/search?search=${searchKeyword}`; // search query

            const { data } = await API.get(url);
            setUsers(data);
        } catch (error) {
            console.log(error.message);
        }
    };


    useEffect(() => {
        fetchUsers(keyword);
    }, [keyword]);

    const deleteUser = async (id) => {
        if (!window.confirm("Delete this user?")) return;

        await API.delete(`/auth/admin/${id}`);
        setUsers(users.filter((u) => u._id !== id));
    };

    const toggleBan = async (id) => {
        await API.put(`/admin/ban/${id}`);
        fetchUsers();
    };

    const handleBack = () => {
        navigate("/admin/users"); 
    };


    return (
        <div>
            <h3 className="mb-4">
                <i className="fa fa-users me-2"></i>
                Manage Users
            </h3>
            {/* Back Button for Search */}
            {keyword && (
                <button
                    className="btn btn-secondary mb-3"
                    onClick={handleBack}
                >
                    <i className="fa fa-arrow-left me-2"></i>
                    Back to All Users
                </button>
            )}
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