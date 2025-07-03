import { Link } from "wouter";
import { Heart, Stethoscope, Baby, CheckCircle } from "lucide-react";

// Mock data for services
const serviceCategories = [
    {
        id: 1,
        name: "Home Care",
        description: "Supportive home care services for your loved ones.",
    },
    {
        id: 2,
        name: "Medical Services",
        description: "Professional medical support at your doorstep.",
    },
    {
        id: 3,
        name: "Child Care",
        description: "Specialized care for babies and young children.",
    },
];

export default function ServiceProvided() {
    const getCategoryIcon = (categoryName) => {
        switch (categoryName.toLowerCase()) {
            case "home care":
                return <Heart className="w-6 h-6 text-blue-600" />;
            case "medical services":
                return <Stethoscope className="w-6 h-6 text-blue-600" />;
            case "child care":
                return <Baby className="w-6 h-6 text-blue-600" />;
            default:
                return <Heart className="w-6 h-6 text-blue-600" />;
        }
    };

    const getCategoryImage = (categoryName) => {
        switch (categoryName.toLowerCase()) {
            case "home care":
                return "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&h=400";
            case "medical services":
                return "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=800&h=400";
            case "child care":
                return "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&h=400";
            default:
                return "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&h=400";
        }
    };

    const getCategoryServices = (categoryName) => {
        switch (categoryName.toLowerCase()) {
            case "home care":
                return [
                    "Home Nursing & Private Nurses",
                    "Elderly & Respite Care",
                    "Caregivers & Companions",
                    "Meal Preparation",
                ];
            case "medical services":
                return [
                    "Doctor Visits & Consultations",
                    "Physiotherapy & Occupational Therapy",
                    "Pain Management & Recovery",
                    "Massage & Spa Therapy",
                ];
            case "child care":
                return [
                    "Professional Babysitting",
                    "Child Healthcare Services",
                    "Baby Massage & Therapy",
                    "Specialized Baby Care",
                ];
            default:
                return [];
        }
    };

    const getCategoryRoute = (categoryName) => {
        switch (categoryName.toLowerCase()) {
            case "home care":
                return "/home-care";
            case "medical services":
                return "/medical-services";
            case "child care":
                return "/child-care";
            default:
                return "/";
        }
    };

    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-4 text-gray-800">Our Care Services</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Comprehensive care solutions delivered by verified professionals with the highest standards of quality and safety.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {serviceCategories.map((category) => (
                        <div
                            key={category.id}
                            className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden"
                        >
                            <img
                                src={getCategoryImage(category.name)}
                                alt={category.name}
                                className="w-full h-48 object-cover"
                            />

                            <div className="p-6">
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="bg-blue-100 p-2 rounded-full">{getCategoryIcon(category.name)}</div>
                                    <h3 className="text-xl font-semibold text-gray-800">{category.name}</h3>
                                </div>

                                <p className="text-gray-600 mb-4">{category.description}</p>

                                <ul className="mb-4 space-y-1">
                                    {getCategoryServices(category.name).map((service, index) => (
                                        <li key={index} className="flex items-center text-sm text-gray-700">
                                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                            {service}
                                        </li>
                                    ))}
                                </ul>

                                <Link href={getCategoryRoute(category.name)}>
                                    <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
                                        Explore {category.name}
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
