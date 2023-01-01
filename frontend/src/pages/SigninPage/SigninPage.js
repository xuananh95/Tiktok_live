import React from "react";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SigninPage = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post(
                "http://localhost:5001/auth/login",
                data
            );
            if (response.status === 200) {
                localStorage.setItem("token", data.token);
                navigate("/home");
            }
        } catch (error) {
            if (error.response.status === 401) {
                toast(error.response.data.message);
            }
        }
    };
    return (
        <SFormContainer>
            <h2 id="form-title">Đăng nhập</h2>
            <form
                className="d-flex flex-column justify-content-center align-items-center"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="mb-4">
                    <label htmlFor="username" className="form-label">
                        Tên đăng nhập
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        {...register("username", { required: true })}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="form-label">
                        Mật khẩu
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        {...register("password", { required: true })}
                    />
                </div>
                <button type="submit" className="btn btn-primary text-center">
                    Đăng nhập
                </button>
            </form>
            <ToastContainer />
        </SFormContainer>
    );
};

const SFormContainer = styled.div`
    max-width: 500px;
    min-width: 300px;
    max-height: 700px;
    width: 30%;
    height: 60%;
    margin: 100px auto;
    background-color: #ffffff;
    border-radius: 25px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    padding: 25px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    #form-title {
        text-align: "center";
        margin-bottom: 45px;
    }
`;

export default SigninPage;
