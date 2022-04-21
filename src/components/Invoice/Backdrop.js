import React from "react";
import "./css/Backdrop.css";

const Backdrop = (props) => {
  return(
    <div className="backdrop" onClick={props.close}></div>
  )
}

export default Backdrop;