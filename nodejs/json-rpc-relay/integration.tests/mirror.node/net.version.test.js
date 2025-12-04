console.clear();

require('dotenv').config({path: '.env'});
const Web3 = require('web3');
const { ethers } = require("ethers");
const urlHandler = require('../../../handlers/url.handler');
const { makeJsonRpcRequest } = require('../helpers/jsonrpc.helper');

const testnetNetworkId = '296';
const hashTestnetNetworkId = "0x128";

const getPayload = () => {
    const data = {
        "jsonrpc": "2.0",
        "method": "net_version",
        "params": [],
        "id": 0
      };
    return data;
}

describe('[AXIOS] Net Version', () => {

    test('Should get current chain id from Testnet', async () => {
        // Arrange
        const configPayload = getPayload();

        // Act
        const response = await makeJsonRpcRequest(urlHandler.getJsonRpcTestnet(), configPayload);

        // Assert
        expect(response.data?.result).toBeDefined();
        expect(response.data?.result).toBe(testnetNetworkId);
    });

});

describe('[Web3] Net Version', () => {

    test('Should get current chain id from Testnet', async () => {
        // Arrange
        const web3Provider = new Web3(urlHandler.getJsonRpcTestnet());

        // Act
        const result = await web3Provider.eth.net.getId();

        // Assert
        expect(result).toBeDefined();
        expect(result.toString()).toBe(testnetNetworkId);
    });

});

describe('[Ethers] Net Version', () => {

    test('Should get current chain id from Testnet', async () => {
        // Arrange
        const ethersProvider = new ethers.providers.JsonRpcProvider(urlHandler.getJsonRpcTestnet());
        
        // Arrange
        const result = await ethersProvider.getNetwork();

        // Assert
        expect(result).toBeDefined();
        expect(result?.chainId.toString()).toBe(testnetNetworkId);
    });

});
