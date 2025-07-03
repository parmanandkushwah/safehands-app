import { useState } from "react";
import { useLocation } from "wouter";
import Footer from "../components/Footer";

export default function Login() {
    const [, setLocation] = useLocation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();

        if (email === "aryansakaria01@gmail.com" && password === "password") {
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("user", JSON.stringify({ email, firstName: "Aryan" }));
            setLocation("/");
        } else {
            setError("Invalid email or password");
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 border border-gray-200">
                    <h2 className="text-2xl font-bold text-center mb-6">Welcome Back</h2>

                    {error && (
                        <div className="bg-red-100 text-red-700 px-4 py-2 mb-4 rounded text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium mb-1">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                className="w-full border border-gray-300 rounded px-3 py-2"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium mb-1">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                className="w-full border border-gray-300 rounded px-3 py-2"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Login
                        </button>
                    </form>

                    <div className="mt-4 text-center text-sm text-gray-600">
                        Don't have an account?{" "}
                        <button
                            onClick={() => setLocation("/register")}
                            className="text-blue-600 hover:underline"
                        >
                            Register here
                        </button>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
