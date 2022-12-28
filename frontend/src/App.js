import React from "react";
import LandingPage from "./pages/LandingPage/LandingPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/layout/Layout";
import SigninPage from "./pages/SigninPage/SigninPage";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Layout>
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/signin" element={<SigninPage />} />
                    </Routes>
                </Layout>
            </BrowserRouter>
        </div>
    );
}

export default App;
