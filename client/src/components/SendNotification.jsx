import { useState } from "react";
import API from "../utils/api";

const SendNotification = () => {

    const [username, setUsername] = useState("");
    const [message, setMessage] = useState("");

    const sendHandler = async (e) => {
        e.preventDefault();

        try {

            await API.post("/notifications/send", {
                username,
                message,
            });

            alert("Notification Sent");

            setUsername("");
            setMessage("");

        } catch (error) {
            alert("Error sending notification");
        }
    };

    return (
        <div className="container mt-4">

            <div className="row justify-content-center">

                <div className="col-lg-6 col-md-8 col-sm-12">

                    <div className="card shadow">

                        <div className="card-header bg-primary text-white">

                            <i className="fa fa-bell me-2"></i>
                            Send Notification

                        </div>

                        <div className="card-body">

                            <form onSubmit={sendHandler}>

                                <div className="mb-3">

                                    <label className="form-label">
                                        <i className="fa fa-user me-2"></i>
                                        Username
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter username"
                                        autoComplete="off"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />

                                </div>

                                <div className="mb-3">

                                    <label className="form-label">
                                        <i className="fa fa-message me-2"></i>
                                        Message
                                    </label>

                                    <textarea
                                        className="form-control"
                                        rows="4"
                                        placeholder="Enter notification message"
                                        autoComplete="off"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        required
                                    />

                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                >
                                    <i className="fa fa-paper-plane me-2"></i>
                                    Send Notification
                                </button>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default SendNotification;