/** @type import('hardhat/config').HardhatUserConfig */
require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config({path: '.env'});
const urlHandler = require('./json-rpc-relay/handlers/url.handler');
const arkhiaJsonRpcRelayTestnet  = urlHandler.getJsonRpcTestnet();
const communityHashioTestnet = urlHandler.getCommunityServiceTestnet();
const operatorPrivateKey = urlHandler.getOperatorPrivateKey();


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
