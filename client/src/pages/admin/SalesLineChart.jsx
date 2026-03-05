import React, { useEffect, useState } from "react";
import API from "../../utils/api";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend
);

const SalesLineChart = () => {
    const [requests, setRequests] = useState([]);

    const fetchRequests = async () => {
        try {
            const { data } = await API.get("/purchase/seller"); // correct route
            setRequests(data);
        } catch (error) {
            console.error("API Error:", error.response?.data || error.message);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const accepted = requests.filter((r) => r.status === "Accepted").length;
    const pending = requests.filter((r) => r.status === "Pending").length;
    const rejected = requests.filter((r) => r.status === "Rejected").length;

    const chartData = {
        labels: ["Pending", "Accepted", "Rejected"],
        datasets: [
            {
                label: "Product Requests",
                data: [pending, accepted, rejected],
                borderColor: "#0d6efd",
                backgroundColor: "#0d6efd",
                tension: 0.4,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { display: true },
        },
    };

    return (
        <div className="container mt-4">
            <h3 className="mb-4">
                <i className="fas fa-sitemap me-2"></i>
                Product Request Analytic Dashboard
            </h3>
            <div className="row g-3 my-3">

                <div className="col-lg-3 col-md-6 col-12">
                    <div className="card shadow border-0 bg-success text-white h-100">
                        <div className="card-body d-flex justify-content-between align-items-center">
                            <div>
                                <h6>Total Accepted</h6>
                                <h4>{accepted}</h4>
                            </div>
                            <i className="fa fa-check-circle fa-2x"></i>
                        </div>
                    </div>
                </div>

                <div className="col-lg-3 col-md-6 col-12">
                    <div className="card shadow border-0 bg-warning text-white h-100">
                        <div className="card-body d-flex justify-content-between align-items-center">
                            <div>
                                <h6>Total Pending</h6>
                                <h4>{pending}</h4>
                            </div>
                            <i className="fa fa-clock fa-2x"></i>
                        </div>
                    </div>
                </div>

                <div className="col-lg-3 col-md-6 col-12">
                    <div className="card shadow border-0 bg-danger text-white h-100">
                        <div className="card-body d-flex justify-content-between align-items-center">
                            <div>
                                <h6>Total Rejected</h6>
                                <h4>{rejected}</h4>
                            </div>
                            <i className="fa fa-times-circle fa-2x"></i>
                        </div>
                    </div>
                </div>

                <div className="col-lg-3 col-md-6 col-12">
                    <div className="card shadow border-0 bg-primary text-white h-100">
                        <div className="card-body d-flex justify-content-between align-items-center">
                            <div>
                                <h6>Total Requests</h6>
                                <h4>{accepted + pending + rejected}</h4>
                            </div>
                            <i className="fa fa-list fa-2x"></i>
                        </div>
                    </div>
                </div>

            </div>
            <div className="card shadow ">
                <div className="card-body">

                    <h5 className="mb-4">
                        <i className="fas fa-chart-line me-2 text-primary"></i>
                        Product Request Analytics
                    </h5>

                    <div className="row text-center mb-4">
                        <div className="col-md-4">
                            <h6 className="text-warning">
                                <i className="fas fa-clock me-1"></i> Pending
                            </h6>
                            <h4>{pending}</h4>
                        </div>

                        <div className="col-md-4">
                            <h6 className="text-success">
                                <i className="fas fa-check-circle me-1"></i> Accepted
                            </h6>
                            <h4>{accepted}</h4>
                        </div>

                        <div className="col-md-4">
                            <h6 className="text-danger">
                                <i className="fas fa-times-circle me-1"></i> Rejected
                            </h6>
                            <h4>{rejected}</h4>
                        </div>
                    </div>

                    <Line data={chartData} options={options} />

                </div>
            </div>
        </div>
    );
};

export default SalesLineChart;