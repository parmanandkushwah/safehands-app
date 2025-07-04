import { Route, Switch } from "wouter";
import Navbar from "./components/Navbar.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Pages
import HomePage from "./pages/HomePage.jsx";
import About from "./pages/About.jsx";
import ChildCare from "./pages/ChildCare.jsx";
import MedicalServices from "./pages/MedicalServices.jsx";
import HomeCare from "./pages/HomeCare.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Booking from "./pages/Booking.jsx";
import BookingConfirmationPage from "./pages/BookingConfirmationPage.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ElderlyCare from "./pages/ElderlyCare.jsx";
import Contact from "./pages/Contact.jsx";
import Careers from "./pages/Careers.jsx";
import Support from "./pages/Support.jsx";
import EldercareDetails from "./pages/EldercareDetails.jsx";
import MedicalServiceDetails from "./pages/MedicalServiceDetails.jsx";
import HomeCareDetails from "./pages/HomeCareDetails.jsx";
import ChildCareDetails from "./pages/ChildCareDetails.jsx";

export default function App() {
    return (
        <>
            <Navbar />

            <Switch>
                <Route path="/" component={HomePage} />
                <Route path="/about" component={About} />
                <Route path="/child-care" component={ChildCare} />
                <Route path="/medical-services" component={MedicalServices} />
                <Route path="/home-care" component={HomeCare} />
                <Route path="/booking" component={Booking} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/booking-confirmation" component={BookingConfirmationPage} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/elderly-care" component={ElderlyCare} />
                <Route path="/contact" component={Contact} />
                <Route path="/careers" component={Careers} />
                <Route path="/support" component={Support} />
                <Route path="/elderly-care/:id" component={EldercareDetails} />
                <Route path="/medical-services/:id" component={MedicalServiceDetails} />
                <Route path="/home-care/:id" component={HomeCareDetails} />
                <Route path="/child-care/:id" component={ChildCareDetails} />
            </Switch>

            {/* Toast notifications */}
            <ToastContainer position="top-right" autoClose={3000} />
        </>
    );
}
