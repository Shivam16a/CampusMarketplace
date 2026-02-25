import React, { useEffect, useState } from "react";
import API from "../utils/api";
import { Link } from "react-router-dom";

const AllItems = () => {
    const [items, setItems] = useState([]);
    const [keyword, setKeyword] = useState("");

    const fetchItems = async () => {
        const { data } = await API.get(`/items?keyword=${keyword}`);
        setItems(data);
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
                {items.map((item) => (
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