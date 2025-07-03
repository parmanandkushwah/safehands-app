import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { MapPin, Search, Filter } from "lucide-react";
import { Link } from "wouter";
import Footer from "../components/Footer";
import ProviderCard from "../components/TopProviders.jsx";

export default function Providers() {
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedService, setSelectedService] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    const { data: cities } = useQuery({
        queryKey: ["/api/cities"],
    });

    const { data: services } = useQuery({
        queryKey: ["/api/services"],
    });

    const { data: providers, isLoading } = useQuery({
        queryKey: ["/api/providers", selectedCity, selectedService],
        queryFn: async () => {
            const params = new URLSearchParams();
            if (selectedCity) params.append("cityId", selectedCity);
            if (selectedService) params.append("serviceId", selectedService);
            const response = await fetch(`/api/providers?${params}`);
            if (!response.ok) throw new Error("Failed to fetch providers");
            return response.json();
        },
    });

    const filteredProviders = providers?.filter((provider) => {
        if (!searchQuery) return true;
        const fullName = `${provider.user?.firstName} ${provider.user?.lastName}`.toLowerCase();
        return (
            fullName.includes(searchQuery.toLowerCase()) ||
            provider.bio?.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    return (
        <div className="min-h-screen bg-white">
            {/* Header Section */}
            <section className="bg-gray-50 py-12">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                            Find Trusted Care Professionals
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Browse our verified network of healthcare and childcare professionals in your area.
                        </p>
                    </div>

                    {/* Search and Filters */}
                    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
                        <div className="grid md:grid-cols-4 gap-4">
                            {/* Search Input */}
                            <div className="relative">
                                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search providers..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full"
                                />
                            </div>

                            {/* City Dropdown */}
                            <select
                                value={selectedCity}
                                onChange={(e) => setSelectedCity(e.target.value)}
                                className="border border-gray-300 rounded-md py-2 px-3 w-full"
                            >
                                <option value="">All Cities</option>
                                {cities?.map((city) => (
                                    <option key={city.id} value={city.id}>
                                        {city.name}, {city.state}
                                    </option>
                                ))}
                            </select>

                            {/* Service Dropdown */}
                            <select
                                value={selectedService}
                                onChange={(e) => setSelectedService(e.target.value)}
                                className="border border-gray-300 rounded-md py-2 px-3 w-full"
                            >
                                <option value="">All Services</option>
                                {services?.map((service) => (
                                    <option key={service.id} value={service.id}>
                                        {service.name}
                                    </option>
                                ))}
                            </select>

                            {/* Placeholder More Filters */}
                            <button
                                className="flex items-center justify-center gap-2 border border-blue-800 text-blue-800 hover:bg-blue-800 hover:text-white font-medium rounded-md px-4 py-2 transition"
                            >
                                <Filter className="w-4 h-4" />
                                More Filters
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Results Section */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">
                                {filteredProviders?.length || 0} Providers Found
                            </h2>
                            <p className="text-gray-600">
                                Showing verified professionals
                                {selectedCity && ` in ${cities?.find((c) => c.id.toString() === selectedCity)?.name}`}
                                {selectedService && ` for ${services?.find((s) => s.id.toString() === selectedService)?.name}`}
                            </p>
                        </div>

                        {/* Sort Dropdown */}
                        <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600">Sort by:</span>
                            <select className="border border-gray-300 rounded-md py-2 px-3 w-40">
                                <option value="rating">Highest Rated</option>
                                <option value="reviews">Most Reviews</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                            </select>
                        </div>
                    </div>

                    {/* Provider Cards or Skeleton or No Results */}
                    {isLoading ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="animate-pulse bg-white rounded shadow">
                                    <div className="h-48 bg-gray-200 rounded-t"></div>
                                    <div className="p-6 space-y-3">
                                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : filteredProviders && filteredProviders.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProviders.map((provider) => (
                                <ProviderCard key={provider.id} provider={provider} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">No providers found</h3>
                            <p className="text-gray-600 mb-6">
                                Try adjusting your search criteria or location to find more providers.
                            </p>
                            <button
                                onClick={() => {
                                    setSelectedCity("");
                                    setSelectedService("");
                                    setSearchQuery("");
                                }}
                                className="bg-blue-800 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition"
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
}
