import React, { useState } from "react";
import axios from "axios";

const SubscriptionForm = () => {

    const [formValues, setFormValues] = useState({
        email: "",
        FNAME: "",
        LNAME: "",
        BIRTHDAY: "",
        PHONE: "",
        addr1: "",
        city: "",
        country: "",
        state: "",
        zip: ""
    })

    let handlerObj;

    const handleFormValuesChange = (selectedInput) => (e) => {
        handlerObj = { ...formValues }
        handlerObj[selectedInput] = e.target.value
        setFormValues({ ...handlerObj })
    }

    const handleSubmission = (e) => {
        e.preventDefault()
        //Form validation
        axios
            .post(`${process.env.REACT_APP_BACKEND_API}\subscription\add-member`, formValues)
            .then((res) => {
                if (res.data.msg === "SUCCESS") {
                    console.log("Member Added")
                } else {
                    console.log("Cannot Add member")
                }
            })
    }

    return (
        <div>
            Hello World
        </div>
    );
}

export default SubscriptionForm;