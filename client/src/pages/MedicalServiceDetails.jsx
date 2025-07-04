// src/pages/MedicalServiceDetails.jsx
import { useParams, useLocation } from "wouter";
import { CheckCircle, Stethoscope } from "lucide-react";
import Footer from "../components/Footer";
import RatingStars from "../components/RatingStars";

const services = [
  {
    id: 1,
    title: "Doctor Home Visits",
    rating: 4.8,
    price: "₹1500/visit",
    verified: true,
    description: "Professional medical consultations in the comfort of your home",
    features: [
      "General Health Checkup",
      "Specialist Consultations",
      "Prescription Services",
      "Follow-up Care",
    ],
  },
  {
    id: 2,
    title: "Physiotherapy",
    rating: 4.9,
    price: "₹1200/session",
    verified: true,
    description: "Expert physiotherapy services for rehabilitation and pain management",
    features: [
      "Post-operative Rehabilitation",
      "Sports Injury Recovery",
      "Chronic Pain Management",
      "Mobility Enhancement",
    ],
  },
  {
    id: 3,
    title: "Medical Massage",
    rating: 4.7,
    price: "₹2000/session",
    verified: true,
    description: "Therapeutic massage services for pain relief and wellness",
    features: [
      "Deep Tissue Massage",
      "Sports Massage",
      "Rehabilitation Massage",
      "Wellness Therapy",
    ],
  },
  {
    id: 4,
    title: "Health Monitoring",
    rating: 4.6,
    price: "₹800/session",
    verified: true,
    description: "Regular health monitoring and vital signs tracking",
    features: [
      "Vital Signs Monitoring",
      "Health Reports",
      "Regular Check-ups",
      "Emergency Alerts",
    ],
  },
];

export default function MedicalServiceDetails() {
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
          <Stethoscope className="w-6 h-6 text-blue-600" />
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
            onClick={() => setLocation("/medical-services")}
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
