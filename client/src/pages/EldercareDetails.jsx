import { useParams, useLocation } from "wouter";
import { useEffect, useState } from "react";
import { CheckCircle, Shield, Star } from "lucide-react";
import RatingStars from "../components/RatingStars";
import Footer from "../components/Footer";


// Sample data
const elderlyCareServices = [
  {
    id: 1,
    title: "Companionship & Mental Support",
    description: "Friendly interaction, emotional support, and companionship to improve overall well-being.",
    price: "₹1,200/day",
    rating: 4.8,
    features: [
      "Daily Conversations",
      "Games and Memory Exercises",
      "Emotional Well-being",
      "Loneliness Prevention"
    ]
  },
  {
    id: 2,
    title: "Assisted Living Help",
    description: "Support with daily tasks like bathing, dressing, and medication reminders.",
    price: "₹1,800/day",
    rating: 4.9,
    features: [
      "Meal Preparation",
      "Toileting and Hygiene",
      "Mobility Assistance",
      "Medication Reminders"
    ]
  },
  {
    id: 3,
    title: "Health Monitoring",
    description: "Regular check-ins on vitals and chronic condition management.",
    price: "₹1,400/day",
    rating: 4.7,
    features: [
      "Blood Pressure Monitoring",
      "Diabetes Management",
      "Fall Prevention",
      "Vital Tracking"
    ]
  },
  {
    id: 4,
    title: "Post-Hospitalization Recovery",
    description: "Professional support for elderly patients recovering at home after hospital stays.",
    price: "₹2,200/day",
    rating: 4.8,
    features: [
      "Wound Dressing",
      "Medication Schedule",
      "Nutritional Support",
      "Doctor Coordination"
    ]
  }
];

export default function EldercareDetails() {
  const { id } = useParams();
  const [, setLocation] = useLocation();
  const [service, setService] = useState(null);

  useEffect(() => {
    const found = elderlyCareServices.find((item) => item.id === parseInt(id));
    if (found) {
      setService(found);
    }
  }, [id]);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg">
        Service not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
     

      <section className="bg-yellow-50 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{service.title}</h1>
          <div className="flex items-center gap-3 mb-6">
            <RatingStars rating={service.rating} />
            <span className="text-gray-700 text-sm">{service.rating}</span>
            <span className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded text-sm">
              <Shield className="w-4 h-4" /> Verified
            </span>
          </div>
          <p className="text-lg text-gray-700 mb-6">{service.description}</p>

          <ul className="space-y-3 mb-6">
            {service.features.map((feature, idx) => (
              <li key={idx} className="flex items-center text-gray-600 text-base">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                {feature}
              </li>
            ))}
          </ul>

          <div className="flex justify-between items-center">
            <span className="text-2xl font-semibold text-gray-900">{service.price}</span>
            <button
              onClick={() => setLocation("/booking")}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Book Now
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
