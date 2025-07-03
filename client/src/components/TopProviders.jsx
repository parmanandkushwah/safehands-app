import { useLocation } from "wouter";

const providers = [
    {
        name: "Dr. Rajesh Patel",
        specialty: "Home Care Specialist",
        rating: 4.9,
        reviews: 156,
        experience: "8 years experience",
        location: "Mumbai",
        price: "₹500/hour",
    },
    {
        name: "Priya Sharma",
        specialty: "Medical Services",
        rating: 4.8,
        reviews: 203,
        experience: "6 years experience",
        location: "Delhi",
        price: "₹600/hour",
    },
    {
        name: "Anita Reddy",
        specialty: "Child Care Specialist",
        rating: 4.9,
        reviews: 89,
        experience: "5 years experience",
        location: "Bangalore",
        price: "₹400/hour",
    },
];

const TopProviders = () => {
    const [, setLocation] = useLocation();

    const handleBookNow = (provider) => {
        const bookingData = {
            serviceName: provider.specialty,
            date: new Date().toLocaleDateString("en-IN", { dateStyle: "long" }),
            time: "10:00 AM",
            duration: "4 hours",
            totalAmount: provider.price,
            bookingId: "SH-" + Math.floor(100000 + Math.random() * 900000),
            caregiver: {
                name: provider.name,
                experience: provider.experience,
                rating: provider.rating,
            },
        };

        localStorage.setItem("bookingDetails", JSON.stringify(bookingData));
        setLocation("/booking");
    };

    return (
        <section className="bg-[#f9fbfc] py-20 px-4 text-center">
            <h2 className="text-3xl font-bold mb-2">Top Rated Providers</h2>
            <p className="text-gray-600 text-lg mb-10">
                Meet our most trusted healthcare professionals
            </p>

            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {providers.map((provider, index) => (
                    <div
                        key={index}
                        className="bg-white p-6 rounded-xl shadow-md text-center border border-gray-100"
                    >
                        <div className="flex justify-center mb-4">
                            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl">
                                <span className="material-icons">person</span>
                            </div>
                        </div>

                        <h3 className="text-lg font-semibold">
                            {provider.name} <span className="text-green-500">✔️</span>
                        </h3>
                        <p className="text-gray-500 text-sm">{provider.specialty}</p>

                        <p className="mt-2 text-sm text-gray-700">
                            <span className="text-yellow-500">⭐</span> {provider.rating}{" "}
                            <span className="text-gray-500">({provider.reviews} reviews)</span>
                        </p>

                        <div className="flex justify-between text-sm text-gray-600 mt-4">
                            <span>{provider.experience}</span>
                            <span>{provider.location}</span>
                        </div>

                        <p className="text-blue-600 font-semibold text-lg mt-4">
                            {provider.price}
                        </p>

                        <button
                            onClick={() => handleBookNow(provider)}
                            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 text-sm w-full"
                        >
                            Book Now
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TopProviders;
