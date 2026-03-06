import React from "react";
import { motion } from "framer-motion";
import "../styles/custom.css";

const HelpCenter = () => {
    return (
        <motion.div
            className="container mt-5 help-page"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >

            {/* Title */}

            <h1 className="text-center mb-4">
                <img src="/vite.svg" alt="logo" width={35} className="me-2" />
                CampusMart Help Center
            </h1>

            <p className="text-center text-muted">
                Find answers to common questions and learn how to safely buy and sell on CampusMart.
            </p>

            {/* FAQ Section */}

            <h3 className="mt-5 mb-3 text-primary">
                <i className="fa-solid fa-circle-question me-2"></i>
                Frequently Asked Questions
            </h3>

            <div className="accordion shadow rounded" id="faq">

                {/* FAQ 1 */}

                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button" data-bs-toggle="collapse" data-bs-target="#faq1">
                            What is CampusMart?
                        </button>
                    </h2>

                    <div id="faq1" className="accordion-collapse collapse show" data-bs-parent="#faq">
                        <div className="accordion-body">
                            CampusMart is a student marketplace where you can buy and sell items such as books,
                            electronics, accessories, and other campus essentials.
                        </div>
                    </div>
                </div>

                {/* FAQ 2 */}

                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#faq2">
                            How can I sell an item?
                        </button>
                    </h2>

                    <div id="faq2" className="accordion-collapse collapse" data-bs-parent="#faq">
                        <div className="accordion-body">
                            Login to your account and go to the Contact page. Fill the contact form and
                            write "Hello sir, I want to sell my product on this platform" and submit
                            the form. Our team will review your request and contact you.
                        </div>
                    </div>
                </div>

                {/* FAQ 3 */}

                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#faq3">
                            How do I contact a seller?
                        </button>
                    </h2>

                    <div id="faq3" className="accordion-collapse collapse" data-bs-parent="#faq">
                        <div className="accordion-body">
                            Click the View button on a particular item. Then click the "Purchase Request"
                            button. After that go to the "My Orders" page where you can see product
                            details and the seller contact information. From there you can click the
                            WhatsApp button to chat with the seller.
                        </div>
                    </div>
                </div>

                {/* FAQ 4 */}

                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#faq4">
                            Is CampusMart free to use?
                        </button>
                    </h2>

                    <div id="faq4" className="accordion-collapse collapse" data-bs-parent="#faq">
                        <div className="accordion-body">
                            Yes, CampusMart is completely free for students. You can browse items,
                            contact sellers, and request purchases without any platform charges.
                        </div>
                    </div>
                </div>

            </div>

            {/* Buyer Guidelines */}

            <h3 className="mt-5 mb-3 text-success">
                <i className="fa-solid fa-cart-shopping me-2"></i>
                Buyer Guidelines
            </h3>

            <ul className="list-group">
                <li className="list-group-item">Always verify the product before making payment.</li>
                <li className="list-group-item">Meet the seller in a safe campus location.</li>
                <li className="list-group-item">Avoid paying full amount in advance.</li>
                <li className="list-group-item">Ask questions about the product condition.</li>
            </ul>

            {/* Seller Guidelines */}

            <h3 className="mt-5 mb-3 text-warning">
                <i className="fa-solid fa-store me-2"></i>
                Seller Guidelines
            </h3>

            <ul className="list-group">
                <li className="list-group-item">Provide clear images of the product.</li>
                <li className="list-group-item">Write honest descriptions of the item.</li>
                <li className="list-group-item">Respond quickly to buyer messages.</li>
                <li className="list-group-item">Do not post fake or misleading listings.</li>
            </ul>

            {/* Report Item */}

            <h3 className="mt-5 mb-3 text-danger">
                <i className="fa-solid fa-flag me-2"></i>
                Report an Item
            </h3>

            <p>If you find a suspicious or fake listing, please report it to the admin.</p>

            <button className="btn btn-danger px-4 shadow">
                <i className="fa-solid fa-triangle-exclamation me-2"></i>
                Report Listing
            </button>

            {/* Contact Support */}

            <h3 className="mt-5 mb-3 text-info">
                <i className="fa-solid fa-headset me-2"></i>
                Contact Support
            </h3>

            <p>If you need further help, you can contact our support team.</p>

            <ul className="list-group mb-5">
                <li className="list-group-item">
                    <i className="fa-solid fa-envelope me-2"></i>
                    Email: support@campusmart.com
                </li>
                <li className="list-group-item">
                    <i className="fa-solid fa-phone me-2"></i>
                    Phone: +91 8002632535
                </li>
            </ul>

        </motion.div>
    );
};

export default HelpCenter;