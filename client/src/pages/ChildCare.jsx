import { useState } from "react";
import { useLocation } from "wouter";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { Baby, Clock, Star, Shield, CheckCircle } from "lucide-react";
// If you don't have this yet, I can help you build it too
import RatingStars from "../components/RatingStars.jsx";

export default function ChildCare() {
    const [, setLocation] = useLocation();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedService, setSelectedService] = useState("");

    const services = [
        {
            id: 1,
            title: "Professional Babysitting",
            description: "Experienced and caring babysitters for your little ones",
            icon: <Baby className="w-6 h-6" />,
            price: "₹500/hour",
            rating: 4.9,
            features: [
                "Age-appropriate Activities",
                "Meal Preparation",
                "Basic First Aid",
                "Regular Updates"
            ]
        },
        {
            id: 2,
            title: "Child Healthcare",
            description: "Specialized healthcare services for children",
            icon: <Baby className="w-6 h-6" />,
            price: "₹1000/visit",
            rating: 4.8,
            features: [
                "Regular Check-ups",
                "Vaccination Support",
                "Growth Monitoring",
                "Nutrition Guidance"
            ]
        },
        {
            id: 3,
            title: "Baby Massage",
            description: "Therapeutic massage for babies and toddlers",
            icon: <Baby className="w-6 h-6" />,
            price: "₹800/session",
            rating: 4.7,
            features: [
                "Infant Massage",
                "Developmental Support",
                "Sleep Improvement",
                "Bonding Activities"
            ]
        },
        {
            id: 4,
            title: "Specialized Care",
            description: "Expert care for children with special needs",
            icon: <Baby className="w-6 h-6" />,
            price: "₹1200/hour",
            rating: 4.9,
            features: [
                "Special Needs Support",
                "Therapeutic Activities",
                "Behavioral Support",
                "Family Guidance"
            ]
        }
    ];

    const handleServiceClick = (serviceId) => {
        setLocation(`/child-care/${serviceId}`);
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-50 to-white py-16 lg:py-24">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                            Professional Child Care Services
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Trust your children with our experienced caregivers. We provide comprehensive child care services tailored to your family's needs.
                        </p>
                    </div>

                    <div className="max-w-3xl mx-auto">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <input
                                type="text"
                                placeholder="Search child care services..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="flex-1 px-4 py-2 border border-gray-300 rounded"
                            />
                            <select
                                value={selectedService}
                                onChange={(e) => setSelectedService(e.target.value)}
                                className="w-[200px] px-4 py-2 border border-gray-300 rounded"
                            >
                                <option value="">Service Type</option>
                                <option value="babysitting">Babysitting</option>
                                <option value="healthcare">Child Healthcare</option>
                                <option value="massage">Baby Massage</option>
                                <option value="specialized">Specialized Care</option>
                            </select>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8">
                    {services.map((service) => (
                        <div
                            key={service.id}
                            className="border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow p-6"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-700">
                                        {service.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold">{service.title}</h3>
                                        <div className="flex items-center gap-2">
                                            <RatingStars rating={service.rating} />
                                            <span className="text-sm text-gray-600">{service.rating}</span>
                                        </div>
                                    </div>
                                </div>
                                <span className="bg-green-100 text-green-700 px-3 py-1 text-sm rounded-full flex items-center">
                                    <Shield className="w-3 h-3 mr-1" />
                                    Verified
                                </span>
                            </div>

                            <p className="text-gray-600 mb-4">{service.description}</p>

                            <ul className="mb-6 space-y-2 text-sm text-gray-700">
                                {service.features.map((feature, index) => (
                                    <li key={index} className="flex items-center">
                                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <div className="flex justify-between items-center">
                                <span className="text-lg font-semibold">{service.price}</span>
                                <button
                                    onClick={() => handleServiceClick(service.id)}
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="bg-gray-50 py-16">
                <div className="max-w-7xl mx-auto px-4 text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900">Why Choose Our Child Care Services</h2>
                    <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
                        Experience peace of mind with our comprehensive child care solutions
                    </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-4">
                    {[
                        {
                            icon: <Shield className="w-8 h-8" />,
                            title: "Certified Caregivers",
                            description: "All our caregivers are thoroughly vetted and certified"
                        },
                        {
                            icon: <Clock className="w-8 h-8" />,
                            title: "Flexible Hours",
                            description: "24/7 availability to match your schedule"
                        },
                        {
                            icon: <Star className="w-8 h-8" />,
                            title: "Quality Care",
                            description: "Consistently high-quality child care services"
                        },
                        {
                            icon: <CheckCircle className="w-8 h-8" />,
                            title: "Verified Reviews",
                            description: "Real feedback from satisfied parents"
                        }
                    ].map((item, index) => (
                        <div key={index} className="text-center">
                            <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center text-blue-700">
                                {item.icon}
                            </div>
                            <h3 className="text-lg font-bold">{item.title}</h3>
                            <p className="text-gray-600 mt-2">{item.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            <div className="text-center my-12">
                <button
                    onClick={() => {
                        setLocation("/");
                        setTimeout(() => {
                            const el = document.getElementById("services-section");
                            if (el) el.scrollIntoView({ behavior: "smooth" });
                        }, 100); // Wait briefly for the DOM to load
                    }}
                    className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
                >
                    ← Go to Services
                </button>
            </div>


            <Footer />
        </div>
    );
}
