console.clear();

require('dotenv').config({path: '.env'});
const Web3 = require('web3');
const { curly } = require('node-libcurl');
const urlHandler = require('../../../handlers/url.handler');
const httpHeaderJson = ['Content-Type: application/json','Accept: application/json'];

const getPayload = () => {
    const data = {
        "jsonrpc": "2.0",
        "method": "eth_hashrate",
        "params": [],
        "id": 0
      };
    return data;
}

describe('[CURL] Hashrate', () => {

    test('Should get 0x0 from Testnet', async () => {
        // Arrange
        const configPayload = getPayload();

        // Act
        const { data } = await curly.post(urlHandler.getJsonRpcTestnet(), {
            postFields: JSON.stringify(configPayload),
            httpHeader: httpHeaderJson,
        });

        // Assert
        expect(data).toBeDefined();
        expect(data?.result).toEqual("0x0");
    });

    test('Should get 0x0 from Mainnet', async () => {
        // Arrange
        const configPayload = getPayload();

        // Act
        const { data } = await curly.post(urlHandler.getJsonRpcMainnet(), {
            postFields: JSON.stringify(configPayload),
            httpHeader: httpHeaderJson,
        });

        // Assert
        expect(data).toBeDefined();
        expect(data?.result).toEqual("0x0");
    });
});

describe('[Web3] Hashrate', () => {

    test('Should get 0 hashrate from Testnet', async () => {
        // Arrange
        const web3Provider = new Web3(urlHandler.getJsonRpcTestnet());

        // Act
        const hashrate = await web3Provider.eth.getHashrate();

        // Assert
        expect(hashrate).toBeDefined();
        expect(Number(hashrate)).toEqual(0);
    });

    test('Should get 0 hashrate from Mainnet', async () => {
        // Arrange
        const web3Provider = new Web3(urlHandler.getJsonRpcMainnet());

        // Act
        const hashrate = await web3Provider.eth.getHashrate();

        // Assert
        expect(hashrate).toBeDefined();
        expect(Number(hashrate)).toEqual(0);
    });

});
