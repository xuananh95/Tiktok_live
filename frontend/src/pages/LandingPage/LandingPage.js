import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
    const navigate = useNavigate();
    const signIn = () => {
        navigate("/signin");
    };
    return (
        <div className="d-flex flex-column justify-content-center align-items-center p-2">
            <p>LandingPage</p>
            <div className="btn-container d-flex flex-row justify-content-center align-items-center">
                <button
                    type="button"
                    className="btn btn-primary me-2"
                    onClick={signIn}
                >
                    Đăng nhập
                </button>
            </div>
        </div>
    );
};

export default LandingPage;
