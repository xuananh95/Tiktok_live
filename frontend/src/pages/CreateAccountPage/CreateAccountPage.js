import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

import authContext from "../../contexts/AuthContext/authContexts";
import AuthServices from "../../services/authServices";
import { toast } from "react-toastify";

const CreateAccountPage = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const { state } = useContext(authContext);
    const { user } = state;

    useEffect(() => {
        if (!user.isAdmin) {
            navigate("/home");
        }
    }, []);

    const onSubmit = async (data) => {
        try {
            const resp = await AuthServices.createAccount(data);
            if (resp.status === 200) {
                toast("Tạo user mới thành công!");
                reset();
            }
        } catch (error) {
            if (error.response.status === 401) {
                toast("Tên người dùng đã tồn tại");
            }
        }
    };
    return (
        <SFormContainer>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="d-flex flex-column justify-content-center"
            >
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                        Tên tài khoản
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        {...register("username", {
                            required: "Đây là trường bắt buộc",
                            pattern: {
                                value: /^\S*$/,
                                message: "Không nhập khoảng trắng",
                            },
                        })}
                    />
                    <ErrorMessage
                        errors={errors}
                        name="username"
                        render={({ message }) => (
                            <p className="text-danger">{message}</p>
                        )}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Tạo tài khoản
                </button>
            </form>
        </SFormContainer>
    );
};

const SFormContainer = styled.div`
    max-width: 700px;
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
`;

export default CreateAccountPage;
