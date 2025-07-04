// src/pages/HomeCareDetails.jsx
import { useParams, useLocation } from "wouter";
import { CheckCircle, Home } from "lucide-react";
import Footer from "../components/Footer";
import RatingStars from "../components/RatingStars";

const services = [
  {
    id: 1,
    title: "Elderly Care",
    description: "Comprehensive care services for elderly individuals",
    price: "₹1500/day",
    rating: 4.9,
    features: [
      "Personal Care Assistance",
      "Medication Management",
      "Mobility Support",
      "Companionship"
    ]
  },
  {
    id: 2,
    title: "Post-Surgery Care",
    description: "Professional care services for post-operative recovery",
    price: "₹2000/day",
    rating: 4.8,
    features: [
      "Wound Care",
      "Physical Therapy",
      "Pain Management",
      "Recovery Monitoring"
    ]
  },
  {
    id: 3,
    title: "Chronic Disease Care",
    description: "Specialized care for chronic health conditions",
    price: "₹1800/day",
    rating: 4.7,
    features: [
      "Disease Management",
      "Regular Monitoring",
      "Lifestyle Support",
      "Emergency Response"
    ]
  },
  {
    id: 4,
    title: "Palliative Care",
    description: "Compassionate care for individuals with serious illnesses",
    price: "₹2500/day",
    rating: 4.9,
    features: [
      "Pain Management",
      "Emotional Support",
      "Family Counseling",
      "Comfort Care"
    ]
  }
];

export default function HomeCareDetails() {
  const { id } = useParams();
  const [, setLocation] = useLocation();
  const service = services.find((s) => s.id === parseInt(id));

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 text-xl">
        Service not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 flex items-center gap-2">
          <Home className="w-6 h-6 text-blue-600" />
          {service.title}
        </h1>

        <div className="flex items-center gap-2 mb-4">
          <RatingStars rating={service.rating} />
          <span className="text-sm text-gray-600">{service.rating}</span>
        </div>

        <p className="text-gray-600 mb-4">{service.description}</p>

        <div className="text-lg font-semibold mb-4 text-blue-700">{service.price}</div>

        <ul className="space-y-2 text-gray-700 mb-8">
          {service.features.map((f, i) => (
            <li key={i} className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
              {f}
            </li>
          ))}
        </ul>

        <div className="flex justify-between items-center">
          <button
            onClick={() => setLocation("/home-care")}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
          >
            ← Back
          </button>

          <button
            onClick={() => setLocation("/booking")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
          >
            Book Now
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
