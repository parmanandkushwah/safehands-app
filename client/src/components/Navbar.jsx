import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { FaMapMarkerAlt, FaSearch } from "react-icons/fa";
import { Link } from "wouter";

// Predefined city list with coordinates
const cities = [
    { name: "Delhi", lat: 28.6139, lng: 77.2090 },
    { name: "Mumbai", lat: 19.0760, lng: 72.8777 },
    { name: "Bangalore", lat: 12.9716, lng: 77.5946 },
    { name: "Hyderabad", lat: 17.3850, lng: 78.4867 },
    { name: "Chennai", lat: 13.0827, lng: 80.2707 },
    { name: "Kolkata", lat: 22.5726, lng: 88.3639 },
    { name: "Pune", lat: 18.5204, lng: 73.8567 },
    { name: "Ahmedabad", lat: 23.0225, lng: 72.5714 }
];

const Navbar = () => {
    const [selectedCity, setSelectedCity] = useState("Select City");
    const [searchQuery, setSearchQuery] = useState("");
    const { user, isAuthenticated, isLoading } = useAuth();

    const detectLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                ({ coords }) => {
                    const { latitude, longitude } = coords;
                    const nearest = findNearestCity(latitude, longitude);
                    setSelectedCity(nearest);
                },
                (error) => {
                    console.error("Location detection error:", error);
                    alert("Unable to detect your location.");
                }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

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
        const R = 6371; // Earth radius in km
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) *
            Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };

    return (
        <nav className="w-full bg-white shadow-sm px-6 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo + Tagline */}
                <div className="flex items-center gap-2">
                    <img src="https://i.ibb.co/ccJNk82/logo.png" alt="SafeHands Logo" className="h-8 w-8 rounded-full" />
                    <div>
                        <h1 className="text-xl font-semibold text-[#1f3c88]">SafeHands</h1>
                        <p className="text-xs text-[#3571db]">
                            Trusted Care, Right at Your Doorstep
                        </p>
                    </div>
                </div>

                {/* Center controls */}
                <div className="flex items-center gap-3">
                    {/* Location Dropdown */}
                    <div className="flex items-center gap-2 border px-3 py-1 rounded-md text-sm">
                        <FaMapMarkerAlt className="text-blue-600" />
                        <select
                            value={selectedCity}
                            onChange={(e) => setSelectedCity(e.target.value)}
                            className="outline-none bg-transparent text-black"
                        >
                            <option disabled>Select City</option>
                            {cities.map((city) => (
                                <option key={city.name} value={city.name}>
                                    {city.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Detect Location */}
                    <button
                        onClick={detectLocation}
                        className="border px-3 py-1 text-blue-600 rounded-md text-sm hover:bg-blue-50"
                    >
                        Detect
                    </button>

                    {/* Search Bar */}
                    <form className="relative" onSubmit={e => { e.preventDefault(); if(searchQuery) window.location.href = `/services?search=${encodeURIComponent(searchQuery)}`; }}>
                        <input
                            type="text"
                            placeholder="Search services..."
                            className="pl-8 pr-3 py-1 border rounded-md text-sm w-48"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                        />
                        <FaSearch className="absolute left-2 top-2.5 text-gray-500 text-sm" />
                    </form>
                </div>

                {/* Auth/Account */}
                {isLoading ? null : isAuthenticated && user ? (
                    <Link href="/dashboard">
                        <button className="bg-gray-100 text-blue-700 px-4 py-1.5 rounded-md text-sm font-semibold">
                            {user.name || user.email || "Account"}
                        </button>
                    </Link>
                ) : (
                    <Link href="/login">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md text-sm">
                            Sign In
                        </button>
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
