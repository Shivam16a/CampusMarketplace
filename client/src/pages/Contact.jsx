import React, { useState } from "react";
import API from "../utils/api";
import "../index.css";

const Contact = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const [loading, setLoading] = useState(false);
    const [responseMsg, setResponseMsg] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await API.post("/contact/send", formData);
            setResponseMsg(res.data.message);
            setFormData({ name: "", email: "", message: "" });
        } catch (error) {
            setResponseMsg("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (<div className="container py-5">

        <div className="row align-items-center">

            {/* RIGHT SIDE - CONTACT FORM */}
            <div className="col-lg-6 order-lg-2 order-1 mb-4 mb-lg-0">
                <div className="card shadow border-0 p-4 contact-card">
                    <h4 className="mb-4 text-center text-primary">
                        Get in Touch with CampusMart
                    </h4>

                    {responseMsg && (
                        <div className="alert alert-info">{responseMsg}</div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">
                                <i className="fa-solid fa-user me-2"></i>Your Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Enter your name"
                                autoComplete="off"
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">
                                <i className="fa-solid fa-envelope me-2"></i>Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Enter your email"
                                autoComplete="off"
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">
                                <i className="fa-solid fa-message me-2"></i>Message
                            </label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows="4"
                                className="form-control"
                                placeholder="Write your message..."
                                required
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-100 submit-btn"
                            disabled={loading}
                        >
                            {loading ? "Sending..." : "Send Message 🚀"}
                        </button>
                    </form>
                </div>
            </div>

            {/* LEFT SIDE - IMAGE + TEXT */}
            <div className="col-lg-6 order-lg-1 order-2 text-center text-lg-start">
                <img
                    src="https://illustrations.popsy.co/amber/digital-nomad.svg"
                    alt="contact illustration"
                    className="img-fluid mb-4"
                    style={{ maxHeight: "320px" }}
                />
                <h2 className="fw-bold mb-3">
                    Let's Build Something Amazing 🚀
                </h2>
                <p className="text-muted">
                    Got a question, suggestion, or idea? Drop a message and we’ll get
                    back to you as soon as possible.
                </p>
            </div>

        </div>
    </div>

    );
};

export default Contact;
