import './index.css';
import { Route, Switch } from "wouter";
import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import About from "./pages/About";

export default function App() {
    return (
        <>
            <Navbar />

            <Switch>
                <Route path="/">
                    <>
                        <HomePage />
                    </>
                </Route>

                <Route path="/about">
                    <About />
                </Route>
            </Switch>
        </>
    );
}
