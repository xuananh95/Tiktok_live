import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authContext from "../../contexts/AuthContext/authContexts";
import { LOGOUT } from "../../contexts/types";
import { Link } from "react-router-dom";

const Header = () => {
    const { state, dispatch } = useContext(authContext);
    const navigate = useNavigate();
    const { isAuthenticated, user } = state;
    const handleLogin = () => {
        navigate("/signin", { replace: true });
    };
    const handleLogout = () => {
        localStorage.removeItem("user");
        const action = {
            type: LOGOUT,
        };
        dispatch(action);
        navigate("/", { replace: true });
    };
    // useEffect(() => {
    //     if (!state.user) {
    //         fetchUserInformation();
    //     }
    // }, []);
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary ">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        Tiktok Live
                    </Link>
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
                                <Link
                                    className="nav-link active"
                                    aria-current="page"
                                    to="/home"
                                >
                                    Dashboard
                                </Link>
                            </li>
                            {user && (
                                <li className="nav-item">
                                    <Link
                                        className="nav-link active"
                                        aria-current="page"
                                        to="/change-password"
                                    >
                                        Đổi mật khẩu
                                    </Link>
                                </li>
                            )}
                            {user?.isAdmin && (
                                <li className="nav-item">
                                    <Link
                                        className="nav-link active"
                                        aria-current="page"
                                        to="/create-account"
                                    >
                                        Tạo tài khoản
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>

                    <div className="me-2">
                        {!isAuthenticated ? (
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={handleLogin}
                            >
                                Đăng nhập
                            </button>
                        ) : (
                            <button
                                type="button"
                                className="btn btn-danger"
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
