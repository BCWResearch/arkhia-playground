console.clear();

require('dotenv').config({path: '.env'});
const Web3 = require('web3');
const { ethers } = require("ethers");
const urlHandler = require('../../handlers/url.handler');

describe('[Web3] Polygon Eth Syncing', () => {

    test('Should return false from Arkhia Testnet', async () => {
        // Arrange
        const web3Provider = new Web3(urlHandler.getPolygonMumbaiTestnet());

        // Act
        const result = await web3Provider.eth.isSyncing();

        // Assert
        expect(result).toBeDefined();
        expect(result).toBeFalsy();
    });

    test('Should return false from Arkhia Mainnet', async () => {
        // Arrange
        const web3Provider = new Web3(urlHandler.getPolygonMainnet());

        // Act
        const result = await web3Provider.eth.isSyncing();

        // Assert
        expect(result).toBeDefined();
        expect(result).toBeFalsy();
    });
});

describe('[Ethers] Polygon Eth Syncing', () => {

    test('Should return false from Arkhia Testnet', async () => {
        // Arrange
        const ethersProvider = new ethers.providers.JsonRpcProvider(urlHandler.getPolygonMumbaiTestnet());
        
        // Act
        const result = await ethersProvider.send("eth_syncing", []);

        // Assert
        expect(result).toBeDefined();
        expect(result).toBeFalsy();
    });

    test('Should return false from Arkhia Mainnet', async () => {
        // Arrange
        const ethersProvider = new ethers.providers.JsonRpcProvider(urlHandler.getPolygonMainnet());
        
        // Act
        const result = await ethersProvider.send("eth_syncing", []);

        // Assert
        expect(result).toBeDefined();
        expect(result).toBeFalsy();
    });

});
