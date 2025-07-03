import { useEffect, useState } from "react";
import { useLocation } from "wouter";

export default function BookingConfirmationPage() {
    const [, setLocation] = useLocation();
    const [bookingDetails, setBookingDetails] = useState(null);

    useEffect(() => {
        const stored = localStorage.getItem("bookingDetails");
        if (stored) {
            setBookingDetails(JSON.parse(stored));
        }
    }, []);

    if (!bookingDetails) {
        return (
            <p className="text-center py-20 text-gray-600">
                Loading booking details...
            </p>
        );
    }

    return (
        <div className="max-w-2xl mx-auto px-4 py-8 bg-white rounded-lg shadow-md">
            <div className="flex items-center gap-4 mb-6">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xl font-bold">
                    ✓
                </div>
                <div>
                    <h1 className="text-2xl font-semibold">Booking Confirmed!</h1>
                    <p className="text-gray-600">Your service has been successfully booked</p>
                </div>
            </div>

            {/* Booking Details */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h2 className="font-semibold mb-4">Booking Details</h2>
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <p className="text-gray-600">Service</p>
                        <p className="font-medium">{bookingDetails.serviceName}</p>
                    </div>
                    <div>
                        <p className="text-gray-600">Date</p>
                        <p className="font-medium">{bookingDetails.date}</p>
                    </div>
                    <div>
                        <p className="text-gray-600">Time</p>
                        <p className="font-medium">{bookingDetails.time}</p>
                    </div>
                    <div>
                        <p className="text-gray-600">Duration</p>
                        <p className="font-medium">{bookingDetails.duration}</p>
                    </div>
                    <div>
                        <p className="text-gray-600">Total Amount</p>
                        <p className="font-medium">{bookingDetails.totalAmount}</p>
                    </div>
                    <div>
                        <p className="text-gray-600">Booking ID</p>
                        <p className="font-medium">{bookingDetails.bookingId}</p>
                    </div>
                </div>
            </div>

            {/* Caregiver */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h2 className="font-semibold mb-4">Your Caregiver</h2>
                <div className="flex items-center gap-4">
                    <div className="h-16 w-16 bg-gray-200 rounded-full flex items-center justify-center text-2xl">
                        👩
                    </div>
                    <div>
                        <p className="font-medium">{bookingDetails.caregiver.name}</p>
                        <p className="text-sm text-gray-600">{bookingDetails.caregiver.experience}</p>
                        <p className="text-sm text-yellow-500">⭐ {bookingDetails.caregiver.rating}</p>
                    </div>
                </div>
            </div>

            {/* Next Steps */}
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <h2 className="font-semibold mb-2">Next Steps</h2>
                <ul className="list-disc pl-6 space-y-2 text-sm text-gray-700">
                    <li>You’ll receive a confirmation email with all booking details</li>
                    <li>Our caregiver will contact you 1 hour before the scheduled time</li>
                    <li>You can track your booking status in your dashboard</li>
                </ul>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
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
                    Book Another Service
                </button>
                <button
                    className="w-full sm:w-1/2 border border-gray-300 py-2 rounded hover:bg-gray-100 transition"
                    onClick={() => setLocation("/dashboard")}
                >
                    View in Dashboard
                </button>
            </div>
        </div>
    );
}
