import React, { useEffect, useState } from "react";
import API from "../utils/api";
import { Link } from "react-router-dom";

const AllItems = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [keyword, setKeyword] = useState("");

    const fetchItems = async () => {
        try {
            setLoading(true);
            const { data } = await API.get(`/items?keyword=${keyword}`);
            setItems(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchItems();
    }, [keyword]);

    return (
        <div className="container mt-4">
            <h3>All Items</h3>

            <input
                type="text"
                placeholder="Search item..."
                className="form-control mb-3"
                onChange={(e) => setKeyword(e.target.value)}
            />

            <div className="row">
                {loading
                    ? Array(6).fill().map((_, index) => (
                        <div className="col-md-4 mb-3" key={index}>
                            <div className="card">
                                <div
                                    className="card-img-top bg-secondary"
                                    style={{ height: "200px", opacity: 0.3 }}
                                ></div>
                                <div className="card-body">
                                    <div
                                        className="bg-secondary mb-2"
                                        style={{ height: "20px", width: "70%", opacity: 0.3 }}
                                    ></div>
                                    <div
                                        className="bg-secondary mb-2"
                                        style={{ height: "20px", width: "40%", opacity: 0.3 }}
                                    ></div>
                                    <div
                                        className="bg-secondary"
                                        style={{ height: "30px", width: "50%", opacity: 0.3 }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    ))
                    : items.map((item) => (
                        <div className="col-md-4 mb-3" key={item._id}>
                            <div className="card">
                                {item.images[0] && (
                                    <img
                                        src={`http://localhost:6550/uploads/${item.images[0]}`}
                                        className="card-img-top"
                                        alt=""
                                    />
                                )}
                                <div className="card-body">
                                    <h5>{item.name}</h5>
                                    <p>₹ {item.price}</p>
                                    <Link to={`/item/${item._id}`} className="btn btn-sm btn-primary">
                                        View
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default AllItems;