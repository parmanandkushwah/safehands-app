import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import {
    Shield,
    Star,
    MapPin,
    Clock,
    DollarSign,
    Calendar,
    Phone,
    Mail,
    Award,
    MessageSquare,
} from "lucide-react";


import Footer from "../components/Footer";
import RatingStars from "../components/RatingStars";
import ReviewCard from "../components/Testimonials.jsx";

export default function ProviderProfile() {
    const { id } = useParams();

    const { data: provider, isLoading } = useQuery({
        queryKey: ["/api/providers", id],
        queryFn: async () => {
            const response = await fetch(`/api/providers/${id}`);
            if (!response.ok) throw new Error("Failed to fetch provider");
            return response.json();
        },
    });

    const { data: providerServices } = useQuery({
        queryKey: ["/api/providers", id, "services"],
        queryFn: async () => {
            const response = await fetch(`/api/providers/${id}/services`);
            if (!response.ok) throw new Error("Failed to fetch provider services");
            return response.json();
        },
        enabled: !!id,
    });

    const { data: reviews } = useQuery({
        queryKey: ["/api/reviews", { providerId: id }],
        queryFn: async () => {
            const response = await fetch(`/api/reviews?providerId=${id}`);
            if (!response.ok) throw new Error("Failed to fetch reviews");
            return response.json();
        },
        enabled: !!id,
    });

    if (isLoading) {
        return (
            <div className="min-h-screen bg-white">
                <Header />
                <div className="max-w-7xl mx-auto px-4 py-12 animate-pulse">
                    <div className="h-64 bg-gray-200 rounded mb-6"></div>
                    <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-6">
                            <div className="h-32 bg-gray-200 rounded"></div>
                            <div className="h-48 bg-gray-200 rounded"></div>
                        </div>
                        <div className="space-y-6">
                            <div className="h-64 bg-gray-200 rounded"></div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    if (!provider) {
        return (
            <div className="min-h-screen bg-white">
                <div className="max-w-3xl mx-auto px-4 py-20 text-center">
                    <h1 className="text-3xl font-bold mb-4">Provider Not Found</h1>
                    <p className="text-gray-600 mb-8">
                        The provider you're looking for doesn't exist.
                    </p>
                    <Link href="/providers">
                        <a className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                            Browse Providers
                        </a>
                    </Link>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-50 to-white py-12">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="bg-white shadow rounded-lg p-8 grid md:grid-cols-3 gap-8 items-center">
                        <div className="md:col-span-2 flex items-start space-x-6">
                            <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center text-white text-2xl font-bold">
                                {provider.user?.profileImageUrl || provider.profileImage ? (
                                    <img
                                        src={provider.user?.profileImageUrl || provider.profileImage}
                                        alt={`${provider.user?.firstName} ${provider.user?.lastName}`}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <>
                                        {provider.user?.firstName?.[0]}
                                        {provider.user?.lastName?.[0]}
                                    </>
                                )}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-2">
                                    <h1 className="text-3xl font-bold">
                                        {provider.user?.firstName} {provider.user?.lastName}
                                    </h1>
                                    {provider.isVerified && (
                                        <span className="flex items-center bg-green-100 text-green-700 text-sm px-2 py-1 rounded">
                      <Shield className="w-4 h-4 mr-1" />
                      Verified
                    </span>
                                    )}
                                </div>

                                <div className="flex items-center space-x-4 mb-3 text-sm">
                                    <div className="flex items-center space-x-1">
                                        <RatingStars rating={parseFloat(provider.rating)} />
                                        <span>{provider.rating}</span>
                                        <span className="text-gray-500">
                      ({provider.totalReviews} reviews)
                    </span>
                                    </div>

                                    <div className="flex items-center text-gray-600">
                                        <MapPin className="w-4 h-4 mr-1" />
                                        <span>
                      {provider.city?.name}, {provider.city?.state}
                    </span>
                                    </div>
                                </div>

                                <p className="text-gray-700 mb-2">{provider.bio}</p>

                                <div className="flex space-x-6 text-sm text-gray-600">
                                    <div className="flex items-center">
                                        <Clock className="w-4 h-4 mr-1" />
                                        <span>{provider.experience}+ yrs experience</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Award className="w-4 h-4 mr-1" />
                                        <span>Licensed</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side */}
                        <div className="text-center md:text-right space-y-4">
                            <div>
                                <div className="text-3xl font-bold">${provider.hourlyRate}</div>
                                <div className="text-gray-600 text-sm">per hour</div>
                            </div>
                            <Link href={`/booking?providerId=${provider.id}`}>
                                <a className="block w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                                    <Calendar className="w-4 h-4 inline mr-1" />
                                    Book Now
                                </a>
                            </Link>
                            <button className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded">
                                <MessageSquare className="w-4 h-4 inline mr-1" />
                                Send Message
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-12 grid lg:grid-cols-3 gap-8">
                {/* Left: Details */}
                <div className="lg:col-span-2 space-y-8">
                    {/* About */}
                    <div className="border rounded-lg p-6 bg-white">
                        <h2 className="text-xl font-semibold mb-4">About</h2>
                        <p className="text-gray-700 mb-4">{provider.bio}</p>
                        {provider.qualifications && (
                            <>
                                <h4 className="font-semibold text-gray-900 mb-2">Qualifications</h4>
                                <p className="text-gray-700">{provider.qualifications}</p>
                            </>
                        )}
                    </div>

                    {/* Services */}
                    {providerServices?.length > 0 && (
                        <div className="border rounded-lg p-6 bg-white">
                            <h2 className="text-xl font-semibold mb-4">Services Offered</h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                {providerServices.map((service) => (
                                    <div
                                        key={service.serviceId}
                                        className="border p-4 rounded hover:shadow"
                                    >
                                        <div className="flex justify-between mb-2 font-semibold">
                                            <span>{service.service?.name}</span>
                                            <span className="text-blue-700">
                        ${service.customPrice || service.service?.basePrice}
                      </span>
                                        </div>
                                        <p className="text-sm text-gray-600">
                                            {service.service?.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Reviews */}
                    <div className="border rounded-lg p-6 bg-white">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">
                                Reviews ({reviews?.length || 0})
                            </h2>
                            <div className="flex items-center space-x-1">
                                <RatingStars rating={parseFloat(provider.rating)} />
                                <span>{provider.rating}</span>
                            </div>
                        </div>
                        {reviews?.length > 0 ? (
                            <div className="space-y-6">
                                {reviews.map((review) => (
                                    <ReviewCard key={review.id} review={review} />
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-600 text-center py-8">
                                No reviews yet. Be the first to leave one!
                            </p>
                        )}
                    </div>
                </div>

                {/* Right: Sidebar */}
                <div className="space-y-6">
                    {/* Quick Info */}
                    <div className="border rounded-lg p-6 bg-white">
                        <h2 className="text-lg font-semibold mb-4">Quick Info</h2>
                        <div className="space-y-3 text-sm text-gray-700">
                            <div className="flex justify-between">
                                <span>Experience</span>
                                <span>{provider.experience}+ years</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Response Time</span>
                                <span>Within 1 hour</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Location</span>
                                <span>{provider.city?.name}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Availability</span>
                                <span className="text-green-600 font-medium">Available</span>
                            </div>
                            <hr className="my-3" />
                            <button className="w-full border text-sm py-2 rounded flex items-center justify-center gap-2">
                                <Phone className="w-4 h-4" />
                                Call Provider
                            </button>
                            <button className="w-full border text-sm py-2 rounded flex items-center justify-center gap-2">
                                <Mail className="w-4 h-4" />
                                Send Email
                            </button>
                        </div>
                    </div>

                    {/* Safety Features */}
                    <div className="border rounded-lg p-6 bg-white">
                        <h2 className="text-lg font-semibold mb-4">Safety Features</h2>
                        <ul className="space-y-3 text-sm text-gray-700">
                            <li className="flex items-center gap-2">
                                <Shield className="w-5 h-5 text-green-600" />
                                Background Verified
                            </li>
                            <li className="flex items-center gap-2">
                                <Award className="w-5 h-5 text-blue-600" />
                                Licensed Professional
                            </li>
                            <li className="flex items-center gap-2">
                                <Star className="w-5 h-5 text-yellow-600" />
                                Client Rated
                            </li>
                            <li className="flex items-center gap-2">
                                <Clock className="w-5 h-5 text-purple-600" />
                                24/7 Support
                            </li>
                        </ul>
                    </div>

                    {/* Similar Providers */}
                    <div className="border rounded-lg p-6 bg-white text-center">
                        <h2 className="text-lg font-semibold mb-2">Similar Providers</h2>
                        <p className="text-sm text-gray-600">
                            Explore other verified professionals in your area.
                        </p>
                        <Link href="/providers">
                            <a className="inline-block mt-4 border px-4 py-2 rounded hover:bg-gray-50">
                                Browse More
                            </a>
                        </Link>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
