import { useEffect, useState } from "react";
import API from "../utils/api";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const FeedbackCarousel = () => {

    const [feedback, setFeedback] = useState([]);


    useEffect(() => {
        const fetchFeedback = async () => {
            try {
                const { data } = await API.get("/feedback/public");
                setFeedback(data);
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchFeedback();
    }, []);

    return (

        <div className="container my-5">

            <h2 className="text-center fw-bold mb-5">
                ⭐ What Students Say About CampusMart
            </h2>

            <Swiper
                modules={[Autoplay, Pagination]}
                spaceBetween={30}
                slidesPerView={3}
                loop={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false
                }}
                pagination={{ clickable: true }}

                breakpoints={{
                    0: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 }
                }}
            >

                {feedback.map((f) => (

                    <SwiperSlide key={f._id}>

                        <div
                            className="p-4 text-center my-2"
                            style={{
                                backdropFilter: "blur(10px)",
                                background: "rgba(255,255,255,0.15)",
                                borderRadius: "15px",
                                border: "1px solid rgba(255,255,255,0.2)",
                                boxShadow: "0 8px 20px rgba(6, 0, 0, 0.1)"
                            }}
                        >

                            {/* USER IMAGE */}

                            <img
                                src={`http://localhost:6550/uploads/${f.user?.profilepic}`}
                                alt="user"
                                className="rounded-circle mb-3"
                                style={{
                                    width: "70px",
                                    height: "70px",
                                    objectFit: "cover"
                                }}
                            />

                            {/* USER NAME */}

                            <h5 className="fw-bold text-dark">
                                {f.user?.username}
                            </h5>

                            {/* MESSAGE */}

                            <p className="text-muted mt-2">
                                "{f.message}"
                            </p>

                            {/* STAR RATING */}

                            <div>

                                {[1, 2, 3, 4, 5].map((star) => (
                                    <i
                                        key={star}
                                        className={`fa-star mx-1 ${star <= f.rating ? "fas text-warning" : "far text-muted"}`}
                                    ></i>
                                ))}

                            </div>

                        </div>

                    </SwiperSlide>

                ))}

            </Swiper>

        </div>
    );
};

export default FeedbackCarousel;