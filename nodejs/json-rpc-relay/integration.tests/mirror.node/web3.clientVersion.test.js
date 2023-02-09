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
        "method": "web3_clientVersion",
        "params": [],
        "id": 0
      };
    return data;
}

describe('[CURL] ClientVersion', () => {

    test('Should get relay version from Arhia Testnet', async () => {
        // Arrange
        const configPayload = getPayload();

        // Act
        const { data } = await curly.post(arkhiaJsonRpcRelayTestnet, {
            postFields: JSON.stringify(configPayload),
            httpHeader: httpHeaderJson,
        });

        // Assert
        expect(data?.result).toBeDefined();
    });
});

describe('[Web3] ClientVersion', () => {

    test('Should get clientVersion from Arhia Testnet', async () => {
        // Arrange
        const web3Provider = new Web3(arkhiaJsonRpcRelayTestnet);

        // Act
        const result = await web3Provider.eth.getNodeInfo();

        // Assert
        expect(result).toBeDefined();
    });
});

describe('[Ethers] ClientVersion', () => {

    test('Should get clientVersion from Hedera from Arhia Testnet', async () => {
        // Arrange
        const ethersProvider = new ethers.providers.JsonRpcProvider(arkhiaJsonRpcRelayTestnet);
        
        // Arrange
        const result = await ethersProvider.send("web3_clientVersion", []);

        // Assert
        expect(result).toBeDefined();
        // expect(Number(balance)).toBeGreaterThan(0);
    });
});
