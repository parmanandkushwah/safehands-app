import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { MapPin, Home, Clock, Star, Shield, CheckCircle } from "lucide-react";
import Header from "../components/Navbar";
import Footer from "../components/Footer";
import RatingStars from "../components/RatingStars";

const cities = [
    { name: "Mumbai", lat: 19.0760, lng: 72.8777 },
    { name: "Delhi", lat: 28.6139, lng: 77.2090 },
    { name: "Bangalore", lat: 12.9716, lng: 77.5946 },
    { name: "Hyderabad", lat: 17.3850, lng: 78.4867 },
    { name: "Chennai", lat: 13.0827, lng: 80.2707 },
    { name: "Kolkata", lat: 22.5726, lng: 88.3639 },
    { name: "Pune", lat: 18.5204, lng: 73.8567 },
    { name: "Ahmedabad", lat: 23.0225, lng: 72.5714 }
];

export default function HomeCare() {
    const [, setLocation] = useLocation();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedService, setSelectedService] = useState("");
    const [nearestCity, setNearestCity] = useState("");

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const { latitude, longitude } = pos.coords;
                    const nearest = findNearestCity(latitude, longitude);
                    setNearestCity(nearest);
                    setSearchQuery(nearest);
                },
                (err) => console.error("Location error:", err)
            );
        }
    }, []);

    const findNearestCity = (lat, lng) => {
        let nearest = cities[0];
        let minDistance = getDistance(lat, lng, nearest.lat, nearest.lng);
        for (const city of cities) {
            const dist = getDistance(lat, lng, city.lat, city.lng);
            if (dist < minDistance) {
                minDistance = dist;
                nearest = city;
            }
        }
        return nearest.name;
    };

    const getDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371;
        const dLat = ((lat2 - lat1) * Math.PI) / 180;
        const dLon = ((lon2 - lon1) * Math.PI) / 180;
        const a =
            Math.sin(dLat / 2) ** 2 +
            Math.cos((lat1 * Math.PI) / 180) *
            Math.cos((lat2 * Math.PI) / 180) *
            Math.sin(dLon / 2) ** 2;
        return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    };

    const services = [
        {
            id: 1,
            title: "Elderly Care",
            description: "Comprehensive care services for elderly individuals",
            icon: <Home className="w-6 h-6" />,
            price: "₹1500/day",
            rating: 4.9,
            features: ["Personal Care Assistance", "Medication Management", "Mobility Support", "Companionship"]
        },
        {
            id: 2,
            title: "Post-Surgery Care",
            description: "Professional care services for post-operative recovery",
            icon: <Home className="w-6 h-6" />,
            price: "₹2000/day",
            rating: 4.8,
            features: ["Wound Care", "Physical Therapy", "Pain Management", "Recovery Monitoring"]
        },
        {
            id: 3,
            title: "Chronic Disease Care",
            description: "Specialized care for chronic health conditions",
            icon: <Home className="w-6 h-6" />,
            price: "₹1800/day",
            rating: 4.7,
            features: ["Disease Management", "Regular Monitoring", "Lifestyle Support", "Emergency Response"]
        },
        {
            id: 4,
            title: "Palliative Care",
            description: "Compassionate care for individuals with serious illnesses",
            icon: <Home className="w-6 h-6" />,
            price: "₹2500/day",
            rating: 4.9,
            features: ["Pain Management", "Emotional Support", "Family Counseling", "Comfort Care"]
        }
    ];

    return (
        <div className="min-h-screen bg-white">

            <section className="bg-blue-50 py-16 px-4">
                <div className="max-w-4xl mx-auto text-center mb-10">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Professional Home Care Services
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Experience quality healthcare in the comfort of your home. Our verified caregivers are ready to provide expert care.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-xl mx-auto">
                    <div className="relative w-full">
                        <MapPin className="absolute left-3 top-3 text-gray-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Enter your location..."
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full"
                        />
                    </div>
                    <select
                        value={selectedService}
                        onChange={(e) => setSelectedService(e.target.value)}
                        className="border border-gray-300 rounded-md py-2 px-3"
                    >
                        <option value="">Service Type</option>
                        <option value="elderly">Elderly Care</option>
                        <option value="post-surgery">Post-Surgery Care</option>
                        <option value="chronic">Chronic Disease Care</option>
                        <option value="palliative">Palliative Care</option>
                    </select>
                </div>
            </section>

            <section className="py-16 px-4 bg-white">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
                    {services.map((service) => (
                        <div
                            key={service.id}
                            className="border rounded-lg p-6 hover:shadow-md transition"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center space-x-4">
                                    <div className="bg-blue-100 p-3 rounded-full text-blue-700">
                                        {service.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold">{service.title}</h3>
                                        <div className="flex items-center gap-1">
                                            <RatingStars rating={service.rating} />
                                            <span className="text-sm text-gray-600">{service.rating}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm flex items-center">
                                    <Shield className="w-4 h-4 mr-1" />
                                    Verified
                                </div>
                            </div>

                            <p className="text-gray-700 mb-4">{service.description}</p>

                            <ul className="space-y-2 mb-6">
                                {service.features.map((feature, i) => (
                                    <li key={i} className="flex items-center text-sm text-gray-600">
                                        <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <div className="flex justify-between items-center">
                                <span className="text-lg font-bold text-gray-900">{service.price}</span>
                                <button
                                    onClick={() => setLocation(`/home-care/${service.id}`)}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="bg-gray-50 py-16 px-4">
                <div className="max-w-5xl mx-auto text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Why Choose Our Home Care Services</h2>
                    <p className="text-gray-600 text-lg">
                        Experience healthcare excellence with our comprehensive home care solutions
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                    {[
                        { icon: <Shield className="w-6 h-6" />, title: "Licensed Caregivers", desc: "All our caregivers are fully licensed and certified" },
                        { icon: <Clock className="w-6 h-6" />, title: "24/7 Availability", desc: "Round-the-clock care and support" },
                        { icon: <Star className="w-6 h-6" />, title: "Quality Care", desc: "Consistently high-quality home care services" },
                        { icon: <CheckCircle className="w-6 h-6" />, title: "Verified Reviews", desc: "Real feedback from satisfied clients" }
                    ].map((item, idx) => (
                        <div key={idx} className="text-center">
                            <div className="w-14 h-14 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                                {item.icon}
                            </div>
                            <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                            <p className="text-gray-600 text-sm">{item.desc}</p>
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
