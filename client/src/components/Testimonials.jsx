const testimonials = [
    {
        name: "Aryan Sakaria",
        city: "Mumbai",
        service: "Home Nursing",
        quote: "Excellent service! The nurse was very professional and caring.",
    },
    {
        name: "Meera Patel",
        city: "Delhi",
        service: "Child Care",
        quote: "Great experience with child care services. Highly recommended!",
    },
];

const Testimonials = () => {
    return (
        <section className="bg-[#f9fbfc] py-20 px-4 text-center">
            <h2 className="text-3xl font-bold mb-2">What Our Clients Say</h2>
            <p className="text-gray-600 text-lg mb-10">
                Trusted by thousands of families across India
            </p>

            <div className="flex flex-col md:flex-row justify-center gap-6 max-w-5xl mx-auto">
                {testimonials.map((testimonial, index) => (
                    <div
                        key={index}
                        className="bg-blue-50 border border-blue-100 rounded-lg p-6 text-left w-full md:w-1/2"
                    >
                        <div className="text-yellow-400 text-xl mb-2">
                            {"★".repeat(5)}
                        </div>
                        <p className="italic text-gray-800 mb-4">
                            "{testimonial.quote}"
                        </p>
                        <p className="font-semibold text-gray-900">{testimonial.name}</p>
                        <div className="flex justify-between text-sm text-gray-600">
                            <span>{testimonial.city}</span>
                            <span className="font-medium">{testimonial.service}</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Testimonials;
