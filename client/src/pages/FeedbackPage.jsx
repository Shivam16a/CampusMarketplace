import { useState } from "react";
import API from "../utils/api";
import { toast } from "react-toastify";

const FeedbackPage = () => {

    const [message, setMessage] = useState("");
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    const submitFeedback = async (e) => {
        e.preventDefault();

        await API.post("/feedback", {
            message,
            rating
        });

        toast.success("Feedback Submitted");

        setMessage("");
        setRating(0);
    };

    return (

        <div className="container mt-5">

            <h2 className="mb-4 text-center">Give Your Feedback</h2>

            <form onSubmit={submitFeedback} className="card p-4 shadow">

                {/* STAR RATING */}

                <div className="mb-3 text-center">

                    {[1, 2, 3, 4, 5].map((star) => (

                        <i
                            key={star}
                            className={`fa-star fa-2x mx-1 ${star <= (hover || rating) ? "fas text-warning" : "far text-secondary"}`}
                            style={{ cursor: "pointer" }}
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHover(star)}
                            onMouseLeave={() => setHover(0)}
                        ></i>

                    ))}

                </div>

                {/* MESSAGE */}

                <textarea
                    className="form-control mb-3"
                    placeholder="Write your feedback..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                />

                <button className="btn btn-primary">
                    Submit Feedback
                </button>

            </form>

        </div>

    );
};

export default FeedbackPage;