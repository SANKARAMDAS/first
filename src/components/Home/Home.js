import React from "react";
import Header from "../Header";
import Metamask from '../Metamask/Metamask';

const Home = () => {
  return (
    <div className="page">
      <Header />
      <h1>Homepage</h1>
      <Metamask />
    </div>
  );
}
 
export default Home;