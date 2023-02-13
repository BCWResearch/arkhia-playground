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
const communityHashioTestnet = process.env.COMMUNITY_TESTNET_URL;

const getPayload = () => {
    const data = {
        "jsonrpc": "2.0",
        "method": "net_version",
        "params": [],
        "id": 0
      };
    return data;
}

describe('[CURL] Net Version', () => {

    test('Should get current chain id from Arkhia Testnet', async () => {
        // Arrange
        const configPayload = getPayload();

        // Act
        const { data } = await curly.post(arkhiaJsonRpcRelayTestnet, {
            postFields: JSON.stringify(configPayload),
            httpHeader: httpHeaderJson,
        });

        // Assert
        expect(data?.result).toBeDefined();
        expect(data?.result).toBe("0x128");
    });

    test('Should get current chain id from Hashio Testnet', async () => {
        // Arrange
        const configPayload = getPayload();

        // Act
        const { data } = await curly.post(communityHashioTestnet, {
            postFields: JSON.stringify(configPayload),
            httpHeader: httpHeaderJson,
        });

        // Assert
        expect(data?.result).toBeDefined();
        expect(data?.result).toBe("0x128");
    });
});

describe('[Web3] Net Version', () => {

    test('Should get current chain id from Arkhia Testnet', async () => {
        // Arrange
        const web3Provider = new Web3(arkhiaJsonRpcRelayTestnet);

        // Act
        const result = await web3Provider.eth.net.getId();

        // Assert
        expect(result).toBeDefined();
        expect(result).toBe(296);
    });

    test('Should get current chain id from Hashio Testnet', async () => {
        // Arrange
        const web3Provider = new Web3(communityHashioTestnet);

        // Act
        const result = await web3Provider.eth.net.getId();

        // Assert
        expect(result).toBeDefined();
        expect(result).toBe(296);
    });
});

describe('[Ethers] Net Version', () => {

    test('Should get current chain id from Arkhia Testnet', async () => {
        // Arrange
        const ethersProvider = new ethers.providers.JsonRpcProvider(arkhiaJsonRpcRelayTestnet);
        
        // Arrange
        const result = await ethersProvider.getNetwork();

        // Assert
        expect(result).toBeDefined();
        expect(result?.chainId).toBe(296);
    });

    test('Should get current chain id from Hashio Testnet', async () => {
        // Arrange
        const ethersProvider = new ethers.providers.JsonRpcProvider(communityHashioTestnet);
        
        // Arrange
        const result = await ethersProvider.getNetwork();

        // Assert
        expect(result).toBeDefined();
        expect(result?.chainId).toBe(296);
    });
});
