# Solana program references

<!--
- [Cool Meme](https://giphy.com/clips/hamlet-jJjb9AUHOiP3nJJMdy?utm_source=buildspace.so&utm_medium=buildspace_project)
- [Want react beginner docs?](https://reactjs.org/docs/getting-started.html?utm_source=buildspace.so&utm_medium=buildspace_project)
- [Have no experience in react?](https://scrimba.com/learn/learnreact)
- [Solana base code for my app?](https://github.com/buildspace/gif-portal-starter?utm_source=buildspace.so&utm_medium=buildspace_project)
- [Establishing Connection Phantom wallet?](https://docs.phantom.app/solana/integrating-phantom/extension-and-in-app-browser-web-apps/establishing-a-connection#eagerly-connecting?utm_source=buildspace.so&utm_medium=buildspace_project)
- [Anchor Discord](https://discord.com/invite/8HwmBtt2ss?utm_source=buildspace.so&utm_medium=buildspace_project)
- [Understanding Solana Accounts and state?](https://docs.solana.com/developing/programming-model/accounts?utm_source=buildspace.so&utm_medium=buildspace_project)
- [Solana Programs are upgradable?](https://docs.solana.com/cli/deploy-a-program#redeploy-a-program?utm_source=buildspace.so&utm_medium=buildspace_project)
-->

## Anchor commands

- install anchor cli

```bash 
cargo install --git <https://github.com/project-serum/anchor> anchor-cli --locked
```

- install Anchor's npm module and Solana Web3 JS

```bash 
yarn add @project-serum/anchor @solana/web3.js
```

- initialize anchor project

```bash 
anchor init myepicproject --javascript
cd myepicproject
```

- run anchor test NOTE: make sure solanatest validator is not running, or it will conflict

```bash 
anchor test
```

- set local host

```bash 
solana config set --url localhost
solana config get
```

- run test validator

```bash 
solana-test-validator
```

- Create new solana keypair

```bash
solana-keygen new
```

- Update Anchor.toml and lib.rs w/ new program id. Make sure Anchor.toml is on devnet.
- This will create a new build for us with a program id

```bash 
solana address -k target/deploy/solswipe-keypair.json
```

- Build after updating program id

```bash 
anchor build
```

- deploy to devnet

```bash 
anchor deploy
```

- How do we give idl to our web app? This is telling anchor to upload our idl for our program address, nice!!

```bash 
anchor idl init  -f target/idl/solswipe.json `solana address -k target/deploy/solswipe-keypair.json`
```

- Every time we redeploy we need to tell solana how the program api looks like

```bash 
anchor idl upgrade
```

- create new key pair || this resets base account 

```bash 
node src/createKeyPair.js  
```

## Rust

- [Module](https://stevedonovan.github.io/rust-gentle-intro/4-modules.html?utm_source=buildspace.so&utm_medium=buildspace_project)
- [Module Results](https://doc.rust-lang.org/std/result/?utm_source=buildspace.so&utm_medium=buildspace_project)
- [Macros](https://web.mit.edu/rust-lang_v1.25/arch/amd64_ubuntu1404/share/doc/rust/html/book/first-edition/macros.html?utm_source=buildspace.so&utm_medium=buildspace_project)
- [Vectors array type](https://doc.rust-lang.org/std/vec/struct.Vec.html?utm_source=buildspace.so&utm_medium=buildspace_project)
- [AnchorSerialize](https://docs.rs/anchor-lang/0.4.0/anchor_lang/trait.AnchorSerialize.html?utm_source=buildspace.so&utm_medium=buildspace_project)

## Issues

We then say space = 9000 which will allocate 9000 bytes of space for our account. You can change this # if you wanted, but, 9000 bytes is enough for the program we'll be building here!
Why are we paying for an account? Well — storing data isn't free! How Solana works is users will pay "rent" on their accounts. You can read more on it here and how rent is calculated. Pretty wild, right? If you don't pay rent, validators will clear the account!

Read: [Storage Rent Economics](https://docs.solana.com/storage_rent_economics?utm_source=buildspace.so&utm_medium=buildspace_project)

"With this approach, accounts with two-years worth of rent deposits secured are exempt from network rent charges. By maintaining this minimum-balance, the broader network benefits from reduced liquidity and the account holder can rest assured that their Account::data will be retained for continual access/usage."
