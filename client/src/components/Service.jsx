const serviceData = [
    {
        emoji: '🏠',
        title: 'Home Care',
        description: 'Professional home nursing and elderly care services',
        items: ['Home Nursing', 'Elderly Care', 'Respite Care'],
        more: '+2 more services',
        bg: 'bg-blue-50',
        border: 'border-blue-200',
    },
    {
        emoji: '⚕️',
        title: 'Medical Services',
        description: 'Qualified medical professionals at your doorstep',
        items: ['Doctor Visit', 'Physiotherapy', 'Occupational Therapy'],
        more: '+2 more services',
        bg: 'bg-green-50',
        border: 'border-green-200',
    },
    {
        emoji: '👶',
        title: 'Child Care',
        description: 'Trusted child care and baby care specialists',
        items: ['Babysitting', 'Child Healthcare', 'Baby Massage'],
        more: '+1 more services',
        bg: 'bg-purple-50',
        border: 'border-purple-200',
    },
];

const Service = () => {
    return (
        <section className="bg-[#f9fbfc] py-20 px-4 text-center">
            <h2 className="text-3xl font-bold mb-2">Our Services</h2>
            <p className="text-gray-600 text-lg mb-10">
                Choose from our wide range of healthcare services
            </p>

            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {serviceData.map((service, index) => (
                    <div
                        key={index}
                        className={`p-6 rounded-xl border ${service.bg} ${service.border} shadow-sm`}
                    >
                        <div className="text-4xl mb-4">{service.emoji}</div>
                        <h3 className="text-xl font-semibold mb-1">{service.title}</h3>
                        <p className="text-gray-600 mb-4 text-sm">{service.description}</p>

                        <ul className="text-left text-gray-800 text-sm mb-2 list-disc list-inside">
                            {service.items.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                        <p className="text-blue-600 text-sm mb-4 cursor-pointer hover:underline">
                            {service.more}
                        </p>

                        <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 text-sm">
                            Explore Services
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Service;
