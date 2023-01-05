import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./layout/layout/Layout";
import LandingPage from "./pages/LandingPage/LandingPage";
import SigninPage from "./pages/SigninPage/SigninPage";
import HomePage from "./pages/HomePage/HomePage";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

function App() {
    const [user, setUser] = useState(null);
    console.log(user);
    return (
        <div className="App">
            <BrowserRouter>
                <Layout>
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route
                            path="/signin"
                            element={
                                <SigninPage user={user} setUser={setUser} />
                            }
                        />
                        <Route
                            path="/home"
                            element={
                                // <PrivateRoute user={user}>
                                <HomePage />
                                // </PrivateRoute>
                            }
                        />
                    </Routes>
                </Layout>
            </BrowserRouter>
        </div>
    );
}

export default App;
