import React from 'react'
import { useEffect, useState } from "react";
import "./GetNFTs.css"
import { Connection } from "@solana/web3.js";
import { Program, AnchorProvider } from "@project-serum/anchor";
import kp from "../keypair.json";
import { clusterApiUrl } from "@solana/web3.js";
import { PublicKey } from "@solana/web3.js";
import { web3 } from "@project-serum/anchor";


const TEST_GIFS = [
  "https://i.giphy.com/media/eIG0HfouRQJQr1wBzz/giphy.webp",
  "https://media3.giphy.com/media/L71a8LW2UrKwPaWNYM/giphy.gif?cid=ecf05e47rr9qizx2msjucl1xyvuu47d7kf25tqt2lvo024uo&rid=giphy.gif&ct=g",
  "https://media4.giphy.com/media/AeFmQjHMtEySooOc8K/giphy.gif?cid=ecf05e47qdzhdma2y3ugn32lkgi972z9mpfzocjj6z1ro4ec&rid=giphy.gif&ct=g",
  "https://i.giphy.com/media/PAqjdPkJLDsmBRSYUp/giphy.webp",
];


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


function GetNFTs() {
  const [gifList, setGifList] = useState(null);
  const [currentAccount, setCurrentAccount] = useState(null);

    const getGifList = async () => {
      try {
        const program = await getProgram();
        const account = await program.account.baseAccount.fetch(
          baseAccount.publicKey
        );

        console.log("Got the account: ", account);
        setGifList(account.gifList);
      } catch (err) {
        console.log("Error in getGifList: ", err);
        setGifList(null);
      }
    };

    useEffect(() => {
      if (currentAccount) {
        console.log("Current account: ", currentAccount);
        console.log("Fetching GIFs list...");
        // call solana program to get the list of gifs
        // getGifList();
        // set state
        setGifList(TEST_GIFS);
      }
    }, []);

  return (
    <div>GetNFTs</div>
  )
}

export default GetNFTs