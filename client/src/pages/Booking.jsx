import { useState } from "react";
import { useLocation } from "wouter";
import { Calendar, Clock, MapPin, User } from "lucide-react";
import Footer from "../components/Footer";

export default function Booking() {
    const [, setLocation] = useLocation();

    const [formData, setFormData] = useState({
        name: "",
        city: "",
        date: "",
        time: "",
        duration: "",
        notes: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { name, city, date, time, duration } = formData;
        if (!name || !city || !date || !time || !duration) {
            setError("Please fill in all required fields.");
            return;
        }

        setError("");
        setLocation("/booking-confirmation");
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
            <main className="flex-grow max-w-3xl mx-auto px-4 py-12">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-extrabold text-blue-800 mb-2">Book a Service</h1>
                    <p className="text-gray-600 text-lg">Fill out your details and schedule your appointment</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-md">
                    {error && <p className="text-red-600 font-medium text-center">{error}</p>}

                    {/* Name */}
                    <div>
                        <label htmlFor="name" className="block font-semibold text-gray-700 mb-1">Your Name</label>
                        <div className="flex items-center border border-gray-300 rounded px-3 py-2 bg-white">
                            <User className="w-4 h-4 text-gray-400 mr-2" />
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full bg-transparent focus:outline-none"
                                placeholder="John Doe"
                            />
                        </div>
                    </div>

                    {/* City */}
                    <div>
                        <label htmlFor="city" className="block font-semibold text-gray-700 mb-1">City</label>
                        <div className="flex items-center border border-gray-300 rounded px-3 py-2 bg-white">
                            <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                            <input
                                type="text"
                                id="city"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                className="w-full bg-transparent focus:outline-none"
                                placeholder="Enter city"
                            />
                        </div>
                    </div>

                    {/* Date */}
                    <div>
                        <label htmlFor="date" className="block font-semibold text-gray-700 mb-1">Preferred Date</label>
                        <div className="flex items-center border border-gray-300 rounded px-3 py-2 bg-white">
                            <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                            <input
                                type="date"
                                id="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                className="w-full bg-transparent focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Time */}
                    <div>
                        <label htmlFor="time" className="block font-semibold text-gray-700 mb-1">Preferred Time</label>
                        <div className="flex items-center border border-gray-300 rounded px-3 py-2 bg-white">
                            <Clock className="w-4 h-4 text-gray-400 mr-2" />
                            <input
                                type="time"
                                id="time"
                                name="time"
                                value={formData.time}
                                onChange={handleChange}
                                className="w-full bg-transparent focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Duration */}
                    <div>
                        <label htmlFor="duration" className="block font-semibold text-gray-700 mb-1">Duration (in hours)</label>
                        <input
                            type="number"
                            id="duration"
                            name="duration"
                            value={formData.duration}
                            onChange={handleChange}
                            className="w-full border border-gray-300 px-3 py-2 rounded bg-white focus:outline-none"
                            placeholder="e.g. 2"
                            min="1"
                        />
                    </div>

                    {/* Notes */}
                    <div>
                        <label htmlFor="notes" className="block font-semibold text-gray-700 mb-1">Additional Notes</label>
                        <textarea
                            id="notes"
                            name="notes"
                            value={formData.notes}
                            onChange={handleChange}
                            className="w-full border border-gray-300 px-3 py-2 rounded bg-white focus:outline-none"
                            rows="4"
                            placeholder="Any preferences or instructions..."
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
                    >
                        Confirm Booking
                    </button>
                </form>
            </main>

            <Footer />
        </div>
    );
}
