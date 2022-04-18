import React, { useState } from "react";
import "./css/CreateInvoiceSlider.css";

const CreateInvoiceSlider = (props) => {

  const [drawerClasses, setDrawerClasses] = useState("side-drawer")

  if(props.show) {
    setDrawerClasses("side-drawer open")
  }
  return(
    <div className={drawerClasses}>
      Hello
    </div>
  )
}

export default CreateInvoiceSlider;