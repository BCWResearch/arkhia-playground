console.clear();

require('dotenv').config({path: '.env'});
const Web3 = require('web3');
const { curly } = require('node-libcurl');
const { ethers } = require("ethers");
const urlHandler = require('../../../handlers/url.handler');
const httpHeaderJson = ['Content-Type: application/json','Accept: application/json'];

const getPayload = () => {
    const data = {
        "jsonrpc": "2.0",
        "method": "eth_blockNumber",
        "params": [],
        "id": 0
      };
    return data;
}

describe('[CURL] Get Latest Block Number', () => {

    test('Should return Latest BlockNumber in Hext format from Arkhia Testnet', async () => {
        // Arrange
        const configPayload = getPayload();

        // Act
        const { data } = await curly.post(urlHandler.getJsonRpcTestnet(), {
            postFields: JSON.stringify(configPayload),
            httpHeader: httpHeaderJson,
        });

        // Assert
        expect(data.result).toBeDefined();
        expect(data.result.length).toBeGreaterThanOrEqual(7);
    });

    test('Should return Latest BlockNumber in Hext format from Arkhia Mainnet', async () => {
        // Arrange
        const configPayload = getPayload();

        // Act
        const { data } = await curly.post(urlHandler.getJsonRpcMainnet(), {
            postFields: JSON.stringify(configPayload),
            httpHeader: httpHeaderJson,
        });

        // Assert
       expect(data.result).toBeDefined();
       expect(data.result.length).toBeGreaterThanOrEqual(7);
    });
});


describe('[Web3] Should return Latest Block Number', () => {

    test('Should return Latest Block number from Arkhia Testnet', async () => {
        // Arrange
        const web3Provider = new Web3(urlHandler.getJsonRpcTestnet());

        // Act
        const result = await web3Provider.eth.getBlockNumber();

        // Assert
        expect(result).toBeDefined();
        expect(result).toBeGreaterThan(0);
    });

    test('Should return Latest Block number from Arkhia Mainnet', async () => {
        // Arrange
        const web3Provider = new Web3(urlHandler.getJsonRpcMainnet());

        // Act
        const result = await web3Provider.eth.getBlockNumber();

        // Assert
        expect(result).toBeDefined();
        expect(result).toBeGreaterThan(0);
    });
});

describe('[Ethers] Should return Latest BlockNumber', () => {

    test('Should return Latest Block number from Arkhia Testnet', async () => {
        // Arrange
        const ethersProvider = new ethers.providers.JsonRpcProvider(urlHandler.getJsonRpcTestnet());
        
        // Act
        const result = await ethersProvider.getBlockNumber();

        // Assert
        expect(result).toBeDefined();
        expect(result).toBeGreaterThan(0);
    });

    test('Should return Latest Block number from Arkhia Mainnet', async () => {
        // Arrange
        const ethersProvider = new ethers.providers.JsonRpcProvider(urlHandler.getJsonRpcMainnet());
        
        // Act
        const result = await ethersProvider.getBlockNumber();

        // Assert
        expect(result).toBeDefined();
        expect(result).toBeGreaterThan(0);
    });

});
