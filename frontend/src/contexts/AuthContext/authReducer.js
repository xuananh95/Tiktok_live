import { LOGIN, LOGOUT, USER_UPDATED } from "../types";

const authReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case LOGIN: {
            localStorage.setItem("user", JSON.stringify(payload.data));
            return {
                ...state,
                isAuthenticated: true,
                token: payload.data.token,
                user: { ...payload.data },
            };
        }
        case LOGOUT: {
            localStorage.removeItem("user");
            return {
                ...state,
                isAuthenticated: false,
                token: null,
                user: null,
            };
        }
        case USER_UPDATED: {
            return {
                ...state,
                isAuthenticated: true,
                token: payload.data.token,
                user: { ...payload.data },
            };
        }
        default:
            return state;
    }
};

export default authReducer;
