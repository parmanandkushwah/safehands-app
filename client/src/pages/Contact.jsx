import { useState } from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import Footer from "../components/Footer";

export default function Contact() {
    const contactInfo = [
        {
            icon: <Phone className="w-6 h-6" />,
            title: "Phone",
            details: ["Customer Support: +91 1800-123-4567", "Emergency: +91 1800-765-4321"],
        },
        {
            icon: <Mail className="w-6 h-6" />,
            title: "Email",
            details: ["Support: support@safehands.com", "Business: business@safehands.com"],
        },
        {
            icon: <MapPin className="w-6 h-6" />,
            title: "Office Address",
            details: ["SafeHands Healthcare", "123 Healthcare Avenue", "Mumbai, Maharashtra 400001"],
        },
        {
            icon: <Clock className="w-6 h-6" />,
            title: "Working Hours",
            details: ["Mon - Fri: 9:00 AM - 6:00 PM", "Sat: 9:00 AM - 2:00 PM", "Sun: Closed"],
        },
    ];

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Message sent successfully!");
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Hero */}
            <section className="bg-gradient-to-r from-blue-50 to-white py-16 lg:py-24">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Contact Us</h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Get in touch with us for any questions or concerns. We're here to help!
                    </p>
                </div>
            </section>

            {/* Info Cards */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {contactInfo.map((info, index) => (
                        <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                                {info.icon}
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-3">{info.title}</h3>
                            <div className="space-y-2 text-sm text-gray-600">
                                {info.details.map((d, i) => (
                                    <p key={i}>{d}</p>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Contact Form */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-3xl mx-auto px-4">
                    <div className="bg-white rounded-lg p-8 shadow-sm">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Enter your name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full border border-gray-300 px-3 py-2 rounded"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full border border-gray-300 px-3 py-2 rounded"
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="Enter your phone number"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 px-3 py-2 rounded"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Subject</label>
                                    <select
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full border border-gray-300 px-3 py-2 rounded bg-white"
                                    >
                                        <option value="">Select a subject</option>
                                        <option value="general">General Inquiry</option>
                                        <option value="support">Technical Support</option>
                                        <option value="billing">Billing Question</option>
                                        <option value="feedback">Feedback</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Message</label>
                                <textarea
                                    name="message"
                                    rows="6"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-300 px-3 py-2 rounded resize-none"
                                    placeholder="Enter your message"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Map Embed */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="overflow-hidden rounded-lg">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.0026938841397!2d72.8282149!3d19.0759837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1647881234567!5m2!1sen!2sin"
                            width="100%"
                            height="450"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="SafeHands Office Location"
                        ></iframe>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
