import { Link } from "wouter";
import { Heart, Stethoscope, Baby, CheckCircle } from "lucide-react";

// Mock category data (you can replace this with real data or keep it in a separate file)
const serviceCategories = [
    {
        id: 1,
        name: "Home Care",
        description: "Compassionate at-home support for your loved ones.",
    },
    {
        id: 2,
        name: "Medical Services",
        description: "Doctor visits, therapy, and medical care delivered to your home.",
    },
    {
        id: 3,
        name: "Child Care",
        description: "Trusted babysitting and pediatric care from verified experts.",
    },
];

export default function ServiceCategories() {
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
                return "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b";
            case "medical services":
                return "https://images.unsplash.com/photo-1582750433449-648ed127bb54";
            case "child care":
                return "https://images.unsplash.com/photo-1544551763-46a013bb70d5";
            default:
                return "";
        }
    };

    const getCategoryServices = (categoryName) => {
        switch (categoryName.toLowerCase()) {
            case "home care":
                return [
                    "Private Nursing",
                    "Elderly Assistance",
                    "Meal Preparation",
                    "Personal Hygiene Help",
                ];
            case "medical services":
                return [
                    "Doctor Visits",
                    "Physiotherapy",
                    "Medication Support",
                    "Health Monitoring",
                ];
            case "child care":
                return [
                    "Babysitting",
                    "Newborn Care",
                    "Child Hygiene",
                    "Learning Activities",
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
        <section className="bg-gray-50 py-16 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900">Our Care Services</h2>
                    <p className="text-gray-600 mt-2 max-w-xl mx-auto">
                        Choose from a range of expert-led care options, delivered at your convenience.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {serviceCategories.map((category) => (
                        <div
                            key={category.id}
                            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                        >
                            <img
                                src={getCategoryImage(category.name)}
                                alt={`${category.name} category`}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="bg-blue-100 p-2 rounded-md">
                                        {getCategoryIcon(category.name)}
                                    </div>
                                    <h3 className="text-xl font-bold">{category.name}</h3>
                                </div>

                                <p className="text-gray-600 mb-4">{category.description}</p>

                                <ul className="space-y-2 mb-6 text-sm text-gray-700">
                                    {getCategoryServices(category.name).map((service, idx) => (
                                        <li key={idx} className="flex items-center">
                                            <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                                            {service}
                                        </li>
                                    ))}
                                </ul>

                                <Link href={getCategoryRoute(category.name)}>
                                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded text-sm">
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
