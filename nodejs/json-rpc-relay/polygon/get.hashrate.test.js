console.clear();

require('dotenv').config({path: '.env'});
const Web3 = require('web3');
const urlHandler = require('../../handlers/url.handler');

describe('[Web3] Hashrate', () => {
    test('Should get 0 hashrate from Polygon Testnet', async () => {
        // Arrange
        const web3Provider = new Web3(urlHandler.getPolygonMumbaiTestnet());

        // Act
        const hashrate = await web3Provider.eth.getHashrate();

        // Assert
        expect(hashrate).toBeDefined();
        expect(Number(hashrate)).toEqual(0);
    });

    test('Should get 0 hashrate from Polygon Mainnet', async () => {
        // Arrange
        const web3Provider = new Web3(urlHandler.getPolygonMainnet());

        // Act
        const hashrate = await web3Provider.eth.getHashrate();

        // Assert
        expect(hashrate).toBeDefined();
        expect(Number(hashrate)).toEqual(0);
    });
});