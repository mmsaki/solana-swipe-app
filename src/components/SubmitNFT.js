import React from 'react'
import { useState } from "react";
import "./SubmitNFT.css"
import { Connection } from "@solana/web3.js";
import { Program, AnchorProvider } from "@project-serum/anchor";
import kp from "../keypair.json";
import { clusterApiUrl } from "@solana/web3.js";
import { PublicKey } from "@solana/web3.js";
import { web3 } from "@project-serum/anchor";

const opts = {
  preflightCommitment: "processed",
};

const arr = Object.values(kp._keypair.secretKey);
const secret = new Uint8Array(arr);
const baseAccount = web3.Keypair.fromSecretKey(secret);
const programID = new PublicKey("2JAFDEu7wf4BivMXw7f4dgqZMrAmNqVGjRi57jij5LUZ"); // run solana address -k target/deploy/myepicproject-keypair.json
const network = clusterApiUrl("devnet");

const getProvider = () => {
  const connection = new Connection(network, opts.preflightCommitment);
  const provider = new AnchorProvider(
    connection,
    window.solana,
    opts.preflightCommitment
  );
  return provider;
};

const getProgram = async () => {
  const idl = await Program.fetchIdl(programID, getProvider());
  return new Program(idl, programID, getProvider());
};

function SubmitNFT() {
  const [inputValue, setInputValue] = useState("");
  
  const onInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
  };
  const sendNFT = async () => {
    if (inputValue.length === 0) {
      console.log("No gif link given!");
      return;
    }
    setInputValue("");
    console.log("Sending gif to the blockchain...", inputValue);
    try {
      const provider = await getProvider();
      const program = await getProgram();

      await program.rpc.addGif(inputValue, {
        accounts: {
          baseAccount: baseAccount.publicKey,
          user: provider.wallet.publicKey,
        },
      });
      console.log("Gif sent to the program", inputValue);
    } catch (error) {
      console.log("Please enter a link!");
    }
  };
  return (
    <div>SubmitNFT</div>
  )
}

export default SubmitNFT