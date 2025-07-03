import React, { useState, useEffect } from "react";

const AdminPanel = () => {
    const [providers, setProviders] = useState([]);
    const [feedbackList, setFeedbackList] = useState([]);
    const [activeTab, setActiveTab] = useState("providers");

    useEffect(() => {
        const dummyProviders = [
            {
                id: 1,
                name: "Priya Sharma",
                specialty: "Home Care",
                status: "approved",
            },
            {
                id: 2,
                name: "Ravi Verma",
                specialty: "Child Care",
                status: "pending",
            },
        ];

        const dummyFeedback = [
            {
                id: 1,
                user: "John Doe",
                message: "Great service, very satisfied!",
            },
            {
                id: 2,
                user: "Jane Smith",
                message: "The provider was late but helpful.",
            },
        ];

        setProviders(dummyProviders);
        setFeedbackList(dummyFeedback);
    }, []);

    const toggleProviderStatus = (id) => {
        setProviders((prev) =>
            prev.map((p) =>
                p.id === id
                    ? {
                        ...p,
                        status: p.status === "approved" ? "pending" : "approved",
                    }
                    : p
            )
        );
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
            <div className="flex gap-4 mb-6">
                <button
                    onClick={() => setActiveTab("providers")}
                    className={`px-4 py-2 rounded ${
                        activeTab === "providers"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-800"
                    }`}
                >
                    Providers
                </button>
                <button
                    onClick={() => setActiveTab("feedback")}
                    className={`px-4 py-2 rounded ${
                        activeTab === "feedback"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-800"
                    }`}
                >
                    Feedback
                </button>
            </div>

            {activeTab === "providers" && (
                <div>
                    <h3 className="text-xl font-semibold mb-3">Service Providers</h3>
                    <ul className="space-y-4">
                        {providers.map((provider) => (
                            <li
                                key={provider.id}
                                className="p-4 border rounded shadow flex justify-between items-center"
                            >
                                <div>
                                    <p className="font-medium">{provider.name}</p>
                                    <p className="text-sm text-gray-600">
                                        {provider.specialty} -{" "}
                                        <span
                                            className={`${
                                                provider.status === "approved"
                                                    ? "text-green-600"
                                                    : "text-yellow-600"
                                            }`}
                                        >
                      {provider.status}
                    </span>
                                    </p>
                                </div>
                                <button
                                    onClick={() => toggleProviderStatus(provider.id)}
                                    className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    {provider.status === "approved" ? "Revoke" : "Approve"}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {activeTab === "feedback" && (
                <div>
                    <h3 className="text-xl font-semibold mb-3">User Feedback</h3>
                    <ul className="space-y-4">
                        {feedbackList.map((feedback) => (
                            <li
                                key={feedback.id}
                                className="p-4 border rounded shadow bg-white"
                            >
                                <p className="font-medium">{feedback.user}</p>
                                <p className="text-gray-700">{feedback.message}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default AdminPanel;
