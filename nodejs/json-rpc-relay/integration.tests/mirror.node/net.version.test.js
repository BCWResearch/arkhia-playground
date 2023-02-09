console.clear();
const axios = require(`axios`);
require('dotenv').config({path: '.env'});
const Web3 = require('web3');
const { ethers } = require("ethers");

const arkhiaJsonRpcRelayMainnet = `${process.env.ARKHIA_MAINNET_URL}/${process.env.ARKHIA_API_KEY}`;
const arkhiaJsonRpcRelayTestnet  = `${process.env.ARKHIA_TESTNET_URL}/${process.env.ARKHIA_API_KEY}`;
const communityHashioMainnet = process.env.COMMUNITY_MAINNET_URL;

const web3Payload = () => {
    const data = {
        "jsonrpc": "2.0",
        "method": "net_version",
        "params": [],
        "id": 0
      };
    return data;
}

describe('[CURL] Net Version', () => {

    test('Should get the current chain id from Arhia Testnet', async () => {
        // Arrange
        const configPayload = web3Payload();

        // Act
        const result = await axios.post(arkhiaJsonRpcRelayTestnet, configPayload);

        // Assert
        expect(result.data.result).toBeDefined();

    });
});

describe('[Web3] Net Version', () => {

    test('Should get current chain id from Arhia Testnet', async () => {
        // Arrange
        const web3Provider = new Web3(arkhiaJsonRpcRelayTestnet);

        // Act
        const result = await web3Provider.eth.net.getId();
        console.log(result)

        // Assert
        expect(result).toBeDefined();
    });
});

describe('[Ethers] Net Version', () => {

    test('Should get current chain id from Hedera from Arhia Testnet', async () => {
        // Arrange
        const ethersProvider = new ethers.providers.JsonRpcProvider(arkhiaJsonRpcRelayTestnet);
        
        // Arrange
        const result = await ethersProvider.getNetwork();

        // Assert
        expect(result).toBeDefined();
    });
});
