import { Link } from "wouter";

import { Baby, Stethoscope, Home } from "lucide-react";

export default function Service() {
    const services = [
        {
            id: "child-care",
            title: "Child Care",
            description: "Trusted care solutions for your children including babysitting, child healthcare, and more.",
            icon: <Baby className="w-8 h-8 text-blue-600" />,
            link: "/child-care"
        },
        {
            id: "medical-services",
            title: "Medical Services",
            description: "Access a wide range of home medical services by trained professionals.",
            icon: <Stethoscope className="w-8 h-8 text-blue-600" />,
            link: "/medical-services"
        },
        {
            id: "home-care",
            title: "Home Care",
            description: "Compassionate home care for seniors, individuals with special needs, and more.",
            icon: <Home className="w-8 h-8 text-blue-600" />,
            link: "/home-care"
        }
    ];

    return (
        <div className="min-h-screen bg-white" id="services-section">
            <section className="py-20 bg-gray-50">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h1>
                    <p className="text-gray-600 text-lg mb-10">
                        Explore the services we provide for your family's health and well-being.
                    </p>

                    <div className="grid md:grid-cols-3 gap-8">
                        {services.map((service) => (
                            <div
                                key={service.id}
                                className="bg-white border border-gray-200 rounded-lg shadow-md p-6 hover:shadow-lg transition"
                            >
                                <div className="flex justify-center mb-4">{service.icon}</div>
                                <h2 className="text-xl font-semibold text-gray-800 mb-2">{service.title}</h2>
                                <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                                <Link href={service.link}>
                                  <span className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer">
                                    Explore Services
                                  </span>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
}
