import React from "react";

const LandingPage = () => {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center p-2">
            <p>LandingPage</p>
            <div className="btn-container d-flex flex-row justify-content-center align-items-center">
                <button type="button" className="btn btn-primary me-2">
                    Đăng nhập
                </button>
                <button type="button" className="btn btn-primary">
                    Đăng ký
                </button>
            </div>
        </div>
    );
};

export default LandingPage;
