import React from "react";

const SellerStatsCard = ({ title, value, icon, color }) => {
    return (
        <div className="col-md-3 mb-4">
            <div className={`card shadow-sm border-0 ${color} text-white`}>
                <div className="card-body d-flex justify-content-between align-items-center">
                    <div>
                        <h6>{title}</h6>
                        <h4>{value}</h4>
                    </div>
                    <i className={`fa ${icon} fa-2x`}></i>
                </div>
            </div>
        </div>
    );
};

export default SellerStatsCard;