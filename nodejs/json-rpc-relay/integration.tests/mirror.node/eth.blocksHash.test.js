console.clear();

require('dotenv').config({path: '.env'});
const Web3 = require('web3');
const { makeJsonRpcRequest } = require('../helpers/jsonrpc.helper');
const { ethers } = require("ethers");
const urlHandler = require('../../../handlers/url.handler');


const blockHashTestnet = "0x4245dd5d17cc8721680b5cfabf977426d8470761691c9c488df0cd23efb491aa";
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

describe('[AXIOS] Get Block By Hash', () => {

    test('Should return BlockByHashfrom Arkhia Testnet', async () => {
        // Arrange
        const configPayload = getPayload(false);

        // Act
        const response = await makeJsonRpcRequest(urlHandler.getJsonRpcTestnet(), configPayload);

        // Assert
        assertPayload(response.data);

    });

    test('Should return BlockByHashfrom Arkhia Mainnet', async () => {
        // Arrange
        const configPayload = getPayload(true);

        // Act
        const response = await makeJsonRpcRequest(urlHandler.getJsonRpcMainnet(), configPayload);

        // Assert
        assertPayload(response.data);

    });

});
