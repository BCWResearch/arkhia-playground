console.clear();

require('dotenv').config({path: '.env'});
const Web3 = require('web3');
const { curly } = require('node-libcurl');
const { ethers } = require("ethers");
const urlHandler = require('../../handlers/url.handler');
const httpHeaderJson = ['Content-Type: application/json','Accept: application/json'];


const blockHashTestnet = "0x5bacb48d5e59e753c1508f21dbe4c7b117cb2047b5e4d48be86decad9ec03e47231f22d16d241f6bab5529efdd971991";
const blockHashMainnet = "0x0f1c15e5a19a04f1b03bcf7f8605d14f69c4d21356728486fce2ec929366b1bb5628a4eafb94342729176dea32e14a68";
const hashTestnetParsed = blockHashTestnet.substring(0, 66);
const hashMainnetParsed = blockHashMainnet.substring(0, 66);
const getPayload = (mainnet = false) => {
    const data = {
        "jsonrpc": "2.0",
        "method": "eth_getBlockByHash",
        "params":[mainnet ? hashMainnetParsed : hashTestnetParsed, false],
        "id": 0
      };
    return data;
}

const assertPayload = (data) => {
    expect(data.result).toBeDefined();
    console.log(data);
    expect(data.result).toBeDefined();
    expect(data.result.difficulty).toBeDefined();
    expect(data.result.extraData).toBeDefined();
    expect(data.result.logsBloom).toBeDefined();
    expect(data.result.miner).toBeDefined();
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
