console.clear();

require('dotenv').config({path: '.env'});
const Web3 = require('web3');
const { ethers } = require("ethers");
const urlHandler = require('../../handlers/url.handler');

const assertPayload = (data) => {
    expect(data.length).toBeGreaterThan(0);
    expect(data[0].address).toBeDefined();
    expect(data[0].blockHash).toBeDefined();
    expect(data[0].blockNumber).toBeDefined();
    expect(data[0].transactionIndex).toBeDefined();
    expect(data[0].data).toBeDefined();
    expect(data[0].address.length).toBeGreaterThan(20);
}

describe('[Web3] GetBlockByHash', () => {

    test('Should get logs data using hash from Arkhia Testnet', async () => {
        // Arrange
        const web3Provider = new Web3(urlHandler.getPolygonMumbaiTestnet());

        // Act
        const data = await web3Provider.eth.getPastLogs({
            "fromBlock": 42140061,
            "toBlock": 42140063
        });

        // Assert
        assertPayload(data);
    });

    test('Should get logs data using hash from Arkhia Mainnet', async () => {
        // Arrange
        const web3Provider = new Web3(urlHandler.getPolygonMainnet());

        // Act
        const data = await web3Provider.eth.getPastLogs({
            "fromBlock": 49681466,
            "toBlock": 49681469
        });

        // Assert
        assertPayload(data);
    });

});

describe('[Ethers] GetBlockByHash', () => {

    test('Should get Polygon block data using hash from Arkhia Testnet', async () => {
        // Arrange
        const ethersProvider = new ethers.providers.JsonRpcProvider(urlHandler.getPolygonMumbaiTestnet());
        
        // Arrange
        const data = await ethersProvider.getLogs({
            "fromBlock": 42140061,
            "toBlock": 42140063
        });

        // Assert
        assertPayload(data);
    });

    test('Should get Polygon block data using hash from Arkhia Mainnet', async () => {
        // Arrange
        const ethersProvider = new ethers.providers.JsonRpcProvider(urlHandler.getPolygonMainnet());
        
        // Arrange
        const data = await ethersProvider.getLogs({
            "fromBlock": 49681466,
            "toBlock": 49681469
        });

        // Assert
        assertPayload(data);
    });

});