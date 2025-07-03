import { useLocation } from "wouter";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Shield, Clock, Star, CheckCircle, Heart } from "lucide-react";
import RatingStars from "../components/RatingStars";

export default function ElderlyCare() {
    const [, setLocation] = useLocation();

    const services = [
        {
            title: "Companionship & Mental Support",
            description: "Friendly interaction, emotional support, and companionship to improve overall well-being.",
            price: "₹1,200/day",
            rating: 4.8,
            features: [
                "Daily Conversations",
                "Games and Memory Exercises",
                "Emotional Well-being",
                "Loneliness Prevention"
            ]
        },
        {
            title: "Assisted Living Help",
            description: "Support with daily tasks like bathing, dressing, and medication reminders.",
            price: "₹1,800/day",
            rating: 4.9,
            features: [
                "Meal Preparation",
                "Toileting and Hygiene",
                "Mobility Assistance",
                "Medication Reminders"
            ]
        },
        {
            title: "Health Monitoring",
            description: "Regular check-ins on vitals and chronic condition management.",
            price: "₹1,400/day",
            rating: 4.7,
            features: [
                "Blood Pressure Monitoring",
                "Diabetes Management",
                "Fall Prevention",
                "Vital Tracking"
            ]
        },
        {
            title: "Post-Hospitalization Recovery",
            description: "Professional support for elderly patients recovering at home after hospital stays.",
            price: "₹2,200/day",
            rating: 4.8,
            features: [
                "Wound Dressing",
                "Medication Schedule",
                "Nutritional Support",
                "Doctor Coordination"
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-yellow-50 to-white py-16 lg:py-24">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                        Compassionate Elderly Care Services
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        We ensure safety, dignity, and comfort for your loved ones. Personalized care from verified professionals.
                    </p>
                </div>
            </section>

            {/* Services */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8">
                    {services.map((service, idx) => (
                        <div key={idx} className="border border-gray-200 rounded-lg shadow-sm p-6 hover:shadow-lg transition-shadow">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-xl font-semibold">{service.title}</h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <RatingStars rating={service.rating} />
                                        <span className="text-sm text-gray-600">{service.rating}</span>
                                    </div>
                                </div>
                                <span className="bg-green-100 text-green-700 px-3 py-1 text-sm rounded-full flex items-center">
                  <Shield className="w-3 h-3 mr-1" />
                  Verified
                </span>
                            </div>

                            <p className="text-gray-600 mb-4">{service.description}</p>

                            <ul className="mb-6 space-y-2 text-sm text-gray-700">
                                {service.features.map((feature, i) => (
                                    <li key={i} className="flex items-center">
                                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <div className="flex justify-between items-center">
                                <span className="text-lg font-semibold">{service.price}</span>
                                <button
                                    onClick={() => setLocation("/booking")}
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                >
                                    Book Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="bg-gray-50 py-16">
                <div className="max-w-7xl mx-auto px-4 text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900">Why Choose Elderly Care with Us</h2>
                    <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
                        Trust, compassion, and reliability form the core of our elderly care philosophy.
                    </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-4">
                    {[
                        {
                            icon: <Heart className="w-8 h-8" />,
                            title: "Empathetic Caregivers",
                            description: "Caregivers trained in handling elderly with patience and kindness."
                        },
                        {
                            icon: <Clock className="w-8 h-8" />,
                            title: "Timely Support",
                            description: "Scheduled services that respect routine and comfort."
                        },
                        {
                            icon: <Star className="w-8 h-8" />,
                            title: "Highly Rated Services",
                            description: "Loved and reviewed by families across major cities."
                        },
                        {
                            icon: <CheckCircle className="w-8 h-8" />,
                            title: "Background Verified",
                            description: "Every caregiver is screened and background checked."
                        }
                    ].map((item, index) => (
                        <div key={index} className="text-center">
                            <div className="w-16 h-16 mx-auto mb-4 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-700">
                                {item.icon}
                            </div>
                            <h3 className="text-lg font-bold">{item.title}</h3>
                            <p className="text-gray-600 mt-2">{item.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Go Back to Services */}
            <div className="text-center my-12">
                <button
                    onClick={() => {
                        setLocation("/");
                        setTimeout(() => {
                            const el = document.getElementById("services-section");
                            if (el) el.scrollIntoView({ behavior: "smooth" });
                        }, 100);
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
