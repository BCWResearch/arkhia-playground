const { ethers } = require("hardhat");
// import { ethers } from "hardhat";
require('dotenv').config({path: '.env'});

const arkhiaJsonRpcRelayTestnet  = `${process.env.ARKHIA_TESTNET_URL}/${process.env.ARKHIA_API_KEY}`;
const communityHashioTestnet = process.env.COMMUNITY_TESTNET_URL;

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(communityHashioTestnet);
  const wallet = new ethers.Wallet(process.env.OPERATOR_PRIVATE_KEY, provider);
  console.log('yo1')
  const Greeter = await ethers.getContractFactory('Greeter', wallet);
  console.log('yo2')
  const greeter = await Greeter.deploy('initial_msg');
  console.log('yo3');
  const contractAddress = (await greeter.deployTransaction.wait()).contractAddress;
  console.log('yo3');

  console.log(`Greeter deployed to ${contractAddress}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});