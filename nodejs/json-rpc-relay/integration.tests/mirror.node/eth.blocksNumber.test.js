console.clear();

require('dotenv').config({path: '.env'});
const Web3 = require('web3');
const axios = require('axios');
const { ethers } = require("ethers");
const urlHandler = require('../../../handlers/url.handler');

const getPayload = () => {
    const data = {
        "jsonrpc": "2.0",
        "method": "eth_getBlockByNumber",
        "params":["0x1b4", true],
        "id": 0
      };
    return data;
}

const assertPayload = (data) => {
    expect(data.result).toBeDefined();
    expect(data.result.number).toContain("0x1b4");
    !expect(data.result.timestamp).not.toBeNull();
    expect(data.result.stateRoot).toBeDefined();
    expect(data.result.hash).toBeDefined();
    expect(data.result.parentHash).toBeDefined();
    expect(data.jsonrpc).toEqual('2.0');
}

describe('[AXIOS] Get Block By Number', () => {

    test('Should return BlockByNumber from Arkhia Testnet', async () => {
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
        assertPayload(response.data);

    });

    test('Should return BlockByNumber from Arkhia Mainnet', async () => {
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
        assertPayload(response.data);

    });
});

