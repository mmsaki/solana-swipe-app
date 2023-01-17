import './App.css';
import React, {useEffect, useState} from 'react';
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { Program, AnchorProvider, web3 } from '@project-serum/anchor';
import { Buffer } from 'buffer';
import kp from './keypair.json';
import { Metadata } from '@metaplex-foundation/mpl-token-metadata';

window.Buffer = Buffer;

const { SystemProgram, Keypair } = web3; // system program is used to create accounts, solana runtime
const arr = Object.values(kp._keypair.secretKey);
const secret = new Uint8Array(arr);
const baseAccount = Keypair.fromSecretKey(secret);
const programID = new PublicKey("2JAFDEu7wf4BivMXw7f4dgqZMrAmNqVGjRi57jij5LUZ"); // run solana address -k target/deploy/myepicproject-keypair.json
const network = clusterApiUrl('devnet');

// precessed vs finalized (wait for transaction to be finalized)
const opts = {
  preflightCommitment: 'processed',
};

// Constants
const TEST_GIFS = [
  "https://i.giphy.com/media/eIG0HfouRQJQr1wBzz/giphy.webp",
  "https://media3.giphy.com/media/L71a8LW2UrKwPaWNYM/giphy.gif?cid=ecf05e47rr9qizx2msjucl1xyvuu47d7kf25tqt2lvo024uo&rid=giphy.gif&ct=g",
  "https://media4.giphy.com/media/AeFmQjHMtEySooOc8K/giphy.gif?cid=ecf05e47qdzhdma2y3ugn32lkgi972z9mpfzocjj6z1ro4ec&rid=giphy.gif&ct=g",
  "https://i.giphy.com/media/PAqjdPkJLDsmBRSYUp/giphy.webp",
];


const getProvider = () => {
  const connection = new Connection(network, opts.preflightCommitment);
  const provider = new AnchorProvider(connection, window.solana, opts.preflightCommitment);
  return provider;
};

  const getProgram = async () => {
    const idl = await Program.fetchIdl(programID, getProvider());
    return new Program(idl, programID, getProvider());
  };


const App = () => {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [gifList, setGifList] = useState([]);

  const checkIfWalletIsConnected = async () => {
  if (window?.solana?.isPhantom) {
    console.log("Phantom wallet found! ✨");
    const response = await window.solana.connect({ onlyIfTrusted: true });
    console.log("Connected with Public Key: ", response.publicKey.toBase58());
    setCurrentAccount(response.publicKey.toBase58());
  } else {
    alert("Please install Phantom wallet to use this app! 👻");
    }
  };

  const connectWallet = async () => { 
    const { solana } = window;
    if (solana) {
      const response = await solana.connect();
      console.log('Conncerted with Public Key: ', response.publicKey.toBase58());
      setCurrentAccount(response.publicKey.toBase58());
    }
  };

  const onInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
  };

  const sendGif = async () => {
    if (inputValue.length === 0) {
      console.log("No gif link given!");
      return;
    }
    setInputValue("");
    console.log("Sending gif to the blockchain...", inputValue);
    try {
      const provider = await getProvider();
      const program = await getProgram();

      await program.rpc.addGif(inputValue,
        {
          accounts: {
            baseAccount: baseAccount.publicKey,
            user: provider.wallet.publicKey,
        },
      });
      console.log("Gif sent to the program", inputValue);
      await getGifList();
    } catch (error) {
      console.log("Please enter a gif link!");
    }
  };

  const renderNotConnectedContainer = () => (
    <><div>
      <img src="swipe.svg" alt="swipe app logo" />
      <p className="sub-text">
        Meet people in Web3 that has something in common with you! ✨
      </p>
    </div><button className="cta-button connect-wallet-button" onClick={connectWallet}>Connect Wallet</button></>
  );

  const getNFTs = async () => {
    const connection = new Connection('devnet');
    const provider = await getProvider();
    const ownerPublickey = provider.wallet.publicKey;
    const nftsmetadata = await Metadata.findDataByOwner(connection, ownerPublickey);

    console.log(nftsmetadata)

    let counter = nftsmetadata.length;
    console.log("counter: " + counter);

    let counterI = 0;
    for (var i in nftsmetadata) {
      console.log(nftsmetadata[i].mint);
      counterI += 1;
    }
  };

  const renderConnectedContainer = () => {
    // if we hit this it means the program hasn't been been initialized yet
    if (!gifList) {
      return (
        <div className="connected-container">
          <button className="cta-button submit-gif-button" onClick={createGifAccount}>
            Initialize Account
          </button>
        </div>
      );
    }
    // if we hit this, we're good, it means the program has been initialized, user can submit gifs
    return (
      <div className="connected-container">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            sendGif();
          }}
        >
          <input
            type="text"
            placeholder="Enter GIF URL"
            value={inputValue}
            onChange={onInputChange}
          />
          <button type="submit" className="cta-button submit-gif-button">
            Submit
          </button>
        </form>

        <div className="gif-grid">
          {/* map through gifList instead of TEST_GIFS.map((gif) => */}
          {gifList.map((item, index) => (
            <div className="gif-item" key={index}>
              {/* We use index as the key instead, also, the src is now item.gifLink */}
              <img src={item.gifLink} alt="gif" />
              <div className="gif-info">{item.userAddress.toString()}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const getGifList = async () => {
    try {
      const program = await getProgram();
      const account = await program.account.baseAccount.fetch(baseAccount.publicKey);

      console.log("Got the account: ", account)
      setGifList(account.gifList);
      
    } catch (err) {
      console.log("Error in getGifList: ", err);
      setGifList(null);
    }
  };

  const createGifAccount = async () => {
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
      console.log("Created a new BaseAccount w/ address: ", baseAccount.publicKey.toBase58());
      await getGifList();
    } catch (err) {
      console.log("Error in creating BaseAccount account: ", err);
    }
  };

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  useEffect(() => {
    if (currentAccount) {
      console.log("Current account: ", currentAccount);
      console.log('Fetching GIFs list...');
      // call solana program to get the list of gifs
      getGifList();
      // set state
      // setGifList(TEST_GIFS);
    }
  }, []);

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);


  return (
    <div className="App">
      <div className={currentAccount ? "authed-container" : "container"}>
        <div className="header-container">
          {!currentAccount && renderNotConnectedContainer()}
          {currentAccount && renderConnectedContainer()}
        </div>
      </div>
    </div>
  );
};

export default App;
