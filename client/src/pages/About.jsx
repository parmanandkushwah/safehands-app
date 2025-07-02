import { Link } from "wouter";

const About = () => {
    return (
        <section className="min-h-screen bg-white pt-20 pb-16 px-4">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl font-bold text-center mb-8">About SafeHands</h2>

                <div className="grid md:grid-cols-2 gap-10 items-center">
                    {/* Left - Text */}
                    <div>
                        <p className="text-gray-700 mb-4 text-lg leading-relaxed">
                            SafeHands is a trusted healthcare platform that connects individuals with
                            verified service providers, offering home care, medical support, and
                            personalized wellness services.
                        </p>
                        <p className="text-gray-700 text-lg leading-relaxed">
                            Our mission is to make quality healthcare accessible, comfortable, and
                            tailored to every family's needs—right at their doorstep.
                        </p>
                    </div>

                    {/* Right - Image */}
                    <div className="w-full h-64 md:h-80 rounded-xl overflow-hidden shadow-md">
                        <img
                            src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=800&q=80"
                            alt="Healthcare at Home"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* Go Home Button */}
                <div className="text-center mt-12">
                    <Link href="/">
                        <button className="bg-[#1f3c88] text-white px-6 py-3 rounded-full hover:bg-[#173072] transition duration-200">
                            Go to Home
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default About;
