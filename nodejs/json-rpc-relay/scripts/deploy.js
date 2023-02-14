const { ethers } = require("hardhat");
require('dotenv').config({path: '.env'});

const arkhiaJsonRpcRelayTestnet  = `${process.env.ARKHIA_TESTNET_URL}/${process.env.ARKHIA_API_KEY}`;
const communityHashioTestnet = process.env.COMMUNITY_TESTNET_URL;

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(arkhiaJsonRpcRelayTestnet);
  const wallet = new ethers.Wallet(process.env.OPERATOR_PRIVATE_KEY, provider);
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
