import React from "react";
import styled from "styled-components";

const SigninPage = () => {
    return (
        <SFormContainer>
            <h2 id="form-title">Đăng nhập</h2>
            <form className="d-flex flex-column justify-content-center align-items-center">
                <div className="mb-4">
                    <label htmlFor="username" className="form-label">
                        Tên đăng nhập
                    </label>
                    <input type="text" className="form-control" id="username" />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="form-label">
                        Mật khẩu
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                    />
                </div>
                <button type="submit" className="btn btn-primary text-center">
                    Đăng nhập
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

export default SigninPage;
