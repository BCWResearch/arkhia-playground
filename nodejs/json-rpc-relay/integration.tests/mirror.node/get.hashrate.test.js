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

    test('Should get 0x0 from Arkhia Testnet', async () => {
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

    test('Should get 0x0 from Arkhia Mainnet', async () => {
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

    test('Should get 0x0 from Hashio Testnet', async () => {
        // Arrange
        const configPayload = getPayload();

        // Act
        const { data } = await curly.post(urlHandler.getCommunityServiceTestnet(), {
            postFields: JSON.stringify(configPayload),
            httpHeader: httpHeaderJson,
        });

        // Assert
        expect(data).toBeDefined();
        expect(data?.result).toEqual("0x0");
    });

    test('Should get 0x0 from Hashio Mainnet', async () => {
        // Arrange
        const configPayload = getPayload();

        // Act
        const { data } = await curly.post(urlHandler.getCommunityServiceMainnet(), {
            postFields: JSON.stringify(configPayload),
            httpHeader: httpHeaderJson,
        });

        // Assert
        expect(data).toBeDefined();
        expect(data?.result).toEqual("0x0");
    });
});

describe('[Web3] Hashrate', () => {

    test('Should get 0 hashrate from Arkhia Testnet', async () => {
        // Arrange
        const web3Provider = new Web3(urlHandler.getJsonRpcTestnet());

        // Act
        const hashrate = await web3Provider.eth.getHashrate();

        // Assert
        expect(hashrate).toBeDefined();
        expect(Number(hashrate)).toEqual(0);
    });

    test('Should get 0 hashrate from Arkhia Mainnet', async () => {
        // Arrange
        const web3Provider = new Web3(urlHandler.getJsonRpcMainnet());

        // Act
        const hashrate = await web3Provider.eth.getHashrate();

        // Assert
        expect(hashrate).toBeDefined();
        expect(Number(hashrate)).toEqual(0);
    });

    test('Should get 0 hashrate from Hashio Testnet', async () => {
        // Arrange
        const web3Provider = new Web3(urlHandler.getCommunityServiceTestnet());

        // Act
        const hashrate = await web3Provider.eth.getHashrate();

        // Assert
        expect(hashrate).toBeDefined();
        expect(Number(hashrate)).toEqual(0);
    });

    test('Should get 0 hashrate from Hashio Mainnet', async () => {
        // Arrange
        const web3Provider = new Web3(urlHandler.getCommunityServiceMainnet());

        // Act
        const hashrate = await web3Provider.eth.getHashrate();

        // Assert
        expect(hashrate).toBeDefined();
        expect(Number(hashrate)).toEqual(0);
    });
});
