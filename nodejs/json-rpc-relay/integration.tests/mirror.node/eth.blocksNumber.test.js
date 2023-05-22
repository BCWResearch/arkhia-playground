console.clear();

require('dotenv').config({path: '.env'});
const Web3 = require('web3');
const { curly } = require('node-libcurl');
const { ethers } = require("ethers");
const urlHandler = require('../../../handlers/url.handler');
const httpHeaderJson = ['Content-Type: application/json','Accept: application/json'];

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
    expect(data.result).toBeDefined();
    expect(data.result).toBeDefined();
    expect(data.result.nonce).toBeDefined();
    expect(data.result.size).toBeDefined();
    expect(data.result.stateRoot).toBeDefined();
    expect(data.result.hash).toBeDefined();
    expect(data.result.parentHash).toBeDefined();
    expect(data.jsonrpc).toEqual('2.0');
}

describe('[CURL] Get Block By Number', () => {

    test('Should return BlockByNumber from Arkhia Testnet', async () => {
        // Arrange
        const configPayload = getPayload();

        // Act
        const { data } = await curly.post(urlHandler.getJsonRpcTestnet(), {
            postFields: JSON.stringify(configPayload),
            httpHeader: httpHeaderJson,
        });

        // Assert
        assertPayload(data);
   
    });

    test('Should return BlockByNumber from Arkhia Mainnet', async () => {
        // Arrange
        const configPayload = getPayload();

        // Act
        const { data } = await curly.post(urlHandler.getJsonRpcMainnet(), {
            postFields: JSON.stringify(configPayload),
            httpHeader: httpHeaderJson,
        });

        // Assert
        assertPayload(data);
   
    });
});

