import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { history } from "_helpers";

const PrivateRoute = () => {
    const { user: authUser } = useSelector((x) => x.auth);
    if (!authUser) {
        return <Navigate to="/login" state={{ from: history.location }} />;
    }
    return <div>PrivateRoute</div>;
};

export default PrivateRoute;
