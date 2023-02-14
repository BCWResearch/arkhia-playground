/** @type import('hardhat/config').HardhatUserConfig */
require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config({path: '.env'});
const arkhiaJsonRpcRelayTestnet  = `${process.env.ARKHIA_TESTNET_URL}/${process.env.ARKHIA_API_KEY}`;
const operatorPrivateKey = process.env.OPERATOR_PRIVATE_KEY;

module.exports = {
  defaultNetwork: "hedera",
  solidity: "0.8.9",
  networks: {
    hedera: {
      url: arkhiaJsonRpcRelayTestnet,
      accounts:  [operatorPrivateKey.toString()]  
    }
  },
};
