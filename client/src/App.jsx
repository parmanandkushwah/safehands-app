import { Route, Switch } from "wouter";
import Navbar from "./components/Navbar.jsx";
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
import Contact from "./pages/Contact.jsx";
import Careers from "./pages/Careers.jsx";
import Support from "./pages/Support.jsx";
import ServiceDetails from "./pages/ServiceDetails";
import ChildCareDetails from "./pages/ChildCareDetails.jsx";
import MedicalServiceDetails from "./pages/MedicalServiceDetails";
import HomeCareDetails from "./pages/HomeCareDetails";
import ElderlyCare from "./pages/ElderlyCare";
import EldercareDetails from "./pages/EldercareDetails"; 

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
                <Route path="/services/:id" component={ServiceDetails} />
                <Route path="/child-care/:id" component={ChildCareDetails} />
                <Route path="/medical-service/:id" component={MedicalServiceDetails} />
                <Route path="/home-care/:id" component={HomeCareDetails} />
                <Route path="/elderly-care" component={ElderlyCare} />
                <Route path="/elderly-care/:id" component={EldercareDetails} />




                {/* Optional dynamic route for future */}
                {/* <Route path="/home-care/:id" component={HomeCareDetail} /> */}
            </Switch>
        </>
    );
}
