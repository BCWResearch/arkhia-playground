console.clear();

require('dotenv').config({path: '.env'});
const Web3 = require('web3');
const { curly } = require('node-libcurl');
const { ethers } = require("ethers");
const urlHandler = require('../../../handlers/url.handler');
const httpHeaderJson = ['Content-Type: application/json','Accept: application/json'];


const blockHashTestnet = "0x1753f5df715bdd24dc46021ab75972407c9e242ee48b2d9e80b9eaf25842f6c3";
const blockHashMainnet = "0x22970bd538feb8f833f6ec8f7d3a6056f09bbf62f8dd2ffcabf7aae534a98114";
const hashTestnetParsed = blockHashTestnet.substring(0, 66);
const hashMainnetParsed = blockHashMainnet.substring(0, 66);
const getPayload = (mainnet = false) => {
    const data = {
        "jsonrpc": "2.0",
        "method": "eth_getBlockByHash",
        "params":[mainnet ? hashMainnetParsed : blockHashTestnet, false],
        "id": 0
      };
    return data;
}

const assertPayload = (data) => {
    expect(data.result).toBeDefined();
    expect(data.result).toBeDefined();
    expect(data.result.mixHash).toBeDefined();
    expect(data.result.nonce).toBeDefined();
    expect(data.result.size).toBeDefined();
    expect(data.result.stateRoot).toBeDefined();
    expect(data.result.hash).toBeDefined();
    expect(data.result.parentHash).toBeDefined();
    expect(data.jsonrpc).toEqual('2.0');
}

describe('[CURL] Get Block By Hash', () => {

    test('Should return BlockByHashfrom Arkhia Testnet', async () => {
        // Arrange
        const configPayload = getPayload(false);

        // Act
        const { data } = await curly.post(urlHandler.getJsonRpcTestnet(), {
            postFields: JSON.stringify(configPayload),
            httpHeader: httpHeaderJson,
        });

        // Assert
        assertPayload(data);

    });

    test('Should return BlockByHashfrom Arkhia Mainnet', async () => {
        // Arrange
        const configPayload = getPayload(true);

        // Act
        const { data } = await curly.post(urlHandler.getJsonRpcMainnet(), {
            postFields: JSON.stringify(configPayload),
            httpHeader: httpHeaderJson,
        });

        // Assert
        assertPayload(data);

    });

});
