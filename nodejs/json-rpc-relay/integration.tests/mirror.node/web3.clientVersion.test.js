console.clear();

require('dotenv').config({path: '.env'});
const Web3 = require('web3');
const axios = require('axios');
const { ethers } = require("ethers");
const urlHandler = require('../../../handlers/url.handler');

const arkhiaRelayVersion = "relay/0.23.0-rc1";
const arkhiaRelayVersionTestnet = "relay/0.23.0-rc1";

const getPayload = () => {
    const data = {
        "jsonrpc": "2.0",
        "method": "web3_clientVersion",
        "params": [],
        "id": 0
      };
    return data;
}

describe('[AXIOS] ClientVersion', () => {

    test('Should get relay version from Testnet', async () => {
        // Arrange
        const configPayload = getPayload();

        // Act
        const response = await axios.post(urlHandler.getJsonRpcTestnet(), configPayload, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        // Assert
        expect(response.data?.result).toBeDefined();
    });

    test('Should get relay version from Mainnet', async () => {
        // Arrange
        const configPayload = getPayload();

        // Act
        const response = await axios.post(urlHandler.getJsonRpcMainnet(), configPayload, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        // Assert
        expect(response.data?.result).toBeDefined();
    });

});

describe('[Web3] ClientVersion', () => {

    test('Should get clientVersion from Testnet', async () => {
        // Arrange
        const web3Provider = new Web3(urlHandler.getJsonRpcTestnet());

        // Act
        const result = await web3Provider.eth.getNodeInfo();

        // Assert
        expect(result).toBeDefined();
        expect(result).toContain(`relay`);
    });

    test('Should get clientVersion from Mainnet', async () => {
        // Arrange
        const web3Provider = new Web3(urlHandler.getJsonRpcMainnet());

        // Act
        const result = await web3Provider.eth.getNodeInfo();

        // Assert
        expect(result).toBeDefined();
        expect(result).toContain(`relay`);
    });

});

describe('[Ethers] ClientVersion', () => {

    test('Should get clientVersion from Hedera from Testnet', async () => {
        // Arrange
        const ethersProvider = new ethers.providers.JsonRpcProvider(urlHandler.getJsonRpcTestnet());
        
        // Arrange
        const result = await ethersProvider.send("web3_clientVersion", []);

        // Assert
        expect(result).toBeDefined();
        expect(result).toContain(`relay`);
    });

    test('Should get clientVersion from Hedera from Mainnet', async () => {
        // Arrange
        const ethersProvider = new ethers.providers.JsonRpcProvider(urlHandler.getJsonRpcMainnet());
        
        // Arrange
        const result = await ethersProvider.send("web3_clientVersion", []);

        // Assert
        expect(result).toBeDefined();
        expect(result).toContain(`relay`);
    });
});
