import { useState } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "../hooks/useToast.js";
import {
    Calendar as CalendarIcon,
    Clock,
    MapPin,
    User,
    CreditCard,
    CheckCircle
} from "lucide-react";
import { format } from "date-fns";
import Header from "../components/Navbar.jsx";
import Footer from "../components/Footer";

const bookingSchema = z.object({
    providerId: z.number().min(1, "Please select a provider"),
    serviceId: z.number().min(1, "Please select a service"),
    cityId: z.number().min(1, "Please select a city"),
    scheduledDate: z.date({ required_error: "Please select a date" }),
    duration: z.number().min(1, "Duration must be at least 1 hour"),
    address: z.string().min(10, "Please provide a detailed address"),
    notes: z.string().optional(),
});

export default function Booking() {
    const [step, setStep] = useState(1);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [, navigate] = useLocation();
    const { toast } = useToast();
    const queryClient = useQueryClient();

    const form = useForm({
        resolver: zodResolver(bookingSchema),
        defaultValues: {
            duration: 2,
            notes: "",
        },
    });

    const { data: cities } = useQuery({
        queryKey: ["/api/cities"],
    });

    const { data: serviceCategories } = useQuery({
        queryKey: ["/api/service-categories"],
    });

    const { data: services } = useQuery({
        queryKey: ["/api/services"],
    });

    const { data: providers } = useQuery({
        queryKey: ["/api/providers", form.watch("cityId"), form.watch("serviceId")],
        queryFn: async () => {
            const cityId = form.getValues("cityId");
            const serviceId = form.getValues("serviceId");
            if (!cityId || !serviceId) return [];

            const params = new URLSearchParams();
            params.append("cityId", cityId.toString());
            params.append("serviceId", serviceId.toString());

            const response = await fetch(`/api/providers?${params}`);
            if (!response.ok) throw new Error("Failed to fetch providers");
            return response.json();
        },
        enabled: !!form.watch("cityId") && !!form.watch("serviceId"),
    });

    const createBookingMutation = useMutation({
        mutationFn: async (bookingData) => {
            const response = await fetch("/api/bookings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...bookingData,
                    totalAmount: calculateTotal(),
                }),
                credentials: "include",
            });

            if (!response.ok) {
                const error = await response.text();
                throw new Error(error || "Failed to create booking");
            }

            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
            setStep(5);
            toast({
                title: "Booking Confirmed!",
                description: "Your booking has been successfully created.",
            });
        },
        onError: (error) => {
            toast({
                title: "Booking Failed",
                description: error.message,
                variant: "destructive",
            });
        },
    });

    const selectedService = services?.find((s) => s.id === form.watch("serviceId"));
    const selectedProvider = providers?.find((p) => p.id === form.watch("providerId"));

    const calculateTotal = () => {
        if (!selectedProvider || !form.watch("duration")) return 0;
        return parseFloat(selectedProvider.hourlyRate) * form.watch("duration");
    };

    const onSubmit = (data) => {
        createBookingMutation.mutate(data);
    };

    const nextStep = () => {
        if (step < 4) setStep(step + 1);
    };

    const prevStep = () => {
        if (step > 1) setStep(step - 1);
    };

    const getStepTitle = () => {
        switch (step) {
            case 1: return "Select Location & Service";
            case 2: return "Choose Provider";
            case 3: return "Schedule & Details";
            case 4: return "Review & Confirm";
            case 5: return "Booking Confirmed";
            default: return "Book Service";
        }
    };

    const formatDate = (date) => {
        if (!date) return "";
        return format(date, "PPP");
    };

    const handleDateChange = (e) => {
        const date = new Date(e.target.value);
        if (date >= new Date()) {
            form.setValue("scheduledDate", date);
        }
    };

    const sortProviders = (sortBy) => {
        if (!providers) return;

        const sortedProviders = [...providers].sort((a, b) => {
            switch (sortBy) {
                case 'price-low':
                    return a.hourlyRate - b.hourlyRate;
                case 'price-high':
                    return b.hourlyRate - a.hourlyRate;
                case 'rating':
                    return b.rating - a.rating;
                case 'reviews':
                    return b.totalReviews - a.totalReviews;
                default:
                    return 0;
            }
        });

        queryClient.setQueryData(
            ["/api/providers", form.watch("cityId"), form.watch("serviceId")],
            sortedProviders
        );
    };

    return (
        <div className="min-h-screen bg-white">
            <Header />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">{getStepTitle()}</h1>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(step / 4) * 100}%` }}
                        ></div>
                    </div>

                    <div className="flex justify-between mt-2">
                        {[1, 2, 3, 4].map((stepNum) => (
                            <span
                                key={stepNum}
                                className={`text-sm ${
                                    step >= stepNum ? "text-blue-600 font-medium" : "text-gray-400"
                                }`}
                            >
                Step {stepNum}
              </span>
                        ))}
                    </div>
                </div>

                <form onSubmit={form.handleSubmit(onSubmit)}>
                    {step === 1 && (
                        <div className="bg-white rounded-lg shadow-md border border-gray-200">
                            <div className="p-6 border-b border-gray-200">
                                <h2 className="text-lg font-semibold flex items-center">
                                    <MapPin className="w-5 h-5 mr-2" />
                                    Location & Service
                                </h2>
                            </div>
                            <div className="p-6 space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Select City
                                    </label>
                                    <select
                                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        onChange={(e) => form.setValue("cityId", Number(e.target.value))}
                                    >
                                        <option value="">Choose your city</option>
                                        {cities?.map((city) => (
                                            <option key={city.id} value={city.id}>
                                                {city.name}, {city.state}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Service Category
                                    </label>
                                    <div className="grid md:grid-cols-3 gap-4 mt-2">
                                        {serviceCategories?.map((category) => (
                                            <div
                                                key={category.id}
                                                className="bg-white rounded-lg shadow-sm border border-gray-200 cursor-pointer hover:border-blue-600 transition-colors"
                                            >
                                                <div className="p-4 text-center">
                                                    <h3 className="font-medium mb-2">{category.name}</h3>
                                                    <p className="text-sm text-gray-600">{category.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Select Service
                                    </label>
                                    <select
                                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        onChange={(e) => form.setValue("serviceId", Number(e.target.value))}
                                    >
                                        <option value="">Choose a service</option>
                                        {services?.map((service) => (
                                            <option key={service.id} value={service.id}>
                                                {service.name} - ${service.basePrice}/{service.unit}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <button
                                    type="button"
                                    onClick={nextStep}
                                    disabled={!form.watch("cityId") || !form.watch("serviceId")}
                                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-md transition-colors"
                                >
                                    Continue to Providers
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="bg-white rounded-lg shadow-md border border-gray-200">
                            <div className="p-6 border-b border-gray-200">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-lg font-semibold flex items-center">
                                        <User className="w-5 h-5 mr-2" />
                                        Choose Your Provider
                                    </h2>
                                    <select
                                        className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        defaultValue="rating"
                                        onChange={(e) => sortProviders(e.target.value)}
                                    >
                                        <option value="rating">Highest Rated</option>
                                        <option value="reviews">Most Reviews</option>
                                        <option value="price-low">Price: Low to High</option>
                                        <option value="price-high">Price: High to Low</option>
                                    </select>
                                </div>
                            </div>
                            <div className="p-6">
                                {providers && providers.length > 0 ? (
                                    <div className="space-y-4">
                                        {providers.map((provider) => (
                                            <div
                                                key={provider.id}
                                                className={`bg-white rounded-lg shadow-sm border cursor-pointer transition-colors ${
                                                    form.watch("providerId") === provider.id
                                                        ? "border-blue-600 bg-blue-50"
                                                        : "border-gray-200 hover:border-gray-300"
                                                }`}
                                                onClick={() => form.setValue("providerId", provider.id)}
                                            >
                                                <div className="p-4">
                                                    <div className="flex items-center space-x-4">
                                                        <img
                                                            src={provider.user?.profileImageUrl || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"}
                                                            alt={`${provider.user?.firstName} ${provider.user?.lastName}`}
                                                            className="w-16 h-16 rounded-full object-cover"
                                                        />
                                                        <div className="flex-1">
                                                            <div className="flex items-center justify-between">
                                                                <h3 className="font-bold text-lg">
                                                                    {provider.user?.firstName} {provider.user?.lastName}
                                                                </h3>
                                                                <span className="text-lg font-bold text-blue-600">
                                  ₹{provider.hourlyRate}/hour
                                </span>
                                                            </div>
                                                            <p className="text-gray-600 mb-2">{provider.bio}</p>
                                                            <div className="flex items-center space-x-4">
                                <span className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-sm">
                                  ⭐ {provider.rating} ({provider.totalReviews} reviews)
                                </span>
                                                                {provider.isVerified && (
                                                                    <span className="inline-block bg-green-100 text-green-700 px-2 py-1 rounded-full text-sm">
                                    Verified
                                  </span>
                                                                )}
                                                                <span className="inline-block border border-gray-300 text-gray-700 px-2 py-1 rounded-full text-sm">
                                  {provider.experience}+ years experience
                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-center text-gray-600 py-8">
                                        No providers available for the selected service and location.
                                    </p>
                                )}

                                <div className="flex space-x-4 mt-6">
                                    <button
                                        type="button"
                                        onClick={prevStep}
                                        className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                                    >
                                        Back
                                    </button>
                                    <button
                                        type="button"
                                        onClick={nextStep}
                                        disabled={!form.watch("providerId")}
                                        className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-md transition-colors"
                                    >
                                        Continue to Schedule
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="bg-white rounded-lg shadow-md border border-gray-200">
                            <div className="p-6 border-b border-gray-200">
                                <h2 className="text-lg font-semibold flex items-center">
                                    <CalendarIcon className="w-5 h-5 mr-2" />
                                    Schedule & Details
                                </h2>
                            </div>
                            <div className="p-6 space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Select Date
                                    </label>
                                    <input
                                        type="date"
                                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        min={new Date().toISOString().split('T')[0]}
                                        onChange={handleDateChange}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Duration (hours)
                                    </label>
                                    <select
                                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        onChange={(e) => form.setValue("duration", Number(e.target.value))}
                                        defaultValue="2"
                                    >
                                        <option value="">Select duration</option>
                                        {[1, 2, 3, 4, 5, 6, 8].map((hours) => (
                                            <option key={hours} value={hours}>
                                                {hours} hour{hours > 1 ? "s" : ""}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Service Address
                                    </label>
                                    <textarea
                                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        rows="3"
                                        placeholder="Enter the complete address where service is needed..."
                                        {...form.register("address")}
                                    />
                                    {form.formState.errors.address && (
                                        <p className="text-sm text-red-600 mt-1">
                                            {form.formState.errors.address.message}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Special Instructions (Optional)
                                    </label>
                                    <textarea
                                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        rows="3"
                                        placeholder="Any special requirements or notes for the provider..."
                                        {...form.register("notes")}
                                    />
                                </div>

                                <div className="flex space-x-4">
                                    <button
                                        type="button"
                                        onClick={prevStep}
                                        className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                                    >
                                        Back
                                    </button>
                                    <button
                                        type="button"
                                        onClick={nextStep}
                                        disabled={!form.watch("scheduledDate") || !form.watch("duration") || !form.watch("address")}
                                        className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-md transition-colors"
                                    >
                                        Review Booking
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 4 && (
                        <div className="bg-white rounded-lg shadow-md border border-gray-200">
                            <div className="p-6 border-b border-gray-200">
                                <h2 className="text-lg font-semibold flex items-center">
                                    <CheckCircle className="w-5 h-5 mr-2" />
                                    Review & Confirm
                                </h2>
                            </div>
                            <div className="p-6 space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <h3 className="font-semibold mb-4">Service Details</h3>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span>Service:</span>
                                                <span>{selectedService?.name}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Provider:</span>
                                                <span>{selectedProvider?.user?.firstName} {selectedProvider?.user?.lastName}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Date:</span>
                                                <span>{formatDate(form.watch("scheduledDate"))}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Duration:</span>
                                                <span>{form.watch("duration")} hours</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="font-semibold mb-4">Pricing</h3>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span>Hourly Rate:</span>
                                                <span>₹{selectedProvider?.hourlyRate}/hour</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Duration:</span>
                                                <span>{form.watch("duration")} hours</span>
                                            </div>
                                            <div className="flex justify-between font-bold text-lg border-t pt-2">
                                                <span>Total:</span>
                                                <span>₹{calculateTotal()}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="font-semibold mb-2">Service Address</h3>
                                    <p className="text-sm text-gray-600">{form.watch("address")}</p>
                                </div>

                                {form.watch("notes") && (
                                    <div>
                                        <h3 className="font-semibold mb-2">Special Instructions</h3>
                                        <p className="text-sm text-gray-600">{form.watch("notes")}</p>
                                    </div>
                                )}

                                <div className="flex space-x-4">
                                    <button
                                        type="button"
                                        onClick={prevStep}
                                        className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                                    >
                                        Back
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={createBookingMutation.isPending}
                                        className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-md transition-colors"
                                    >
                                        {createBookingMutation.isPending ? "Confirming..." : "Confirm Booking"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 5 && (
                        <div className="bg-white rounded-lg shadow-md border border-gray-200">
                            <div className="p-8 text-center">
                                <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                    Booking Confirmed!
                                </h2>
                                <p className="text-gray-600 mb-6">
                                    Your booking has been successfully created. You will receive a confirmation email shortly.
                                </p>
                                <div className="space-y-3">
                                    <button
                                        onClick={() => navigate("/dashboard")}
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition-colors"
                                    >
                                        View My Bookings
                                    </button>
                                    <button
                                        onClick={() => navigate("/")}
                                        className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-md transition-colors"
                                    >
                                        Back to Home
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </form>
            </div>

            <Footer />
        </div>
    );
}