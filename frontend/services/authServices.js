import axiosInstance from "./axiosInstance";

const AuthServices = {
    login: ({ username, password }) => {
        return axiosInstance.post("/auth/login", { username, password });
    },
    fetchUserInfo: () => {
        return axiosInstance.get("/auth");
    },
};

export default AuthServices;
