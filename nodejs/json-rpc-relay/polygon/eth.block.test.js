console.clear();

require('dotenv').config({path: '.env'});
const Web3 = require('web3');
const { ethers } = require("ethers");
const urlHandler = require('../../handlers/url.handler');

describe('[Web3] Should return Latest Block Number', () => {

    test('Should return Latest Polygon Block number from Arkhia Testnet', async () => {
        // Arrange
        const web3Provider = new Web3(urlHandler.getPolygonMumbaiTestnet());

        // Act
        const result = await web3Provider.eth.getBlockNumber();

        // Assert
        expect(result).toBeDefined();
        expect(result).toBeGreaterThan(0);
    });

    test('Should return Latest Polygon Block number from Arkhia Mainnet', async () => {
        // Arrange
        const web3Provider = new Web3(urlHandler.getPolygonMainnet());

        // Act
        const result = await web3Provider.eth.getBlockNumber();

        // Assert
        expect(result).toBeDefined();
        expect(result).toBeGreaterThan(0);
    });
});

describe('[Ethers] Should return Latest BlockNumber', () => {

    test('Should return Latest Polygon Block number from Arkhia Testnet', async () => {
        // Arrange
        const ethersProvider = new ethers.providers.JsonRpcProvider(urlHandler.getPolygonMumbaiTestnet());

        // Act
        const result = await ethersProvider.getBlockNumber();

        // Assert
        expect(result).toBeDefined();
        expect(result).toBeGreaterThan(0);
    });

    test('Should return Latest Polygon Block number from Arkhia Mainnet', async () => {
        // Arrange
        const ethersProvider = new ethers.providers.JsonRpcProvider(urlHandler.getPolygonMainnet());

        // Act
        const result = await ethersProvider.getBlockNumber();

        // Assert
        expect(result).toBeDefined();
        expect(result).toBeGreaterThan(0);
    });

});
