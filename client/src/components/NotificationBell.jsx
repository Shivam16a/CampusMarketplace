import { useEffect, useState } from "react";
import API from "../utils/api";

const NotificationBell = () => {

    const [notifications, setNotifications] = useState([]);

    const fetchNotifications = async () => {
        const { data } = await API.get("/notifications");
        setNotifications(data);
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    const markRead = async (id) => {
        await API.put(`/notifications/read/${id}`);
        fetchNotifications();
    };

    const unread = notifications.filter((n) => !n.read).length;

    return (
        <div className="dropdown">

            {/* Bell Icon */}
            <button
                className="btn position-relative"
                data-bs-toggle="dropdown"
            >
                <i className="fa fa-bell fs-5"></i>

                {unread > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {unread}
                    </span>
                )}
            </button>

            {/* Notification Box */}
            <ul
                className="dropdown-menu dropdown-menu-end shadow p-0"
                style={{
                    width: "330px",
                    maxHeight: "380px",
                    overflowY: "auto",
                    overflowX: "hidden"
                }}
            >

                <li className="dropdown-header fw-bold border-bottom">
                    <i className="fa fa-bell me-2"></i>
                    Notifications
                </li>

                {notifications.length === 0 && (
                    <li className="text-center text-muted small p-3">
                        No notifications
                    </li>
                )}

                {notifications.map((n) => (
                    <li
                        key={n._id}
                        onClick={() => markRead(n._id)}
                        className={`dropdown-item small border-bottom ${!n.read ? "bg-light fw-semibold" : ""}`}
                        style={{
                            whiteSpace: "normal",
                            wordBreak: "break-word",
                            cursor: "pointer"
                        }}
                    >
                        <div className="d-flex align-items-start">

                            <i className="fa fa-user-circle text-primary me-2 mt-1"></i>

                            <div>

                                <div className="fw-bold">
                                    {n.sender?.username || "Admin"}
                                </div>

                                <div className="text-muted">
                                    {n.message}
                                </div>

                            </div>

                        </div>

                    </li>
                ))}

            </ul>

        </div>
    );
};

export default NotificationBell;