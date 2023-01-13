import { useEffect, useReducer } from "react";
import AuthServices from "../../services/authServices";
import axiosInstance from "../../services/axiosInstance";
import authReducer from "./authReducer";
import authContext from "./authContexts";
import { USER_UPDATED } from "../types";
import { useNavigate } from "react-router-dom";
const initialState = {
    token: null,
    isAuthenticated: !!localStorage.getItem("user"),
    user: null,
};

const AuthState = (props) => {
    const [state, dispatch] = useReducer(authReducer, initialState);
    const navigate = useNavigate();
    const fetchUserInformation = async () => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            axiosInstance.defaults.headers.Authorization = `Bearer ${user.token}`;
            try {
                const res = await AuthServices.fetchUserInfo();
                dispatch({
                    type: USER_UPDATED,
                    payload: res.data,
                });
            } catch (error) {
                console.log(error);
                if (error.response.status === 401) {
                    navigate("/signin");
                }
                delete axiosInstance.defaults.headers.Authorization;
            }
        } else {
            delete axiosInstance.defaults.headers.Authorization;
        }
    };

    useEffect(() => {
        if (!state.user) {
            fetchUserInformation();
        }
    }, []);

    return (
        <authContext.Provider value={{ state, dispatch }}>
            {props.children}
        </authContext.Provider>
    );
};

export default AuthState;
