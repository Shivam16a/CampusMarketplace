import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
    return (
        <div className="d-flex">
            <Navbar />
            <div className="main-content flex-grow-1 p-4">
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;