import React, { useEffect, useState } from "react";
import API from "../../utils/api";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);

    const fetchStats = async () => {
        const { data } = await API.get("/admin/stats");
        setStats(data);
    };

    useEffect(() => {
        fetchStats();
    }, []);

    if (!stats) return <div className="text-center mt-5">Loading...</div>;

    const chartData = {
        labels: ["Users", "Sellers", "Banned", "Items"],
        datasets: [
            {
                label: "System Overview",
                data: [
                    stats.totalUsers,
                    stats.totalSellers,
                    stats.bannedUsers,
                    stats.totalItems,
                ],
                backgroundColor: ["#0d6efd", "#198754", "#dc3545", "#ffc107"],
            },
        ],
    };

    return (
        <div className="container mt-4">
            <h3 className="mb-4">
                <i className="fa fa-user-shield me-2"></i>
                Admin Dashboard
            </h3>

            <div className="row">

                <StatCard title="Total Users" value={stats.totalUsers} icon="fa-users" bg="primary" />
                <StatCard title="Sellers" value={stats.totalSellers} icon="fa-store" bg="success" />
                <StatCard title="Banned" value={stats.bannedUsers} icon="fa-ban" bg="danger" />
                <StatCard title="Total Items" value={stats.totalItems} icon="fa-box" bg="warning" />

            </div>

            <div className="card shadow p-4 mt-4">
                <h5>
                    <i className="fa fa-chart-bar me-2"></i>
                    System Overview
                </h5>
                <Bar data={chartData} />
            </div>
        </div>
    );
};

const StatCard = ({ title, value, icon, bg }) => (
    <div className="col-md-3 mb-3">
        <div className={`card bg-${bg} text-white shadow`}>
            <div className="card-body d-flex justify-content-between">
                <div>
                    <h6>{title}</h6>
                    <h4>{value}</h4>
                </div>
                <i className={`fa ${icon} fa-2x`}></i>
            </div>
        </div>
    </div>
);

export default AdminDashboard;