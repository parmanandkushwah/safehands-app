import { useAuth } from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { MapPin, Clock, Star, Calendar } from "lucide-react";
import { Link } from "wouter";
import Footer from "../components/Footer";
import ServiceCategories from "../components/ServiceCategories";
import RatingStars from "../components/RatingStars";

export default function HomeUser() {
    const { user } = useAuth();

    const { data: recentBookings = [] } = useQuery({ queryKey: ["/api/bookings"] });
    const { data: featuredProviders = [] } = useQuery({ queryKey: ["/api/providers"] });

    return (
        <div className="min-h-screen bg-white">
            {/* Welcome */}
            <section className="bg-gradient-to-r from-blue-50 to-white py-12 text-center">
                <div className="max-w-7xl mx-auto px-4">
                    <h1 className="text-3xl font-bold mb-2 text-gray-800">Welcome back, {user?.firstName}!</h1>
                    <p className="text-lg text-gray-600">What service do you need today?</p>
                </div>
            </section>

            {/* Quick Actions */}
            <section className="py-8">
                <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-4">
                    <Link href="/providers">
                        <button className="w-full h-20 bg-blue-600 text-white rounded hover:bg-blue-700 flex flex-col items-center justify-center">
                            <MapPin className="w-6 h-6" />
                            <span>Find Providers</span>
                        </button>
                    </Link>
                    <Link href="/dashboard">
                        <button className="w-full h-20 bg-blue-600 text-white rounded hover:bg-blue-700 flex flex-col items-center justify-center">
                            <Clock className="w-6 h-6" />
                            <span>My Bookings</span>
                        </button>
                    </Link>
                    <button className="w-full h-20 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded flex flex-col items-center justify-center">
                        <Star className="w-6 h-6" />
                        <span>Emergency</span>
                    </button>
                </div>
            </section>

            {/* Recent Bookings */}
            {recentBookings.length > 0 && (
                <section className="py-8">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold">Recent Bookings</h2>
                            <Link href="/dashboard">
                                <button className="text-sm text-blue-600 underline">View All</button>
                            </Link>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {recentBookings.slice(0, 3).map((b) => (
                                <div key={b.id} className="border rounded shadow p-4">
                                    <div className="flex justify-between mb-2">
                                        <h3 className="font-semibold">{b.service?.name}</h3>
                                        <span className={`text-sm px-2 py-1 rounded-full ${b.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                      {b.status}
                    </span>
                                    </div>
                                    <p className="text-sm text-gray-600">Provider: {b.provider?.user?.firstName} {b.provider?.user?.lastName}</p>
                                    <p className="text-sm text-gray-600">Date: {new Date(b.scheduledDate).toLocaleDateString()}</p>
                                    <p className="text-sm text-gray-600">City: {b.city?.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Service Categories */}
            <ServiceCategories />

            {/* Top Providers */}
            {featuredProviders.length > 0 && (
                <section className="py-12">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">Top-Rated Professionals</h2>
                            <Link href="/providers">
                                <button className="text-sm text-blue-600 underline">View All</button>
                            </Link>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {featuredProviders.slice(0, 3).map((provider) => (
                                <div key={provider.id} className="border rounded shadow p-6">
                                    <div className="flex justify-between mb-2">
                                        <div>
                                            <h3 className="font-bold text-gray-900">
                                                {provider.user?.firstName} {provider.user?.lastName}
                                            </h3>
                                            <p className="text-sm text-gray-600">{provider.bio}</p>
                                        </div>
                                        {provider.isVerified && (
                                            <span className="text-green-600 text-sm font-semibold">✔ Verified</span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                                        <RatingStars rating={parseFloat(provider.rating)} />
                                        <span>{provider.rating} ({provider.totalReviews} reviews)</span>
                                    </div>
                                    <p className="font-bold text-gray-800">{provider.hourlyRate ? `₹${provider.hourlyRate}/hour` : "Rate not set"}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <Footer />
        </div>
    );
}
