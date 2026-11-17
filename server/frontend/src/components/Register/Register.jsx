import React, { useState } from "react";
import "./Register.css";
import user_icon from "../assets/person.png";
import email_icon from "../assets/email.png";
import password_icon from "../assets/password.png";
import close_icon from "../assets/close.png";

const Register = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const register = async (e) => {
        e.preventDefault();

        const register_url = window.location.origin + "/djangoapp/register";

        try {
            const res = await fetch(register_url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userName,
                    password,
                    email,
                    firstName,
                    lastName
                })
            });

            const json = await res.json();

            if (res.ok && json.status === "Authenticated") {
                sessionStorage.setItem("username", json.userName);
                window.location.href = "/";
            } else if (json.error === "Already Registered") {
                alert("The username is already registered.");
                window.location.href = "/";
            } else {
                alert("Registration failed.");
            }
        } catch (error) {
            console.error("Registration error:", error);
            alert("Registration failed.");
        }
    };

    return (
        <div className="container">
            <div className="header">
                <a href="/">
                    <img src={close_icon} alt="Close" />
                </a>
                <div className="text">Register</div>
                <div className="underline"></div>
            </div>

            <form onSubmit={register}>
                <div className="inputs">

                    <div className="input">
                        <img src={user_icon} alt="" />
                        <input type="text" placeholder="Username"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            required />
                    </div>

                    <div className="input">
                        <img src={user_icon} alt="" />
                        <input type="text" placeholder="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required />
                    </div>

                    <div className="input">
                        <img src={user_icon} alt="" />
                        <input type="text" placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required />
                    </div>

                    <div className="input">
                        <img src={email_icon} alt="" />
                        <input type="email" placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required />
                    </div>

                    <div className="input">
                        <img src={password_icon} alt="" />
                        <input type="password" placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required />
                    </div>

                </div>

                <div className="submit-container">
                    <button type="submit" className="submit">
                        Register
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Register;