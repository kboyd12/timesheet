import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("authToken");

    if (!token) {
        return <Navigate to="/login" />;
    }

    try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Current time in seconds
        if (decoded.exp < currentTime) {
            // Token is expired
            localStorage.removeItem("authToken");
            return <Navigate to="/login" />;
        }
    } catch (error) {
        // Token is invalid
        localStorage.removeItem("authToken");
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;

