console.clear();

require('dotenv').config({path: '.env'});
const Web3 = require('web3');
const axios = require('axios');
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

describe('[AXIOS] Net Listening', () => {

    test('Should return listening status from Testnet', async () => {
        // Arrange
        const configPayload = getPayload();

        // Act
        const response = await axios.post(urlHandler.getJsonRpcTestnet(), configPayload, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        // Assert
        expect(response.data.result).toBeDefined();
        expect(typeof response.data.result).toBe('boolean');

    });

    test('Should return listening status from Mainnet', async () => {
        // Arrange
        const configPayload = getPayload();

        // Act
        const response = await axios.post(urlHandler.getJsonRpcMainnet(), configPayload, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        // Assert
        expect(response.data.result).toBeDefined();
        expect(typeof response.data.result).toBe('boolean');

    });

});

describe('[Web3] Net Listening', () => {

    test('Should return listening status from Testnet', async () => {
        // Arrange
        const web3Provider = new Web3(urlHandler.getJsonRpcTestnet());

        // Act
        const result = await web3Provider.eth.net.isListening();

        // Assert
        expect(result).toBeDefined();
        expect(typeof result).toBe('boolean');
    });

    test('Should return listening status from Mainnet', async () => {
        // Arrange
        const web3Provider = new Web3(urlHandler.getJsonRpcMainnet());

        // Act
        const result = await web3Provider.eth.net.isListening();

        // Assert
        expect(result).toBeDefined();
        expect(typeof result).toBe('boolean');
    });

});

describe('[Ethers] Net Listening', () => {

    test('Should return listening status from Arkhia Testnet', async () => {
        // Arrange
        const ethersProvider = new ethers.providers.JsonRpcProvider(urlHandler.getJsonRpcTestnet());

        // Act
        const result = await ethersProvider.send("net_listening", []);

        // Assert
        expect(result).toBeDefined();
        expect(typeof result).toBe('boolean');
    });

    test('Should return listening status from Arkhia Mainnet', async () => {
        // Arrange
        const ethersProvider = new ethers.providers.JsonRpcProvider(urlHandler.getJsonRpcMainnet());

        // Act
        const result = await ethersProvider.send("net_listening", []);

        // Assert
        expect(result).toBeDefined();
        expect(typeof result).toBe('boolean');
    });
});
