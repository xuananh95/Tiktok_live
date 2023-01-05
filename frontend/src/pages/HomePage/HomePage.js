import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HomePage = ({ user }) => {
    const navigate = useNavigate();
    useEffect(() => {
        const user = localStorage.getItem("user");
        console.log(user);
        if (!user) {
            navigate("/signin", { replace: true });
        }
    }, []);
    return <div>HomePage</div>;
};

export default HomePage;
