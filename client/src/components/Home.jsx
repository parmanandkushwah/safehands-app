import { useState } from "react";
import { MapPin, Search, ShieldCheck, Star, Clock } from "lucide-react";
import ServiceCategories from "../components/ServiceCategories";
import Footer from "../components/Footer";

const Home = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [city, setCity] = useState("");

    const handleDetectLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    try {
                        const response = await fetch(
                            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
                        );
                        const data = await response.json();
                        const detectedCity = data.address.city || data.address.town || data.address.village || "Unknown";
                        setCity(detectedCity);
                        localStorage.setItem("selectedCity", detectedCity);
                    } catch (error) {
                        console.error("Reverse geocoding failed:", error);
                        alert("Failed to detect city from location.");
                    }
                },
                (error) => {
                    console.error("Geolocation error:", error);
                    alert("Location access denied. Please allow location access.");
                }
            );
        } else {
            alert("Geolocation is not supported by your browser.");
        }
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="bg-blue-700 text-white py-28 px-4 text-center relative overflow-hidden">
                <div className="max-w-5xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                        Trusted Care, Right at Your Doorstep
                    </h1>
                    <p className="text-lg md:text-xl text-blue-100 mb-12">
                        Connect with verified healthcare professionals for home care, medical services, and child care.
                    </p>

                    {/* Search and Location */}
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-12">
                        {/* City Badge */}
                        <div className="flex items-center gap-2 px-6 py-3 bg-white text-blue-700 rounded-lg text-sm font-medium shadow">
                            <MapPin className="w-4 h-4" />
                            {city ? city : "City not detected"}
                        </div>

                        {/* Search Box */}
                        <div className="flex items-center w-full max-w-md bg-white rounded-lg overflow-hidden shadow">
                            <div className="px-3">
                                <Search className="text-gray-400 w-5 h-5" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search for services..."
                                className="w-full px-3 py-2 text-gray-700 focus:outline-none"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        {/* Detect Button */}
                        <button
                            onClick={handleDetectLocation}
                            className="bg-white text-blue-600 hover:bg-blue-100 px-6 py-3 rounded-lg font-semibold text-sm shadow"
                        >
                            Detect My Location
                        </button>
                    </div>

                    {/* Features */}
                    <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-white/90">
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="w-5 h-5" />
                            Verified Professionals
                        </div>
                        <div className="flex items-center gap-2">
                            <Star className="w-5 h-5" />
                            Top Rated Services
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-5 h-5" />
                            24/7 Support
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
