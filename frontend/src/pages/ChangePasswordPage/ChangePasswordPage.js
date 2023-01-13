import React, { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import authContext from "../../contexts/AuthContext/authContexts";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import AuthServices from "../../services/authServices";

import { toast } from "react-toastify";

const ChangePasswordPage = () => {
    const { state } = useContext(authContext);
    const { user } = state;

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();

    const newPassword = useRef({});
    newPassword.current = watch("newPassword", "");

    useEffect(() => {
        if (!user) {
            navigate("/signin");
        }
    });

    const onSubmit = async (data) => {
        try {
            const reqData = {
                username: user.username,
                oldPassword: data.oldPassword,
                newPassword: data.newPassword,
            };
            const resp = await AuthServices.changePassword(reqData);
            console.log(resp);
        } catch (error) {
            if (error.response.status === 401) {
                toast("Mật khẩu cũ không chính xác!");
            }
            console.log("error", error);
        }
    };
    return (
        <SFormContainer>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label htmlFor="oldPassword" className="form-label">
                        Mật khẩu cũ
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="oldPassword"
                        {...register("oldPassword", {
                            required: "Đây là trường bắt buộc",
                            pattern: {
                                value: /^\S*$/,
                                message: "Không nhập khoảng trắng",
                            },
                        })}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="newPassword" className="form-label">
                        Mật khẩu mới
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="newPassword"
                        {...register("newPassword", {
                            required: "Đây là trường bắt buộc",
                            pattern: {
                                value: /^\S*$/,
                                message: "Không nhập khoảng trắng",
                            },
                        })}
                    />
                    <ErrorMessage
                        errors={errors}
                        name="newPassword"
                        render={({ message }) => (
                            <p className="text-danger">{message}</p>
                        )}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="passwordConfirmed" className="form-label">
                        Xác nhận mật khẩu
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="passwordConfirmed"
                        {...register("passwordConfirmed", {
                            required: "Đây là trường bắt buộc",
                            validate: (val) => {
                                if (watch("newPassword") !== val) {
                                    return "Mật khẩu không trùng khớp!";
                                }
                            },
                        })}
                    />
                    <ErrorMessage
                        errors={errors}
                        name="passwordConfirmed"
                        render={({ message }) => (
                            <p className="text-danger">{message}</p>
                        )}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
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

export default ChangePasswordPage;
