import { Link } from "wouter";

const Footer = () => {
    return (
        <footer className="bg-[#1f3c88] text-white py-12 px-6">
            <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 text-sm">

                {/* Logo and tagline */}
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <img src="/logo.png" alt="SafeHands Logo" className="w-6 h-6" />
                        <span className="font-semibold text-lg">SafeHands</span>
                    </div>
                    <p className="text-gray-300">Trusted Care, Right at Your Doorstep</p>
                </div>

                {/* Services */}
                <div>
                    <h4 className="font-semibold mb-2">Services</h4>
                    <ul className="space-y-1 text-gray-300">
                        <li>Home Care</li>
                        <li>Medical Services</li>
                        <li>Child Care</li>
                        <li>Elderly Care</li>
                    </ul>
                </div>

                {/* Company */}
                <div>
                    <h4 className="font-semibold mb-2">Company</h4>
                    <ul className="space-y-1 text-gray-300">
                        <li>
                            <Link href="/about">
                                <span className="hover:underline hover:text-white cursor-pointer">About Us</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/contact">
                                <span className="hover:underline hover:text-white cursor-pointer">Contact</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/careers">
                                <span className="hover:underline hover:text-white cursor-pointer">Careers</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/support">
                                <span className="hover:underline hover:text-white cursor-pointer">Support</span>
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h4 className="font-semibold mb-2">Contact</h4>
                    <ul className="space-y-1 text-gray-300">
                        <li>support@safehands.com</li>
                        <li>+91 9876543210</li>
                        <li>Available 24/7</li>
                    </ul>
                </div>
            </div>

            {/* Bottom text */}
            <div className="text-center text-gray-400 text-xs mt-10 border-t border-blue-800 pt-6">
                © 2024 SafeHands Healthcare. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
