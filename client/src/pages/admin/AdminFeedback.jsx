import { useEffect, useState } from "react";
import API from "../../utils/api";
import { motion } from "framer-motion";

const AdminFeedback = () => {

    const [feedback, setFeedback] = useState([]);

    const fetchFeedback = async () => {
        const { data } = await API.get("/feedback");
        setFeedback(data);
    };

    useEffect(() => {
        fetchFeedback();
    }, []);

    const deleteFeedback = async (id) => {
        await API.delete(`/feedback/${id}`);
        fetchFeedback();
    };

    return (

        <div className="container py-4">

            <h2 className="text-center mb-4 fw-bold">
                ⭐ Manage Feedback
            </h2>

            <div className="row">

                {feedback?.map((f, index) => (

                    <div className="col-md-6 col-lg-4 mb-4" key={f._id}>

                        <motion.div
                            className="card shadow border-0 h-100"
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                        >

                            <div className="card-body">

                                {/* USER */}

                                <h5 className="card-title fw-bold text-primary">
                                    <i className="fa fa-user me-2"></i>
                                    {f.user?.username}
                                </h5>

                                {/* MESSAGE */}

                                <p className="card-text">
                                    <i className="fa fa-comment me-2 text-success"></i>
                                    {f.message}
                                </p>

                                {/* RATING */}

                                <p className="mb-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <i
                                            key={star}
                                            className={`fa-star ${star <= f.rating ? "fas text-warning" : "far text-muted"}`}
                                        ></i>
                                    ))}
                                </p>

                                {/* DATE */}

                                <p className="text-muted small">
                                    <i className="fa fa-clock me-1"></i>
                                    {new Date(f.createdAt).toLocaleString()}
                                </p>

                                {/* DELETE BUTTON */}

                                <button
                                    className="btn btn-sm btn-danger mt-2"
                                    onClick={() => deleteFeedback(f._id)}
                                >
                                    <i className="fa fa-trash me-1"></i>
                                    Delete
                                </button>

                            </div>

                        </motion.div>

                    </div>

                ))}

            </div>

        </div>

    );
};

export default AdminFeedback;