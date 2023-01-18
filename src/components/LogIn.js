import React from 'react'
import { useEffect, useState } from "react";
import { Buffer } from "buffer";
import './LogIn.css'


window.Buffer = Buffer;


function LogIn() {
  const checkIfWalletIsConnected = async () => {
    if (window?.solana?.isPhantom) {
      console.log("Phantom wallet found! ✨");
      const response = await window.solana.connect({ onlyIfTrusted: true });
      console.log("Connected with Public Key: ", response.publicKey.toBase58());
    } else {
      alert("Please install Phantom wallet to use this app! 👻");
    }
  };

  const connectWallet = async () => {
    const { solana } = window;
    if (solana) {
      const response = await solana.connect();
      console.log(
        "Connceted with Public Key: ",
        response.publicKey.toBase58()
      );
    }
  };


  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  return (
    <div className="login-contents">
      <img className="logo" src="/swipe.svg" alt="swipe app logo" />
      <h1>swipe</h1>
      <div>
        <div className="sub-text">
          Meet people in Web3 that has something in common with you! ✨
        </div>
        <button
          className="cta-button connect-wallet-button"
          onClick={connectWallet}
        >
          Connect Wallet
        </button>
      </div>
    </div>
  );
}

export default LogIn