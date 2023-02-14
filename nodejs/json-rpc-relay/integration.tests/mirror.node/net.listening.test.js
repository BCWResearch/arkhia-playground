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
const arkhiaJsonRpcRelayMainnet  = `${process.env.ARKHIA_TESTNET_URL}/${process.env.ARKHIA_API_KEY}`;
const communityHashioTestnet = process.env.COMMUNITY_TESTNET_URL;
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

describe('[CURL] Net Listening', () => {

    test('Should return false from Arkhia Testnet', async () => {
        // Arrange
        const configPayload = getPayload();

        // Act
        const { data } = await curly.post(arkhiaJsonRpcRelayTestnet, {
            postFields: JSON.stringify(configPayload),
            httpHeader: httpHeaderJson,
        });

        // Assert
        expect(data.result).toBeDefined();
        expect(JSON.parse(data.result)).toBeFalsy();

    });

    test('Should return false from Arkhia Mainnet', async () => {
        // Arrange
        const configPayload = getPayload();

        // Act
        const { data } = await curly.post(arkhiaJsonRpcRelayMainnet, {
            postFields: JSON.stringify(configPayload),
            httpHeader: httpHeaderJson,
        });

        // Assert
        expect(data.result).toBeDefined();
        expect(JSON.parse(data.result)).toBeFalsy();

    });

    test('Should return false from Hashio Testnet', async () => {
        // Arrange
        const configPayload = getPayload();

        // Act
        const { data } = await curly.post(communityHashioTestnet, {
            postFields: JSON.stringify(configPayload),
            httpHeader: httpHeaderJson,
        });

        // Assert
        expect(data.result).toBeDefined();
        expect(JSON.parse(data.result)).toBeFalsy();

    });

    test('Should return false from Hashio Mainnet', async () => {
        // Arrange
        const configPayload = getPayload();

        // Act
        const { data } = await curly.post(communityHashioMainnet, {
            postFields: JSON.stringify(configPayload),
            httpHeader: httpHeaderJson,
        });

        // Assert
        expect(data.result).toBeDefined();
        expect(JSON.parse(data.result)).toBeFalsy();

    });
});

describe('[Web3] Net Listening', () => {

    test('Should return false from Arkhia Testnet', async () => {
        // Arrange
        const web3Provider = new Web3(arkhiaJsonRpcRelayTestnet);

        // Act
        const result = await web3Provider.eth.net.isListening();

        // Assert
        expect(result).toBeDefined();
        expect(result).toBe("false");
    });

    test('Should return false from Arkhia Mainnet', async () => {
        // Arrange
        const web3Provider = new Web3(arkhiaJsonRpcRelayMainnet);

        // Act
        const result = await web3Provider.eth.net.isListening();

        // Assert
        expect(result).toBeDefined();
        expect(result).toBe("false");
    });

    test('Should return false from Hashio Testnet', async () => {
        // Arrange
        const web3Provider = new Web3(communityHashioTestnet);

        // Act
        const result = await web3Provider.eth.net.isListening();

        // Assert
        expect(result).toBeDefined();
        expect(result).toBe("false");
    });

    test('Should return false from Hashio Mainnet', async () => {
        // Arrange
        const web3Provider = new Web3(communityHashioMainnet);

        // Act
        const result = await web3Provider.eth.net.isListening();

        // Assert
        expect(result).toBeDefined();
        expect(result).toBe("false");
    });
});

describe('[Ethers] Net Listening', () => {

    test('Should return false from Arkhia Testnet', async () => {
        // Arrange
        const ethersProvider = new ethers.providers.JsonRpcProvider(arkhiaJsonRpcRelayTestnet);
        
        // Act
        const result = await ethersProvider.send("net_listening", []);

        // Assert
        expect(result).toBeDefined();
        expect(result).toBe("false");
    });

    test('Should return false from Arkhia Mainnet', async () => {
        // Arrange
        const ethersProvider = new ethers.providers.JsonRpcProvider(arkhiaJsonRpcRelayMainnet);
        
        // Act
        const result = await ethersProvider.send("net_listening", []);

        // Assert
        expect(result).toBeDefined();
        expect(result).toBe("false");
    });

    test('Should return false from Hashio Testnet', async () => {
        // Arrange
        const ethersProvider = new ethers.providers.JsonRpcProvider(communityHashioTestnet);
        
        // Act
        const result = await ethersProvider.send("net_listening", []);

        // Assert
        expect(result).toBeDefined();
        expect(result).toBe("false");
    });

    test('Should return false from Hashio Mainnet', async () => {
        // Arrange
        const ethersProvider = new ethers.providers.JsonRpcProvider(communityHashioMainnet);
        
        // Act
        const result = await ethersProvider.send("net_listening", []);

        // Assert
        expect(result).toBeDefined();
        expect(result).toBe("false");
    });
});
