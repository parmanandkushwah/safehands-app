// pages/HomePage.jsx
import Home from "../components/Home";
import Service from "../components/Service";
import TopProviders from "../components/TopProviders";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer.jsx";

export default function HomePage() {
    return (
        <>
            <Home />
            <Service />
            <TopProviders />
            <Testimonials />
            <Footer/>
        </>
    );
}
