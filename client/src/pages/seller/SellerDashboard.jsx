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

const SellerDashboard = () => {
    const [stats, setStats] = useState(null);

    const fetchStats = async () => {
        try {
            const { data } = await API.get("/seller/stats");
            setStats(data);
        } catch (error) {
            console.log("Failed to load stats");
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    if (!stats) return <div className="text-center mt-5">Loading...</div>;

    const chartData = {
        labels: ["Total Listings", "Sold Items", "Active Listings"],
        datasets: [
            {
                label: "Performance",
                data: [
                    stats.totalListings,
                    stats.totalSold,
                    stats.activeListings,
                ],
                backgroundColor: ["#0d6efd", "#198754", "#ffc107"],
            },
        ],
    };

    return (
        <div className="container mt-4">

            <h3 className="mb-4">
                <i className="fa fa-store me-2"></i>
                Seller Analytics Dashboard
            </h3>

            {/* STAT CARDS */}
            <div className="row">

                <div className="col-md-3 mb-3">
                    <div className="card shadow border-0 bg-primary text-white">
                        <div className="card-body d-flex justify-content-between">
                            <div>
                                <h6>Total Listings</h6>
                                <h4>{stats.totalListings}</h4>
                            </div>
                            <i className="fa fa-list fa-2x"></i>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <div className="card shadow border-0 bg-success text-white">
                        <div className="card-body d-flex justify-content-between">
                            <div>
                                <h6>Total Sold</h6>
                                <h4>{stats.totalSold}</h4>
                            </div>
                            <i className="fa fa-check-circle fa-2x"></i>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <div className="card shadow border-0 bg-warning text-dark">
                        <div className="card-body d-flex justify-content-between">
                            <div>
                                <h6>Active Listings</h6>
                                <h4>{stats.activeListings}</h4>
                            </div>
                            <i className="fa fa-box fa-2x"></i>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <div className="card shadow border-0 bg-dark text-white">
                        <div className="card-body d-flex justify-content-between">
                            <div>
                                <h6>Total Earnings</h6>
                                <h4>₹{stats.totalEarnings}</h4>
                            </div>
                            <i className="fa fa-rupee-sign fa-2x"></i>
                        </div>
                    </div>
                </div>

            </div>

            {/* CHART */}
            <div className="card shadow p-4 mt-4">
                <h5 className="mb-3">
                    <i className="fa fa-chart-bar me-2"></i>
                    Performance Overview
                </h5>
                <Bar data={chartData} />
            </div>

        </div>
    );
};

export default SellerDashboard;