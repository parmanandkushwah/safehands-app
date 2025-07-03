import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import {
    Calendar,
    Clock,
    MapPin,
    User,
    Star,
    DollarSign,
    MessageSquare,
} from "lucide-react";
import { Link } from "wouter";
import Header from "../components/Navbar";
import Footer from "../components/Footer";
import { useToast } from "../hooks/useToast";
import { isUnauthorizedError } from "../lib/authUtils";

export default function Dashboard() {
    const { user, isAuthenticated, isLoading } = useAuth();
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [reviewData, setReviewData] = useState({ rating: 5, comment: "" });
    const [tab, setTab] = useState("bookings");

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            toast({
                title: "Unauthorized",
                description: "You are logged out. Logging in again...",
                variant: "destructive",
            });
            setTimeout(() => {
                window.location.href = "/api/login";
            }, 500);
        }
    }, [isAuthenticated, isLoading, toast]);

    const { data: bookings = [], isLoading: bookingsLoading } = useQuery({
        queryKey: ["/api/bookings"],
        enabled: isAuthenticated,
        retry: false,
    });

    const { data: providerProfile } = useQuery({
        queryKey: ["/api/providers", { userId: user?.id }],
        queryFn: async () => {
            const res = await fetch(`/api/providers?userId=${user?.id}`);
            if (!res.ok) {
                if (res.status === 404) return null;
                throw new Error("Failed to fetch provider profile");
            }
            const data = await res.json();
            return data[0] || null;
        },
        enabled: !!user?.id,
    });

    const updateBooking = useMutation({
        mutationFn: async ({ id, status }) => {
            const res = await fetch(`/api/bookings/${id}/status`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status }),
                credentials: "include",
            });
            if (!res.ok) throw new Error(await res.text() || "Failed to update booking");
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
            toast({ title: "Booking Updated", description: "Status updated." });
        },
        onError: (error) => {
            if (isUnauthorizedError(error)) {
                toast({ title: "Unauthorized", variant: "destructive" });
                setTimeout(() => (window.location.href = "/api/login"), 500);
            } else {
                toast({ title: "Error", description: error.message, variant: "destructive" });
            }
        },
    });

    const submitReview = useMutation({
        mutationFn: async (data) => {
            const res = await fetch("/api/reviews", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(data),
            });
            if (!res.ok) throw new Error(await res.text() || "Failed to create review");
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
            setSelectedBooking(null);
            setReviewData({ rating: 5, comment: "" });
            toast({ title: "Review Submitted", description: "Thanks for your feedback!" });
        },
        onError: (error) => {
            if (isUnauthorizedError(error)) {
                toast({ title: "Unauthorized", variant: "destructive" });
                setTimeout(() => (window.location.href = "/api/login"), 500);
            } else {
                toast({ title: "Error", description: error.message, variant: "destructive" });
            }
        },
    });

    const handleStatusUpdate = (id, status) => updateBooking.mutate({ id, status });

    const handleReviewSubmit = () => {
        if (!selectedBooking) return;
        submitReview.mutate({
            bookingId: selectedBooking.id,
            providerId: selectedBooking.providerId,
            rating: reviewData.rating,
            comment: reviewData.comment,
        });
    };

    const getStatusColor = (status) => {
        const colors = {
            pending: "bg-yellow-100 text-yellow-800",
            confirmed: "bg-blue-100 text-blue-800",
            in_progress: "bg-purple-100 text-purple-800",
            completed: "bg-green-100 text-green-800",
            cancelled: "bg-red-100 text-red-800",
        };
        return colors[status] || "bg-gray-100 text-gray-800";
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-white">
                <Header />
                <div className="max-w-7xl mx-auto px-4 py-12">
                    <div className="animate-pulse space-y-6">
                        <div className="h-8 bg-gray-200 w-1/4 rounded" />
                        <div className="h-64 bg-gray-200 rounded" />
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main className="max-w-7xl mx-auto px-4 py-12">
                <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
                <p className="text-gray-600 mb-6">Manage your bookings and settings</p>

                <div className="mb-6 flex gap-4">
                    <button onClick={() => setTab("bookings")} className={`px-4 py-2 rounded ${tab === "bookings" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"}`}>Bookings</button>
                    <button onClick={() => setTab("profile")} className={`px-4 py-2 rounded ${tab === "profile" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"}`}>Profile</button>
                    {user?.role === "provider" && (
                        <button onClick={() => setTab("provider")} className={`px-4 py-2 rounded ${tab === "provider" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"}`}>Provider</button>
                    )}
                </div>

                {tab === "bookings" && (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-semibold">My Bookings</h2>
                            <Link href="/booking">
                                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Book New Service</button>
                            </Link>
                        </div>

                        {bookingsLoading ? (
                            <p>Loading bookings...</p>
                        ) : Array.isArray(bookings) && bookings.length > 0 ? (
                            bookings.map((b) => (
                                <div key={b.id} className="border rounded-lg p-6 shadow-sm">
                                    <div className="grid md:grid-cols-4 gap-4 items-start">
                                        <div>
                                            <h3 className="text-lg font-semibold mb-1">{b.service?.name || "Service"}</h3>
                                            <p className="text-sm text-gray-600 flex items-center"><Calendar size={16} className="mr-1" /> {format(new Date(b.scheduledDate), "PPP")}</p>
                                            <p className="text-sm text-gray-600 flex items-center"><Clock size={16} className="mr-1" /> {b.duration} hours</p>
                                            <p className="text-sm text-gray-600 flex items-center"><MapPin size={16} className="mr-1" /> {b.city?.name || "Unknown"}</p>
                                        </div>
                                        <div>
                                            <p className="font-medium">Provider:</p>
                                            <p className="text-gray-700">{b.provider?.user?.firstName || "N/A"} {b.provider?.user?.lastName || ""}</p>
                                            <div className="flex items-center mt-1 text-yellow-500 text-sm">
                                                <Star size={14} className="mr-1" /> {b.provider?.rating ?? "N/A"}
                                            </div>
                                        </div>
                                        <div className="text-center">
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(b.status)}`}>
                        {b.status}
                      </span>
                                            <p className="mt-2 text-lg font-bold">${b.totalAmount}</p>
                                        </div>
                                        <div className="space-y-2">
                                            {b.status === "pending" && (
                                                <button onClick={() => handleStatusUpdate(b.id, "cancelled")} className="w-full border border-red-500 text-red-600 px-3 py-1 rounded hover:bg-red-50">Cancel Booking</button>
                                            )}
                                            {b.status === "completed" && (
                                                <>
                                                    <button onClick={() => setSelectedBooking(b)} className="w-full border px-3 py-1 rounded hover:bg-gray-50">
                                                        Leave Review
                                                    </button>
                                                    {selectedBooking?.id === b.id && (
                                                        <div className="mt-2 space-y-2">
                                                            <div className="flex space-x-1">
                                                                {[1, 2, 3, 4, 5].map((s) => (
                                                                    <button key={s} onClick={() => setReviewData({ ...reviewData, rating: s })} className={`text-xl ${s <= reviewData.rating ? "text-yellow-400" : "text-gray-300"}`}>★</button>
                                                                ))}
                                                            </div>
                                                            <textarea className="w-full p-2 border rounded" placeholder="Your review..." value={reviewData.comment} onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}></textarea>
                                                            <button onClick={handleReviewSubmit} className="w-full bg-blue-600 text-white px-3 py-2 rounded">
                                                                {submitReview.isPending ? "Submitting..." : "Submit Review"}
                                                            </button>
                                                        </div>
                                                    )}
                                                </>
                                            )}
                                            <button className="w-full border px-3 py-1 rounded hover:bg-gray-50">
                                                <MessageSquare size={16} className="inline-block mr-2" />
                                                Contact Provider
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-12">
                                <Calendar size={48} className="mx-auto text-gray-300 mb-4" />
                                <h3 className="text-xl font-semibold mb-2">No bookings yet</h3>
                                <p className="text-gray-600 mb-4">Start by booking your first service</p>
                                <Link href="/booking">
                                    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Book Now</button>
                                </Link>
                            </div>
                        )}
                    </div>
                )}

                {tab === "profile" && (
                    <div className="grid md:grid-cols-2 gap-6">
                        <div><p className="text-sm text-gray-600">First Name</p><p className="font-medium">{user?.firstName || "Not provided"}</p></div>
                        <div><p className="text-sm text-gray-600">Last Name</p><p className="font-medium">{user?.lastName || "Not provided"}</p></div>
                        <div><p className="text-sm text-gray-600">Email</p><p className="font-medium">{user?.email || "Not provided"}</p></div>
                        <div><p className="text-sm text-gray-600">Account Type</p><p className="inline-block bg-gray-200 px-3 py-1 rounded-full">{user?.role}</p></div>
                    </div>
                )}

                {tab === "provider" && user?.role === "provider" && (
                    <div className="space-y-6">
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="text-center">
                                <DollarSign className="mx-auto text-blue-600 mb-2" />
                                <p className="text-2xl font-bold">$0</p>
                                <p className="text-gray-600">Total Earnings</p>
                            </div>
                            <div className="text-center">
                                <Calendar className="mx-auto text-blue-600 mb-2" />
                                <p className="text-2xl font-bold">{bookings.filter((b) => b.providerId === providerProfile?.id).length}</p>
                                <p className="text-gray-600">Total Bookings</p>
                            </div>
                            <div className="text-center">
                                <Star className="mx-auto text-blue-600 mb-2" />
                                <p className="text-2xl font-bold">{providerProfile?.rating || "N/A"}</p>
                                <p className="text-gray-600">Average Rating</p>
                            </div>
                        </div>

                        {providerProfile ? (
                            <div className="grid md:grid-cols-2 gap-6">
                                <div><p className="text-sm text-gray-600">Bio</p><p>{providerProfile.bio || "No bio"}</p></div>
                                <div><p className="text-sm text-gray-600">Experience</p><p>{providerProfile.experience || 0} years</p></div>
                                <div><p className="text-sm text-gray-600">Hourly Rate</p><p>${providerProfile.hourlyRate}/hour</p></div>
                                <div><p className="text-sm text-gray-600">Verification</p><p className={`inline-block px-3 py-1 rounded-full ${providerProfile.isVerified ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>{providerProfile.isVerified ? "Verified" : "Pending"}</p></div>
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <User size={48} className="mx-auto text-gray-300 mb-4" />
                                <h3 className="text-xl font-semibold mb-2">No Provider Profile</h3>
                                <p className="text-gray-600 mb-4">Create your provider profile to accept bookings</p>
                                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Create Profile</button>
                            </div>
                        )}
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}
