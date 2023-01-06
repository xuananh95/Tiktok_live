import { useEffect, useReducer } from "react";
import AuthServices from "../../services/authServices";
import axiosInstance from "../../services/axiosInstance";
import authReducer from "./authReducer";

const initialState = {
    accessToken: localStorage.getItem("token") || null,
    isAuthenticated: !!localStorage.getItem("token"),
    user: null,
};


const AuthState = (props) => {
    const [state, dispatch] = useReducer(authReducer, initialState);
    const fetchUserInformation = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;
            try {
                const res = await AuthServices.fetchUserInfo();
                dispatch({
                    type: USER_UPDATED,
                    payload: res.data
                })
            } catch (error){
                delete axiosInstance.defaults.headers.Authorization
            }
        }
        else {
            delete axiosInstance.defaults.headers.Authorization
        }
    }
    useEffect(() => {
        if (!state.user){
            fetchUserInformation();
        }
    }, [])
    return (
        <AuthState.Provider value={} >
            {props.children}
        </AuthState.Provider>
    )
}