import { useState } from "react";
import { useLocation } from "wouter";
import Footer from "../components/Footer";

export default function Register() {
    const [, setLocation] = useLocation();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleRegister = (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            setIsLoading(false);
            return;
        }

        setTimeout(() => {
            const newUser = {
                ...formData,
                role: "user"
            };
            localStorage.setItem("user", JSON.stringify(newUser));
            setIsLoading(false);
            setLocation("/");
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-white">
            <main className="flex items-center justify-center py-12 px-4">
                <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-2xl font-bold text-center mb-2">Create an account</h2>
                    <p className="text-center text-sm text-gray-600 mb-6">
                        Enter your information to create your account
                    </p>
                    {error && (
                        <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-sm">{error}</div>
                    )}
                    <form onSubmit={handleRegister} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium">First Name</label>
                                <input
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                    className="w-full border px-3 py-2 rounded mt-1"
                                    placeholder="Enter your first name"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium">Last Name</label>
                                <input
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                    className="w-full border px-3 py-2 rounded mt-1"
                                    placeholder="Enter your last name"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="text-sm font-medium">Email</label>
                            <input
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full border px-3 py-2 rounded mt-1"
                                placeholder="Enter your email"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Password</label>
                            <input
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full border px-3 py-2 rounded mt-1"
                                placeholder="Create a password"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Confirm Password</label>
                            <input
                                name="confirmPassword"
                                type="password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                className="w-full border px-3 py-2 rounded mt-1"
                                placeholder="Confirm your password"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                        >
                            {isLoading ? "Creating account..." : "Create Account"}
                        </button>
                    </form>
                    <p className="text-center text-sm text-gray-600 mt-4">
                        Already have an account?{" "}
                        <span
                            className="text-blue-600 hover:underline cursor-pointer"
                            onClick={() => setLocation("/login")}
                        >
              Login here
            </span>
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    );
}
