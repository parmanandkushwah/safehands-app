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
import ElderlyCare from "./pages/ElderlyCare.jsx";
import Contact from "./pages/Contact.jsx";
import Careers from "./pages/Careers.jsx";
import Support from "./pages/Support.jsx";
 // ✅ New import

export default function App() {
    return (
        <>
            <Navbar />

            <Switch>
                <Route path="/">
                    <HomePage />
                </Route>

                <Route path="/about">
                    <About />
                </Route>

                <Route path="/child-care">
                    <ChildCare />
                </Route>

                <Route path="/medical-services">
                    <MedicalServices />
                </Route>

                <Route path="/home-care">
                    <HomeCare />
                </Route>

                <Route path="/booking">
                    <Booking />
                </Route>

                <Route path="/dashboard">
                    <Dashboard />
                </Route>

                <Route path="/booking-confirmation">
                    <BookingConfirmationPage />
                </Route>

                <Route path="/login">
                    <Login/>
                </Route>

                <Route path="/register">
                    <Register/>
                </Route>

                <Route path="/elderly-care">
                    <ElderlyCare/>
                </Route>

                <Route path="/contact">
                    <Contact/>
                </Route>

                <Route path="/careers">
                    <Careers/>
                </Route>

                <Route path="/support">
                    <Support/>
                </Route>

                {/* Optional: future dynamic route */}
                {/* <Route path="/home-care/:id">
                    <HomeCareDetail />
                </Route> */}


            </Switch>
        </>
    );
}
