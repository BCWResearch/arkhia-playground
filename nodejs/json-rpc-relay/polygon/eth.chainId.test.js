console.clear();

require('dotenv').config({path: '.env'});
const Web3 = require('web3');
const { ethers } = require("ethers");
const urlHandler = require('../../handlers/url.handler');

const chainIdTestnet = 80001;
const chainIdHashTestnet = "0x13881";
const chainIdMainnet = 137;
const chainIdHashMainnet = "0x89";

describe('[Web3] EthChainId for polygon', () => {

    test('Should get chain id for Polygon Testnet', async () => {
        // Arrange
        const web3Provider = new Web3(urlHandler.getPolygonMumbaiTestnet());

        // Act
        const result = await web3Provider.eth.getChainId();

        // Assert
        expect(result).toBe(chainIdTestnet);
    });

    test('Should get chain id for Polygon Mainnet', async () => {
        // Arrange
        const web3Provider = new Web3(urlHandler.getPolygonMainnet());

        // Act
        const result = await web3Provider.eth.getChainId();

        // Assert
        expect(result).toBe(chainIdMainnet);
    });

});

describe('[Ethers] EthChainId for polygon', () => {

    test('Should get chain id for Polygon Hedera from Testnet', async () => {
        // Arrange
        const ethersProvider = new ethers.providers.JsonRpcProvider(urlHandler.getPolygonMumbaiTestnet());
        
        // Arrange
        const result = await ethersProvider.send("eth_chainId", []);

        // Assert
        expect(result).toBe(chainIdHashTestnet);
    });

    test('Should get chain id for Polygon Hedera from Mainnet', async () => {
        // Arrange
        const ethersProvider = new ethers.providers.JsonRpcProvider(urlHandler.getPolygonMainnet());
        
        // Arrange
        const result = await ethersProvider.send("eth_chainId", []);

        // Assert
        expect(result).toBe(chainIdHashMainnet);
    });
});
