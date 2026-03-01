import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const AdminLayout = () => {
    const location = useLocation();

    return (
        <div className="d-flex">

            {/* SIDEBAR */}
            <div
                className="bg-dark text-white p-3"
                style={{ width: "250px", minHeight: "100vh" }}
            >
                <h4 className="mb-4">
                    <i className="fa fa-user-shield me-2"></i>
                    Admin Panel
                </h4>

                <ul className="nav flex-column">

                    <li className="nav-item mb-2">
                        <Link
                            to="/admin/dashboard"
                            className={`nav-link text-white ${location.pathname.includes("dashboard") && "bg-secondary"
                                }`}
                        >
                            <i className="fa fa-chart-pie me-2"></i>
                            Dashboard
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link
                            to="/admin/users"
                            className={`nav-link text-white ${location.pathname.includes("users") && "bg-secondary"
                                }`}
                        >
                            <i className="fa fa-users me-2"></i>
                            Manage Users
                        </Link>
                    </li>

                </ul>
            </div>

            {/* CONTENT */}
            <div className="flex-grow-1 p-4 bg-light">
                <Outlet />
            </div>

        </div>
    );
};

export default AdminLayout;