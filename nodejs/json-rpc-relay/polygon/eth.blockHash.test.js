console.clear();

require('dotenv').config({path: '.env'});
const Web3 = require('web3');
const { ethers } = require("ethers");
const urlHandler = require('../../handlers/url.handler');


const blockHashTestnet = "0x288cf15ccc05ba05a30c3ba937655b92e489ac1ac833e77d3980124293f105a8";
const blockHashMainnet = "0x4cadce9d91cc12565c9018c53fe7081cb00e0d4246b46a28b0d02a442ce8255f";

const assertPayload = (data) => {
    expect(data).toBeDefined();
    expect(data.hash).toBeDefined();
    expect(data.parentHash).toBeDefined();
    expect(data.timestamp).toBeDefined();
    expect(data.number).toBeDefined();
}


describe('[Web3] GetBlockByHash', () => {

    test('Should get Polygon block data using hash from Arkhia Testnet', async () => {
        // Arrange
        const web3Provider = new Web3(urlHandler.getPolygonMumbaiTestnet());

        // Act
        const data = await web3Provider.eth.getBlock(blockHashTestnet);

        // Assert
        assertPayload(data);
    });

    test('Should get Polygon block data using hash from Arkhia Mainnet', async () => {
        // Arrange
        const web3Provider = new Web3(urlHandler.getPolygonMainnet());

        // Act
        const data = await web3Provider.eth.getBlock(blockHashMainnet);

        // Assert
        assertPayload(data);
    });

});

describe('[Ethers] GetBlockByHash', () => {

    test('Should get Polygon block data using hash from Arkhia Testnet', async () => {
        // Arrange
        const ethersProvider = new ethers.providers.JsonRpcProvider(urlHandler.getPolygonMumbaiTestnet());
        
        // Arrange
        const data = await ethersProvider.getBlock(blockHashTestnet);

        // Assert
        assertPayload(data);
    });

    test('Should get Polygon block data using hash from Arkhia Mainnet', async () => {
        // Arrange
        const ethersProvider = new ethers.providers.JsonRpcProvider(urlHandler.getPolygonMainnet());
        
        // Arrange
        const data = await ethersProvider.getBlock(blockHashMainnet);

        // Assert
        assertPayload(data);
    });

});