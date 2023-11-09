console.clear();

require('dotenv').config({path: '.env'});
const Web3 = require('web3');
const { ethers } = require("ethers");
const urlHandler = require('../../handlers/url.handler');


const blockNumberTestnet = 42140069;
const blockNumberMainnet = 49681466;

const assertPayload = (data) => {
    expect(data).toBeDefined();
    expect(data.hash).toBeDefined();
    expect(data.parentHash).toBeDefined();
    expect(data.timestamp).toBeDefined();
    expect(data.number).toBeDefined();
}


describe('[Web3] GetBlockByHash', () => {

    test('Should get Polygon block data using block number from Arkhia Testnet', async () => {
        // Arrange
        const web3Provider = new Web3(urlHandler.getPolygonMumbaiTestnet());

        // Act
        const data = await web3Provider.eth.getBlock(blockNumberTestnet);

        // Assert
        assertPayload(data);
    });

    test('Should get Polygon block data using block number from Arkhia Mainnet', async () => {
        // Arrange
        const web3Provider = new Web3(urlHandler.getPolygonMainnet());

        // Act
        const data = await web3Provider.eth.getBlock(blockNumberMainnet);

        // Assert
        assertPayload(data);
    });

});

describe('[Ethers] GetBlockByHash', () => {

    test('Should get Polygon block data using block number from Arkhia Testnet', async () => {
        // Arrange
        const ethersProvider = new ethers.providers.JsonRpcProvider(urlHandler.getPolygonMumbaiTestnet());
        
        // Arrange
        const data = await ethersProvider.getBlock(blockNumberTestnet);

        // Assert
        assertPayload(data);
    });

    test('Should get Polygon block data using block number from Arkhia Mainnet', async () => {
        // Arrange
        const ethersProvider = new ethers.providers.JsonRpcProvider(urlHandler.getPolygonMainnet());
        
        // Arrange
        const data = await ethersProvider.getBlock(blockNumberMainnet);

        // Assert
        assertPayload(data);
    });

});