import React, { useState } from "react";

const BusinessDashboard = () => {

  const [isLoading, setIsLoading] = useState(true);

  const renderTemplate = () => {
    if (isLoading) {
      return (
        <div>
          Loading...
        </div>
      )
    } else {
      return(
        <>
          Dashboard
        </>
      )
    }
  }

  return(
    <>
      {renderTemplate()}
    </>
  )
}

export default BusinessDashboard;