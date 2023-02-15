const { ethers } = require("hardhat");
require('dotenv').config({path: '.env'});

const urlHandler = require('../handlers/url.handler');
const arkhiaJsonRpcRelayTestnet  = urlHandler.getJsonRpcTestnet();
const communityHashioTestnet = urlHandler.getCommunityServiceTestnet();
const operatorPrivateKey = urlHandler.getOperatorPrivateKey();

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(arkhiaJsonRpcRelayTestnet);
  const wallet = new ethers.Wallet(operatorPrivateKey, provider);
  const Greeter = await ethers.getContractFactory('Greeter', wallet);
  const greeter = await Greeter.deploy('initial_msg');
  const contractAddress = (await greeter.deployTransaction.wait()).contractAddress;

  console.log(`Greeter deployed to ${contractAddress}`);
}

// To be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
