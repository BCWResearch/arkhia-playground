console.clear();

require('dotenv').config({path: '.env'});
const Web3 = require('web3');
const { curly } = require('node-libcurl');
const { ethers } = require("ethers");

const httpHeaderJson = [
    'Content-Type: application/json',
    'Accept: application/json'
  ];
const arkhiaJsonRpcRelayTestnet  = `${process.env.ARKHIA_TESTNET_URL}/${process.env.ARKHIA_API_KEY}`;
const communityHashioMainnet = process.env.COMMUNITY_MAINNET_URL;

const getPayload = () => {
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
        const configPayload = getPayload();

        // Act
        const { data } = await curly.post(arkhiaJsonRpcRelayTestnet, {
            postFields: JSON.stringify(configPayload),
            httpHeader: httpHeaderJson,
        });

        // Assert
        expect(data.result).toBeDefined();
        expect(JSON.parse(data.result)).toBeFalsy()

    });
});

describe('[Web3] Eth Syncing', () => {

    test('Should return false from Arhia Testnet', async () => {
        // Arrange
        const web3Provider = new Web3(arkhiaJsonRpcRelayTestnet);

        // Act
        const result = await web3Provider.eth.isSyncing();

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

        // Assert
        expect(result).toBeDefined();
        expect(result).toBeFalsy();
    });
});
