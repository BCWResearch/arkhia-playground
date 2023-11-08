console.clear();

require('dotenv').config({path: '.env'});
const Web3 = require('web3');
const { ethers } = require("ethers");
const urlHandler = require('../../handlers/url.handler');

const testnetEvmAccount = "0x433785Af3A50Bb3D281d3d44dBd0391a30C6Cd3E";
const mainnetEvmAccount = "0xE746359b419Caf999a6e6cB4D6031B1867709B23";

describe('[Web3] GetBalance', () => {

    test('Should get Balance for Polygon account using Arkhia Testnet', async () => {
        // Arrange
        const web3Provider = new Web3(urlHandler.getPolygonMumbaiTestnet());

        // Act
        const balance = await web3Provider.eth.getBalance(testnetEvmAccount);

        // Assert
        expect(balance).toBeDefined();
        expect(Number(balance)).toBeGreaterThan(0);
    });

    test('Should get Balance for Polygon account using Arkhia Mainnet', async () => {
        // Arrange
        const web3Provider = new Web3(urlHandler.getPolygonMainnet());

        // Act
        const balance = await web3Provider.eth.getBalance(mainnetEvmAccount);

        // Assert
        expect(balance).toBeDefined();
        expect(Number(balance)).toBeGreaterThan(0);
    });

});

describe('[Ethers] GetBalance', () => {

    test('Should get Balance for Polygon account from Arkhia Testnet', async () => {
        // Arrange
        const ethersProvider = new ethers.providers.JsonRpcProvider(urlHandler.getPolygonMumbaiTestnet());
        
        // Arrange
        const balance = await ethersProvider.getBalance(testnetEvmAccount);

        // Assert
        expect(balance).toBeDefined();
        expect(Number(balance)).toBeGreaterThan(0);
    });

    test('Should get Balance for Polygon account using Arkhia Mainnet', async () => {
        // Arrange
        const ethersProvider = new ethers.providers.JsonRpcProvider(urlHandler.getPolygonMainnet());
        
        // Arrange
        const balance = await ethersProvider.getBalance(mainnetEvmAccount);

        // Assert
        expect(balance).toBeDefined();
        expect(Number(balance)).toBeGreaterThan(0);
    });

});