# Launching NFTs on Avalanche using Scaffold-ETH

This is a revised edition of the Scaffold-ETH [Simple NFT Example](https://github.com/scaffold-eth/scaffold-eth/tree/simple-nft-example) branch that aims to illustrate how to create NFTs on Ethereum compatible chains using the bundled tech stack of [Solidity](https://docs.soliditylang.org/), [Hardhat](https://hardhat.org/), [Ether.js](https://docs.ethers.io/) and [React](https://reactjs.org/).  In this repo, the [Avalanche Fuji testnet](https://docs.avax.network/build/tutorials/platform/fuji-workflow/), a test network for [Avalanche C-Chain](https://docs.avax.network/learn/platform-overview/#contract-chain-c-chain), is the target chain.

## Dependencies

* [Git](https://git-scm.com/)

* [Node.js](https://nodejs.org/)

* [Yarn](https://yarnpkg.com/)

* [MetaMask](https://metamask.io/) (browser extension)

## Running the application

To run the application, git-clone this repo, open up a couple of shell command terminals and navigate to the project-root (e.g. *avax-scaffold-eth-nft*).

1. From the 1st shell terminal, install dependent modules.

```bash
cd avax-scaffold-eth-nft/

yarn install
```

2. From the 2nd terminal, specify deployer's account.

> Choose an account that owns some AVAX tokens (otherwise, get free tokens from an [AVAX faucet](https://faucet.avax-test.network/)) on the Avalanche Fuji testnet and create file *packages/hardhat/mnemonic.txt* with the account's 12-word mnemonic in it.

```bash
cd avax-scaffold-eth-nft/

yarn account
‍
yarn deploy --network fujiAvalanche
```

> For future references, the "deployed at" smart contract address should be saved.  Relevant transactions can be reviewed at https://testnet.snowtrace.io/.

3. Back to the 1st terminal, start the Node.js server at port# 3000.

```bash
yarn start
```

> This will spawn a web page on the default browser which should have been installed with the MetaMask extension.

4. From the web page, connect to the MetaMask account designated as the recipient of the NFTs

5. Back to the 2nd terminal, mint the NFTs.

```bash
yarn mint --network fujiAvalanche
```

> The address of the NFT recipient account connected to the browser app will be prompted.  Upon successful minting, images of the NFTs should be automatically displayed on the web page.

> To transfer any of the NFTs to another account, enter the address of the account to be transferred to and click "transfer".  Note that the account connected to the browser app would need to own some AVAX tokens.
