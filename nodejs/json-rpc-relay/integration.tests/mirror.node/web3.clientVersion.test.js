console.clear();

require('dotenv').config({path: '.env'});
const Web3 = require('web3');
const { curly } = require('node-libcurl');
const { ethers } = require("ethers");
const urlHandler = require('../../../handlers/url.handler');
const httpHeaderJson = ['Content-Type: application/json','Accept: application/json'];

const hashioRelayVersion = "relay/0.18.0";
const hashioRelayMainnetVersion = "relay/0.18.0-rc1";
const arkhiaRelayVersion = "relay/0.17.1";

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
        const { data } = await curly.post(urlHandler.getJsonRpcTestnet(), {
            postFields: JSON.stringify(configPayload),
            httpHeader: httpHeaderJson,
        });

        // Assert
        expect(data?.result).toBeDefined();
        expect(data?.result).toBe(arkhiaRelayVersion);
    });

    test('Should get relay version from Arhia Mainnet', async () => {
        // Arrange
        const configPayload = getPayload();

        // Act
        const { data } = await curly.post(urlHandler.getJsonRpcMainnet(), {
            postFields: JSON.stringify(configPayload),
            httpHeader: httpHeaderJson,
        });

        // Assert
        expect(data?.result).toBeDefined();
        expect(data?.result).toBe(arkhiaRelayVersion);
    });

    test('Should get relay version from Hashio Testnet', async () => {
        // Arrange
        const configPayload = getPayload();

        // Act
        const { data } = await curly.post(urlHandler.getCommunityServiceTestnet(), {
            postFields: JSON.stringify(configPayload),
            httpHeader: httpHeaderJson,
        });

        // Assert
        expect(data?.result).toBeDefined();
        expect(data?.result).toBe(hashioRelayVersion);
    });

    test('Should get relay version from Hashio Mainnet', async () => {
        // Arrange
        const configPayload = getPayload();

        // Act
        const { data } = await curly.post(urlHandler.getCommunityServiceMainnet(), {
            postFields: JSON.stringify(configPayload),
            httpHeader: httpHeaderJson,
        });

        // Assert
        expect(data?.result).toBeDefined();
        expect(data?.result).toBe(hashioRelayMainnetVersion);
    });
});

describe('[Web3] ClientVersion', () => {
    test('Should get clientVersion from Arhia Testnet', async () => {
        // Arrange
        const web3Provider = new Web3(urlHandler.getJsonRpcTestnet());

        // Act
        const result = await web3Provider.eth.getNodeInfo();

        // Assert
        expect(result).toBeDefined();
        expect(result).toBe(arkhiaRelayVersion);
    });

    test('Should get clientVersion from Arhia Mainnet', async () => {
        // Arrange
        const web3Provider = new Web3(urlHandler.getJsonRpcMainnet());

        // Act
        const result = await web3Provider.eth.getNodeInfo();

        // Assert
        expect(result).toBeDefined();
        expect(result).toBe(arkhiaRelayVersion);
    });

    test('Should get clientVersion from Hashio Testnet', async () => {
        // Arrange
        const web3Provider = new Web3(urlHandler.getCommunityServiceTestnet());

        // Act
        const result = await web3Provider.eth.getNodeInfo();

        // Assert
        expect(result).toBeDefined();
        expect(result).toBe(hashioRelayVersion);
    });

    test('Should get clientVersion from Hashio Mainnet', async () => {
        // Arrange
        const web3Provider = new Web3(urlHandler.getCommunityServiceMainnet());

        // Act
        const result = await web3Provider.eth.getNodeInfo();

        // Assert
        expect(result).toBeDefined();
        expect(result).toBe(hashioRelayMainnetVersion);
    });
});

describe('[Ethers] ClientVersion', () => {

    test('Should get clientVersion from Hedera from Arhia Testnet', async () => {
        // Arrange
        const ethersProvider = new ethers.providers.JsonRpcProvider(urlHandler.getJsonRpcTestnet());
        
        // Arrange
        const result = await ethersProvider.send("web3_clientVersion", []);

        // Assert
        expect(result).toBeDefined();
        expect(result).toBe(arkhiaRelayVersion);
    });

    test('Should get clientVersion from Hedera from Arhia Mainnet', async () => {
        // Arrange
        const ethersProvider = new ethers.providers.JsonRpcProvider(urlHandler.getJsonRpcMainnet());
        
        // Arrange
        const result = await ethersProvider.send("web3_clientVersion", []);

        // Assert
        expect(result).toBeDefined();
        expect(result).toBe(arkhiaRelayVersion);
    });

    test('Should get clientVersion from Hedera from Hashio Testnet', async () => {
        // Arrange
        const ethersProvider = new ethers.providers.JsonRpcProvider(urlHandler.getCommunityServiceTestnet());
        
        // Arrange
        const result = await ethersProvider.send("web3_clientVersion", []);

        // Assert
        expect(result).toBeDefined();
        expect(result).toBe(hashioRelayVersion);
    });

    test('Should get clientVersion from Hedera from Hashio Mainnet', async () => {
        // Arrange
        const ethersProvider = new ethers.providers.JsonRpcProvider(urlHandler.getCommunityServiceMainnet());
        
        // Arrange
        const result = await ethersProvider.send("web3_clientVersion", []);

        // Assert
        expect(result).toBeDefined();
        expect(result).toBe(hashioRelayMainnetVersion);
    });
});
