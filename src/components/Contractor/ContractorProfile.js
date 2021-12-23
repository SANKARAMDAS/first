import React, { useState } from "react";
import axios from "axios";
import ContractorLayout from "./ContractorLayout/ContractorLayout";
import "./css/ContractorProfile.css";

const ContractorProfile = () => {

  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");
  const [taxId, setTaxId] = useState("");
  const [bitcoin, setBitcoin] = useState("");
  const [ethereum, setEthereum] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_BACKEND_API}/auth/updateProfile`, {
        email,
        address,
        city,
        state,
        zipCode,
        country,
        taxId,
        bitcoin,
        ethereum
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return(
    <ContractorLayout>
      <h3>Update Profile</h3>
      <form onSubmit={handleSubmit}>
        <input
          id="email"
          name="email"
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
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
        <input
          id="bitcoin"
          name="bitcoin"
          type="text"
          value={bitcoin}
          placeholder="Bitcoin Wallet Address"
          onChange={(e) => setBitcoin(e.target.value)}
        />
        <input
          id="ethereum"
          name="ethereum"
          type="text"
          value={ethereum}
          placeholder="Ethereum Wallet Address"
          onChange={(e) => setEthereum(e.target.value)}
        />
        <button
          type="submit"
        >
          Update Profile
        </button>
      </form>
    </ContractorLayout>
  )
}

export default ContractorProfile;