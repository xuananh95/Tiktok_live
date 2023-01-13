import axiosInstance from "./axiosInstance";

const AuthServices = {
    login: ({ username, password }) => {
        return axiosInstance.post("/auth/login", { username, password });
    },
    fetchUserInfo: () => {
        return axiosInstance.get("/auth");
    },
    createAccount: ({ username }) => {
        return axiosInstance.post("/auth/create-account", { username });
    },
    changePassword: ({ username, oldPassword, newPassword }) => {
        return axiosInstance.post("/auth/change-password", {
            username,
            oldPassword,
            newPassword,
        });
    },
};

export default AuthServices;
