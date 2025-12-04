console.clear();

require('dotenv').config({path: '.env'});
const Web3 = require('web3');
const { makeJsonRpcRequest } = require('../helpers/jsonrpc.helper');
const { ethers } = require("ethers");
const urlHandler = require('../../../handlers/url.handler');

const getPayload = () => {
    const data = {
        "jsonrpc": "2.0",
        "method": "eth_blockNumber",
        "params": [],
        "id": 0
      };
    return data;
}

describe('[AXIOS] Get Latest Block Number', () => {

    test('Should return Latest BlockNumber in Hext format from Arkhia Testnet', async () => {
        // Arrange
        const configPayload = getPayload();

        // Act
        const response = await makeJsonRpcRequest(urlHandler.getJsonRpcTestnet(), configPayload);

        // Assert
        expect(response.data.result).toBeDefined();
        expect(response.data.result.length).toBeGreaterThanOrEqual(6);
    });

    test('Should return Latest BlockNumber in Hext format from Arkhia Mainnet', async () => {
        // Arrange
        const configPayload = getPayload();

        // Act
        const response = await makeJsonRpcRequest(urlHandler.getJsonRpcMainnet(), configPayload);

        // Assert
       expect(response.data.result).toBeDefined();
       expect(response.data.result.length).toBeGreaterThanOrEqual(7);
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
