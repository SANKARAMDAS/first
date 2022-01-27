import React, { useState } from "react";
import { sha256 } from "js-sha256";
import axios from "axios";
import "./Settings.css";

const Settings = (props) => {

    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === passwordConfirm) {

            const hashedPassword = sha256(password);

            axios
                .post(`${process.env.REACT_APP_BACKEND_API}/auth/passwordReset`, {
                    email: props.email,
                    password: hashedPassword
                })
                .then((res) => {
                    console.log(res.data);
                    alert(res.data.msg);
                })
                .catch((err) => {
                    console.log(err);
                })
        } else {
            console.log('Password do not match');
        }
    }

    return (
        <>
            <h3>Profile Settings</h3>
            <form onSubmit={handleSubmit}>
                <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    placeholder="New Password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    id="passwordConfirm"
                    name="passwordConfirm"
                    type="password"
                    value={passwordConfirm}
                    placeholder="Confirm New Password"
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                />
                <button type="submit">
                    Reset Password
                </button>
            </form>
        </>
    )
}

export default Settings;