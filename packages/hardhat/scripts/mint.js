/* eslint no-use-before-define: "warn" */
const fs = require("fs");
const chalk = require("chalk");
const { config, ethers } = require("hardhat");
const { utils } = require("ethers");
const R = require("ramda");
const ipfsAPI = require('ipfs-http-client');
const ipfs = ipfsAPI({host: 'ipfs.infura.io', port: '5001', protocol: 'https' })
const prompt = require('prompt-sync')();

const delayMS = 5000 //sometimes xDAI needs a 6000ms break lol 😅

const main = async () => {

  // ADDRESS TO MINT TO:
  // const toAddress = "0x34aA3F359A9D614239015126635CE7732c18fDF3"
  const toAddress = prompt("Enter the address to mint to: ");

  console.log("\n\n 🎫 Minting to "+toAddress+"...\n");

  const { deployer } = await getNamedAccounts();
  const yourCollectible = await ethers.getContract("YourCollectible", deployer);

  // Item #1

  const iconCrocodile = {
    "description": "Squared Croc Icon",
    "external_url": "https://blog.genuine.com/",
    "image": "https://blog.genuine.com/wp-content/uploads/2022/03/Crocodile-icon.png",
    "name": "Squared Crocodile",
    "attributes": [
       {
         "trait_type": "Color",
         "value": "Green"
       }
    ]
  }
  mintItem(iconCrocodile, yourCollectible, toAddress)

  await sleep(delayMS)

  // Item #2

  const iconDuck = {
    "description": "Squared Duck Icon",
    "external_url": "https://blog.genuine.com/",
    "image": "https://blog.genuine.com/wp-content/uploads/2022/03/Duck-icon.png",
    "name": "Squared Duck",
    "attributes": [
       {
         "trait_type": "Color",
         "value": "Yellow"
       }
    ]
  }
  mintItem(iconDuck, yourCollectible, toAddress)

  await sleep(delayMS)

  // Item #3

  const iconEagle = {
    "description": "Squared Eagle Icon",
    "external_url": "https://blog.genuine.com/",
    "image": "https://blog.genuine.com/wp-content/uploads/2022/03/Eagle-icon.png",
    "name": "Squared Eagle",
    "attributes": [
       {
         "trait_type": "Color",
         "value": "Dark Gray"
       }
    ]
  }
  mintItem(iconEagle, yourCollectible, toAddress)

  await sleep(delayMS)

  // Item #4

  const iconElephant = {
    "description": "Squared Elephant Icon",
    "external_url": "https://blog.genuine.com/",
    "image": "https://blog.genuine.com/wp-content/uploads/2022/03/Elephant-icon.png",
    "name": "Squared Elephant",
    "attributes": [
       {
         "trait_type": "Color",
         "value": "Light Gray"
       }
    ]
  }
  mintItem(iconElephant, yourCollectible, toAddress)

  await sleep(delayMS)

  // Item #5

  const iconFish = {
    "description": "Squared Fish Icon",
    "external_url": "https://blog.genuine.com/",
    "image": "https://blog.genuine.com/wp-content/uploads/2022/03/Fish-icon.png",
    "name": "Squared Fish",
    "attributes": [
       {
         "trait_type": "Color",
         "value": "Blue"
       }
    ]
  }
  mintItem(iconFish, yourCollectible, toAddress)

  await sleep(delayMS)

  console.log("Transferring Ownership of YourCollectible to "+toAddress+"...")

  await yourCollectible.transferOwnership(toAddress, { gasLimit: 8000000 });

  await sleep(delayMS)

  //const secondContract = await deploy("SecondContract")

  // const exampleToken = await deploy("ExampleToken")
  // const examplePriceOracle = await deploy("ExamplePriceOracle")
  // const smartContractWallet = await deploy("SmartContractWallet",[exampleToken.address,examplePriceOracle.address])

  /*
  //If you want to send value to an address from the deployer
  const deployerWallet = ethers.provider.getSigner()
  await deployerWallet.sendTransaction({
    to: "0x34aA3F359A9D614239015126635CE7732c18fDF3",
    value: ethers.utils.parseEther("0.001")
  })
  */

  /*
  //If you want to send some ETH to a contract on deploy (make your constructor payable!)
  const yourContract = await deploy("YourContract", [], {
  value: ethers.utils.parseEther("0.05")
  });
  */

  /*
  //If you want to link a library into your contract:
  // reference: https://github.com/austintgriffith/scaffold-eth/blob/using-libraries-example/packages/hardhat/scripts/deploy.js#L19
  const yourContract = await deploy("YourContract", [], {}, {
   LibraryName: **LibraryAddress**
  });
  */

};

async function mintItem(item, contract, mintTo, limit = 8000000) {
  console.log("Uploading `%s` ...", item.name)
  const uploaded = await ipfs.add(JSON.stringify(item))

  console.log("Minting `%s` with IPFS hash ("+uploaded.path+") ...", item.name)
  await contract.mintItem(mintTo,uploaded.path,{gasLimit:limit})
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
