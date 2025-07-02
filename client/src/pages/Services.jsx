const servicesData = [
    {
        icon: '🏠',
        title: 'Home Care',
        description: 'Professional home nursing and elderly care services at your doorstep.',
    },
    {
        icon: '⚕️',
        title: 'Medical Services',
        description: 'Qualified medical professionals available for home visits.',
    },
    {
        icon: '👶',
        title: 'Child Care',
        description: 'Specialized baby and child healthcare services from experts.',
    },
    {
        icon: '👵',
        title: 'Elderly Care',
        description: 'Compassionate support for senior citizens and their well-being.',
    },
];

const Services = () => {
    return (
        <section className="min-h-screen py-16 px-4 bg-[#f9fbfc]">
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-4xl font-bold mb-4">Our Services</h2>
                <p className="text-gray-600 mb-10">
                    We provide personalized healthcare solutions to meet your needs.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {servicesData.map((service, index) => (
                        <div
                            key={index}
                            className="bg-white shadow-md rounded-xl p-6 text-left hover:shadow-lg transition duration-300"
                        >
                            <div className="text-4xl mb-4">{service.icon}</div>
                            <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                            <p className="text-gray-600 text-sm">{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
export default Services;
