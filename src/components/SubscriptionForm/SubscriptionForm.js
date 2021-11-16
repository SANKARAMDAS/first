import React, { useState } from "react";
import axios from "axios";
import './css/SubscriptionForm.css';

const SubscriptionForm = () => {

    const [email, setEmail] = useState("")
    const [openPrompt, setOpenPrompt] = useState("PENDING")

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
                    // alert("Your subscription was successful")
                    setOpenPrompt("SUCCESS")
                } else {
                    if (res.data.err) {
                        if (res.data.err.title === "Member Exists") {
                            setEmail("")
                            // alert("You have already subscribed. Please use a different email address.")
                            setOpenPrompt("FAIL")
                        }
                    } else {
                        alert("Subscription failed due to server error. Please check your network connection and try again.")
                    }
                }
            })
    }

    const handleBackToForm = (e) => {
        e.preventDefault()
        setOpenPrompt("PENDING")
    }

    const renderForm = () => {
        let para, content;
        switch (openPrompt) {
            case "SUCCESS": {
                para = <><span style={{ fontSize: "1.2rem", color: "green" }}><strong>SUBSCRIPTION SUCCESSFUL!</strong></span><br /><br />Thank you for subscribing with Polaris. <br /></>
                break;
            }
            case "FAIL": {
                para = <><span style={{ fontSize: "1.2rem", color: "red" }}><strong>PLEASE USE A DIFFERENT EMAIL</strong></span><br /><br />This email already exists in our database. < br /> Please try another email adress.</>
                break;
            }
            default: {
                para = <>Leave your email with us and we'll drop<br />you an email when its ready.</>
                content = <>
                    <form onSubmit={handleSubmit}>
                        <input value={email} onChange={handleEmailChange} id="email" name="email" type="email" placeholder="Enter your Email Address" />
                        <input type="submit" value="Subscribe" />
                    </form>
                </>
            }
        }

        return (
            <>
                <p className="content__para ">
                    {para}
                </p>
                {openPrompt === "PENDING"
                    ? content
                    : <button onClick={handleBackToForm} type="submit">Go Back</button>}
            </>
        )
    }

    return (
        <div className="page">
            <div className="coming-soon">
                <div className="content">
                    <h1 className="content__title">
                        Polaris<br />Coming Soon
                    </h1>
                    {renderForm()}
                </div>
            </div>
        </div>
    );
}

export default SubscriptionForm;