import React, { useState } from "react";
import axios from "axios";
import './css/SubscriptionForm.css';

const SubscriptionForm = () => {

    const [email, setEmail] = useState("")

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios
            .post(`${process.env.REACT_APP_BACKEND_API}/subscription/add-member`, { email })
            .then((res) => {
                if (res.data.msg === "SUCCESS") {
                    setEmail("")
                    alert("Your subscription was successful")
                } else {
                    if (res.data.err) {
                        if (res.data.err.title === "Member Exists") {
                            alert("You have already subscribed. Please use a different email address.")
                        }
                    } else {
                        alert("Subscription failed due to server error. Please check your network connection and try again.")
                    }
                }
            })
    }

    return (
        <div className="page">
            <div className="coming-soon">
                <div className="content">
                    <h1 className="content__title">
                        Polaris<br />Coming Soon
                    </h1>
                    <p className="content__para">
                        Leave your email with us and we'll drop<br />you an email when its ready.
                    </p>
                    <form onSubmit={handleSubmit}>
                        <input value={email} onChange={handleEmailChange} id="email" name="email" type="email" placeholder="Enter your Email Address" />
                        <input type="submit" value="Subscribe" />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SubscriptionForm;