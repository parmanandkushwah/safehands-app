import { MessageSquare, Phone, BookOpen, Search } from "lucide-react";
import Footer from "../components/Footer";
import { useState } from "react";

export default function Support() {
    const faqCategories = [
        {
            title: "General Questions",
            questions: [
                {
                    question: "What services does SafeHands Healthcare offer?",
                    answer:
                        "SafeHands Healthcare offers a wide range of healthcare services including home care, medical services, and child care. Our services are delivered by verified healthcare professionals right at your doorstep.",
                },
                {
                    question: "How do I book a service?",
                    answer:
                        "You can book a service through our website or mobile app. Simply select the service you need, choose a provider, pick your preferred time slot, and complete the booking process.",
                },
                {
                    question: "What areas do you serve?",
                    answer:
                        "We currently serve major cities across India. You can check our service availability in your area by entering your location on our website.",
                },
            ],
        },
        {
            title: "Provider Information",
            questions: [
                {
                    question: "How are healthcare providers verified?",
                    answer:
                        "All our healthcare providers undergo a thorough verification process including background checks, license verification, and reference checks to ensure the highest standards of care.",
                },
                {
                    question: "Can I choose my healthcare provider?",
                    answer:
                        "Yes, you can view provider profiles, read reviews, and select the healthcare professional that best meets your needs.",
                },
                {
                    question: "What qualifications do your providers have?",
                    answer:
                        "Our providers are licensed healthcare professionals with relevant qualifications and experience in their respective fields.",
                },
            ],
        },
        {
            title: "Payment & Pricing",
            questions: [
                {
                    question: "What payment methods are accepted?",
                    answer:
                        "We accept various payment methods including credit/debit cards, UPI, net banking, and digital wallets. All payments are secure and encrypted.",
                },
                {
                    question: "Are there any hidden charges?",
                    answer:
                        "No, we believe in transparent pricing. All charges are clearly displayed before booking, and there are no hidden fees.",
                },
                {
                    question: "Do you offer any discounts or packages?",
                    answer:
                        "Yes, we offer various packages and discounts for regular services. Check our website for current offers and promotions.",
                },
            ],
        },
        {
            title: "Safety & Security",
            questions: [
                {
                    question: "How do you ensure service quality?",
                    answer:
                        "We maintain strict quality standards through regular monitoring, client feedback, and continuous provider training.",
                },
                {
                    question: "What if I'm not satisfied with the service?",
                    answer:
                        "We have a satisfaction guarantee policy. If you're not satisfied with the service, please contact our support team within 24 hours.",
                },
                {
                    question: "How is my data protected?",
                    answer:
                        "We use advanced security measures to protect your data. All information is encrypted and stored securely in compliance with data protection regulations.",
                },
            ],
        },
    ];

    const supportOptions = [
        {
            icon: <MessageSquare className="w-8 h-8" />,
            title: "Live Chat",
            description: "Chat with our support team in real-time",
            action: "Start Chat",
        },
        {
            icon: <Phone className="w-8 h-8" />,
            title: "Phone Support",
            description: "Call us at +91 1800-123-4567",
            action: "Call Now",
        },
        {
            icon: <BookOpen className="w-8 h-8" />,
            title: "Knowledge Base",
            description: "Browse our comprehensive help articles",
            action: "View Articles",
        },
    ];

    const [openIndex, setOpenIndex] = useState(null);

    const toggleAccordion = (idx) => {
        setOpenIndex(openIndex === idx ? null : idx);
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Hero */}
            <section className="bg-gradient-to-r from-blue-50 to-white py-16 lg:py-24">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                        How can we help you?
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                        Find answers to common questions or get in touch with our support team
                    </p>
                    <div className="max-w-2xl mx-auto relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search for help..."
                            className="pl-10 w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
            </section>

            {/* Support Options */}
            <section className="py-16 lg:py-20">
                <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
                    {supportOptions.map((option, index) => (
                        <div key={index} className="bg-white rounded-lg p-8 shadow text-center">
                            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
                                {option.icon}
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">{option.title}</h3>
                            <p className="text-gray-600 mb-4">{option.description}</p>
                            <button className="w-full border border-gray-300 rounded-md py-2 text-blue-600 hover:bg-blue-50">
                                {option.action}
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 lg:py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Find answers to common questions about our services
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        {faqCategories.map((category, i) => (
                            <div key={i} className="mb-10">
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                                    {category.title}
                                </h3>
                                {category.questions.map((faq, j) => {
                                    const idx = `${i}-${j}`;
                                    const isOpen = openIndex === idx;
                                    return (
                                        <div key={j} className="mb-4 border rounded-lg">
                                            <button
                                                onClick={() => toggleAccordion(idx)}
                                                className="w-full text-left px-4 py-3 font-medium text-gray-800 hover:bg-gray-100 focus:outline-none"
                                            >
                                                {faq.question}
                                            </button>
                                            {isOpen && (
                                                <div className="px-4 pb-4 text-gray-600">{faq.answer}</div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact CTA */}
            <section className="py-16 lg:py-20">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Still Need Help?</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                        Our support team is here to help you with any questions or concerns
                    </p>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md">
                        Contact Support
                    </button>
                </div>
            </section>

            <Footer />
        </div>
    );
}
