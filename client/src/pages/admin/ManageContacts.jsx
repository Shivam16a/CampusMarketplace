import React, { useEffect, useState } from "react";
import API from "../../utils/api";
import { motion } from "framer-motion";

const ManageContacts = () => {
    const [contacts, setContacts] = useState([]);

    const fetchContact = async () => {
        try {
            const { data } = await API.get("/contact/getall");
            setContacts(data.contacts); // array set
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchContact();
    }, []);

    return (
        <div className="container py-4">
            <h2 className="text-center mb-4 fw-bold">📩 Manage Contacts</h2>

            <div className="row">
                {contacts?.map((contact, index) => (
                    <div className="col-md-6 col-lg-4 mb-4" key={contact._id}>

                        <motion.div
                            className="card shadow border-0 h-100"
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <div className="card-body">

                                <h5 className="card-title fw-bold text-primary">
                                    <i className="fa fa-user me-2"></i>
                                    {contact.name}
                                </h5>

                                <p className="card-text text-muted">
                                    <i className="fa fa-envelope me-2 text-danger"></i>
                                    {contact.email}
                                </p>

                                <p className="card-text">
                                    <i className="fa fa-comment me-2 text-success"></i>
                                    {contact.message}
                                </p>

                                <p className="text-muted small mt-3">
                                    <i className="fa fa-clock me-1"></i>
                                    {new Date(contact.createdAt).toLocaleString()}
                                </p>

                            </div>
                        </motion.div>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageContacts;