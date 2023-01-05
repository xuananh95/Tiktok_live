import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(null);
    useEffect(() => {
        if (
            localStorage.getItem("user") &&
            localStorage.getItem("user") !== ""
        ) {
            setCurrentUser(localStorage.getItem("user"));
        }
    }, []);
    const handleLogin = () => {
        navigate("/signin", { replace: true });
    };
    const handleLogout = () => {};
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary ">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">
                        Tiktok Live
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a
                                    className="nav-link active"
                                    aria-current="page"
                                    href="/home"
                                >
                                    Dashboard
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="me-2">
                        {!currentUser ? (
                            <button
                                type="button"
                                class="btn btn-primary"
                                onClick={handleLogin}
                            >
                                Đăng nhập
                            </button>
                        ) : (
                            <button
                                type="button"
                                class="btn btn-danger"
                                onClick={handleLogout}
                            >
                                Đăng xuất
                            </button>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Header;
