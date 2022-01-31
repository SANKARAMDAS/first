import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.css";

const Profile = (props) => {

    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [country, setCountry] = useState("");
    const [taxId, setTaxId] = useState("");

    useEffect(() => {
        const getProfile = async () => {
            console.log(props.email)
            axios
                .post(`${process.env.REACT_APP_BACKEND_API}/auth/getUserProfile`, {
                    email: props.email
                })
                .then((res) => {
                    console.log(res.data)
                    setAddress(res.data.data.address)
                    setCity(res.data.data.city)
                    setState(res.data.data.state)
                    setZipCode(res.data.data.zipCode)
                    setCountry(res.data.data.country)
                    setTaxId(res.data.data.taxId)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        getProfile()
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post(`${process.env.REACT_APP_BACKEND_API}/auth/updateProfile`, {
                email: props.email,
                address,
                city,
                state,
                zipCode,
                country,
                taxId
            })
            .then((res) => {
                console.log(res.data);
                alert(res.data.msg);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <>
            <h3>Update Profile</h3>
            <form onSubmit={handleSubmit}>
                <input
                    id="address"
                    name="address"
                    type="text"
                    value={address}
                    placeholder="Address"
                    onChange={(e) => setAddress(e.target.value)}
                />
                <input
                    id="city"
                    name="city"
                    type="text"
                    value={city}
                    placeholder="City"
                    onChange={(e) => setCity(e.target.value)}
                />
                <input
                    id="state"
                    name="state"
                    type="text"
                    value={state}
                    placeholder="State"
                    onChange={(e) => setState(e.target.value)}
                />
                <input
                    id="zipCode"
                    name="zipCode"
                    type="text"
                    value={zipCode}
                    placeholder="Zip Code"
                    onChange={(e) => setZipCode(e.target.value)}
                />
                <input
                    id="country"
                    name="country"
                    type="text"
                    value={country}
                    placeholder="Country"
                    onChange={(e) => setCountry(e.target.value)}
                />
                <input
                    id="taxId"
                    name="taxId"
                    type="text"
                    value={taxId}
                    placeholder="Tax ID"
                    onChange={(e) => setTaxId(e.target.value)}
                />
                <button
                    type="submit"
                >
                    Update Profile
                </button>
            </form>
        </>
    )
}

export default Profile;