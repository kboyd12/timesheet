import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import "../styles/Login.css"; // Link the custom styles
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axios.post("http://localhost:8000/api/login", {
                email,
                password,
            });
            login(response.data); // Pass token and user info
            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <div className="login-left">
                    <h2>Sign In</h2>
                    {error && <p className="error">{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Username"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <div className="remember-me">
                            <input type="checkbox" id="remember" />
                            <label htmlFor="remember">Remember Me</label>
                            <a href="#forgot">Forgot Password</a>
                        </div>
                        <button type="submit" className="btn-login">Sign In</button>
                    </form>
                </div>
                <div className="login-right">
                    <h2>Welcome to login</h2>
                    <p>Don't have an account?</p>
                    <button className="btn-signup">Sign Up</button>
                </div>
            </div>
        </div>
    );
};

export default Login;

