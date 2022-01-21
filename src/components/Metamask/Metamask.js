import React, { useState } from "react";

const Metamask = () => {

  const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null);

  const connectWalletHandler = () => {
    window.ethereum.on('accountsChanged', accountChangedHandler);
    window.ethereum.on('chainChanged', chainChangedHandler);
    if(window.ethereum) {
      window.ethereum.request({method: 'eth_requestAccounts'})
      .then(result => {
        accountChangedHandler(result[0]);
      })
    } else {
      setErrorMessage("Install Metamask");
    }
  }

  const accountChangedHandler = (newAccount) => {
    setDefaultAccount(newAccount);
  }

  const chainChangedHandler = () => {
    window.location.reload()
  }

  return(
    <div>
      { window.ethereum &&
        <>
          <button onClick={connectWalletHandler}>Connect Metamask wallet</button>
          <div>
            <h3>Address: {defaultAccount}</h3>
          </div>
          {errorMessage}
        </>
      }
    </div>
  )
}

export default Metamask;