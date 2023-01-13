import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./layout/layout/Layout";
import LandingPage from "./pages/LandingPage/LandingPage";
import SigninPage from "./pages/SigninPage/SigninPage";
import HomePage from "./pages/HomePage/HomePage";
// import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import AuthState from "./contexts/AuthContext/authState";
import CreateAccountPage from "./pages/CreateAccountPage/CreateAccountPage";
import ChangePasswordPage from "./pages/ChangePasswordPage/ChangePasswordPage";

// toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <AuthState>
                    <Layout>
                        <Routes>
                            <Route path="/" element={<LandingPage />} />
                            <Route path="/signin" element={<SigninPage />} />
                            <Route
                                path="/home"
                                element={
                                    // <PrivateRoute user={user}>
                                    <HomePage />
                                    // </PrivateRoute>
                                }
                            />
                            <Route
                                path="/create-account"
                                element={<CreateAccountPage />}
                            />
                            <Route
                                path="/change-password"
                                element={<ChangePasswordPage />}
                            />
                        </Routes>

                        <ToastContainer />
                    </Layout>
                </AuthState>
            </BrowserRouter>
        </div>
    );
}

export default App;
