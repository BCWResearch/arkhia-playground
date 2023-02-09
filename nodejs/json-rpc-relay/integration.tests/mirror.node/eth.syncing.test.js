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
        "method": "net_listening",
        "params": [],
        "id": 0
      };
    return data;
}

describe('[CURL] Eth Syncing', () => {

    test('Should return false from Arhia Testnet', async () => {
        // Arrange
        const configPayload = web3Payload();

        // Act
        const result = await axios.post(arkhiaJsonRpcRelayTestnet, configPayload);

        // Assert
        expect(result).toBeDefined();
        expect(JSON.parse(result.data.result)).toBeFalsy()

    });
});

describe('[Web3] Eth Syncing', () => {

    test('Should return false from Arhia Testnet', async () => {
        // Arrange
        const web3Provider = new Web3(arkhiaJsonRpcRelayTestnet);

        // Act
        const result = await web3Provider.eth.isSyncing();
        console.log(result)

        // Assert
        expect(result).toBeDefined();
        expect(result).toBeFalsy();
    });
});

describe('[Ethers] Eth Syncing', () => {

    test('Should return false from Hedera from Arhia Testnet', async () => {
        // Arrange
        const ethersProvider = new ethers.providers.JsonRpcProvider(arkhiaJsonRpcRelayTestnet);
        
        // Act
        const result = await ethersProvider.send("eth_syncing", []);
        console.log(result)

        // Assert
        expect(result).toBeDefined();
        expect(result).toBeFalsy();
    });
});
