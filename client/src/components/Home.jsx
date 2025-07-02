import { MapPin, Search, ShieldCheck, Star, Clock } from 'lucide-react';

const HeroSection = () => {
    return (
        <section className="bg-blue-600 text-white py-20 px-4 text-center">
            {/* Top Heading */}
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Trusted Care, Right at Your Doorstep
            </h1>
            <p className="text-lg md:text-xl mb-10">
                Connect with verified healthcare professionals for home care, medical services, and child care
            </p>

            {/* Search + Location Box */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-10 max-w-4xl mx-auto">
                {/* City Selector */}
                <button className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-700 rounded-lg text-white text-sm">
                    <MapPin className="w-4 h-4" />
                    Select your city
                </button>

                {/* Search Bar */}
                <div className="flex items-center w-full md:w-auto bg-white rounded-lg overflow-hidden">
                    <div className="flex items-center px-3">
                        <Search className="text-gray-400 w-5 h-5" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search for services..."
                        className="w-full md:w-72 px-2 py-2 text-gray-700 focus:outline-none"
                    />
                </div>

                {/* Find Care Button */}
                <button className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium text-sm">
                    Find Care
                </button>
            </div>

            {/* Features */}
            <div className="flex justify-center gap-8 text-sm flex-wrap">
                <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5" />
                    Verified Professionals
                </div>
                <div className="flex items-center gap-2">
                    <Star className="w-5 h-5" />
                    Top Rated Services
                </div>
                <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    24/7 Support
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
