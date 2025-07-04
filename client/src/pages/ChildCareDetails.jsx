// src/pages/ChildCareDetails.jsx
import { useParams, useLocation } from "wouter";
import { Baby, CheckCircle } from "lucide-react";
import Footer from "../components/Footer.jsx";
import RatingStars from "../components/RatingStars";

const services = [
  {
    id: 1,
    title: "Professional Babysitting",
    description: "Experienced and caring babysitters for your little ones",
    icon: <Baby className="w-6 h-6" />,
    price: "₹500/hour",
    rating: 4.9,
    features: [
      "Age-appropriate Activities",
      "Meal Preparation",
      "Basic First Aid",
      "Regular Updates"
    ]
  },
  {
    id: 2,
    title: "Child Healthcare",
    description: "Specialized healthcare services for children",
    icon: <Baby className="w-6 h-6" />,
    price: "₹1000/visit",
    rating: 4.8,
    features: [
      "Regular Check-ups",
      "Vaccination Support",
      "Growth Monitoring",
      "Nutrition Guidance"
    ]
  },
  {
    id: 3,
    title: "Baby Massage",
    description: "Therapeutic massage for babies and toddlers",
    icon: <Baby className="w-6 h-6" />,
    price: "₹800/session",
    rating: 4.7,
    features: [
      "Infant Massage",
      "Developmental Support",
      "Sleep Improvement",
      "Bonding Activities"
    ]
  },
  {
    id: 4,
    title: "Specialized Care",
    description: "Expert care for children with special needs",
    icon: <Baby className="w-6 h-6" />,
    price: "₹1200/hour",
    rating: 4.9,
    features: [
      "Special Needs Support",
      "Therapeutic Activities",
      "Behavioral Support",
      "Family Guidance"
    ]
  }
];

export default function ChildCareDetails() {
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
          {service.icon} {service.title}
        </h1>
        <div className="flex items-center gap-2 mb-4">
          <RatingStars rating={service.rating} />
          <span className="text-sm text-gray-600">{service.rating}</span>
        </div>
        <p className="text-gray-600 mb-4">{service.description}</p>
        <div className="text-lg font-semibold mb-4 text-blue-700">
          {service.price}
        </div>

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
            onClick={() => window.history.back()}
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded"
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
