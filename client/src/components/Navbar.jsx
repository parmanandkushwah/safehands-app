import { FaMapMarkerAlt, FaSearch } from "react-icons/fa";

const Navbar = () => {
    return (
        <nav className="w-full bg-white shadow-sm px-6 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo + Tagline */}
                <div className="flex items-center gap-2">
                    <img src="/logo.png" alt="SafeHands" className="h-6 w-6" />
                    <div>
                        <h1 className="text-xl font-semibold text-[#1f3c88]">SafeHands</h1>
                        <p className="text-xs text-[#3571db]">Trusted Care, Right at Your Doorstep</p>
                    </div>
                </div>

                {/* Center controls */}
                <div className="flex items-center gap-3">
                    {/* Location */}
                    <div className="flex items-center gap-2 border px-3 py-1 rounded-md text-sm">
                        <FaMapMarkerAlt className="text-blue-600" />
                        <select className="outline-none bg-transparent text-black">
                            <option>Select City</option>
                            <option>Delhi</option>
                            <option>Mumbai</option>
                            <option>Bangalore</option>
                        </select>
                    </div>

                    {/* Detect Button */}
                    <button className="border px-3 py-1 text-blue-600 rounded-md text-sm hover:bg-blue-50">
                        Detect
                    </button>

                    {/* Search */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search services..."
                            className="pl-8 pr-3 py-1 border rounded-md text-sm w-48"
                        />
                        <FaSearch className="absolute left-2 top-2.5 text-gray-500 text-sm" />
                    </div>
                </div>

                {/* Sign In */}
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md text-sm">
                    Sign In
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
