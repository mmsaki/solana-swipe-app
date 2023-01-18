import React from 'react'
import "./InitializeAccount.css"
import { Buffer } from "buffer";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { Program, AnchorProvider, web3 } from "@project-serum/anchor";
import kp from "../keypair.json";
window.Buffer = Buffer;

const { SystemProgram, Keypair } = web3; // system program is used to create accounts, solana runtime
const arr = Object.values(kp._keypair.secretKey);
const secret = new Uint8Array(arr);
const baseAccount = Keypair.fromSecretKey(secret);
const programID = new PublicKey("2JAFDEu7wf4BivMXw7f4dgqZMrAmNqVGjRi57jij5LUZ"); // run solana address -k target/deploy/myepicproject-keypair.json
const network = clusterApiUrl('devnet');
const opts = {
  preflightCommitment: "processed",
};

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

function IntializeAccount() {
  const createSwipeAccount = async () => {
    try {
      const provider = await getProvider();
      const program = await getProgram();

      console.log("Creating account...");
      await program.rpc.initialize({
        accounts: {
          baseAccount: baseAccount.publicKey,
          user: provider.wallet.publicKey,
          systemProgram: SystemProgram.programId,
        },
        signers: [baseAccount],
      });
      console.log(
        "Created a new BaseAccount w/ address: ",
        baseAccount.publicKey.toBase58()
      );
    } catch (err) {
      console.log("Error in creating BaseAccount account: ", err);
    }
  };
  return (
    <div className="connected-container">
      <button
        className="cta-button submit-gif-button"
        onClick={createSwipeAccount}
      >
        Initialize Account
      </button>
    </div>
  );
}

export default IntializeAccount