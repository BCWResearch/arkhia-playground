console.clear();

require('dotenv').config({path: '.env'});
const Web3 = require('web3');
const { curly } = require('node-libcurl');
const { ethers } = require("ethers");
const urlHandler = require('../../../handlers/url.handler');
const httpHeaderJson = ['Content-Type: application/json', 'Accept: application/json'];

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

    test('Should return false from Testnet', async () => {
        // Arrange
        const configPayload = getPayload();

        // Act
        const { data } = await curly.post(urlHandler.getJsonRpcTestnet(), {
            postFields: JSON.stringify(configPayload),
            httpHeader: httpHeaderJson,
        });

        // Assert
        expect(data.result).toBeDefined();
        expect(JSON.parse(data.result)).toBeFalsy();

    });

    test('Should return false from Mainnet', async () => {
        // Arrange
        const configPayload = getPayload();

        // Act
        const { data } = await curly.post(urlHandler.getJsonRpcMainnet(), {
            postFields: JSON.stringify(configPayload),
            httpHeader: httpHeaderJson,
        });

        // Assert
        expect(data.result).toBeDefined();
        expect(JSON.parse(data.result)).toBeFalsy();

    });

});

describe('[Web3] Net Listening', () => {

    test('Should return false from Testnet', async () => {
        // Arrange
        const web3Provider = new Web3(urlHandler.getJsonRpcTestnet());

        // Act
        const result = await web3Provider.eth.net.isListening();

        // Assert
        expect(result).toBeDefined();
        expect(result).toBe("false");
    });

    test('Should return false from Mainnet', async () => {
        // Arrange
        const web3Provider = new Web3(urlHandler.getJsonRpcMainnet());

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
        const ethersProvider = new ethers.providers.JsonRpcProvider(urlHandler.getJsonRpcTestnet());
        
        // Act
        const result = await ethersProvider.send("net_listening", []);

        // Assert
        expect(result).toBeDefined();
        expect(result).toBe("false");
    });

    test('Should return false from Arkhia Mainnet', async () => {
        // Arrange
        const ethersProvider = new ethers.providers.JsonRpcProvider(urlHandler.getJsonRpcMainnet());
        
        // Act
        const result = await ethersProvider.send("net_listening", []);

        // Assert
        expect(result).toBeDefined();
        expect(result).toBe("false");
    });
});
