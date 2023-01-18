import "./App.css";
import React, { useEffect, useState } from "react";
import LogIn from "./components/LogIn";
import Connected from "./components/Connected";


const App = () => {
  const [currentAccount, setCurrentAccount] = useState(null);

  const checkIfWalletIsConnected = async () => {
    if (window?.solana?.isPhantom) {
      console.log("Phantom wallet found! ✨");
      const response = await window.solana.connect({ onlyIfTrusted: true });
      console.log("Connected with Public Key: ", response.publicKey.toBase58());
      setCurrentAccount(response.publicKey.toString());
    } else {
      alert("Please install Phantom wallet to use this app! 👻");
    }
  };


  const renderNotConnectedContainer = () => (
    <>
      <LogIn />
    </>
  );

  const renderConnectedContainer = () => {
    return (
      <Connected />
    );  
  };

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  return (
    <div className="app">
      <div className={currentAccount ? "authed-container" : "container"}>
        <div>
          {!currentAccount && renderNotConnectedContainer()}
          {currentAccount && renderConnectedContainer()}
        </div>
      </div>
    </div>
  );
};

export default App;
