console.clear();

require('dotenv').config({path: '.env'});
const Web3 = require('web3');
const axios = require('axios');
const urlHandler = require('../../../handlers/url.handler');

const getPayload = () => {
    const data = {
        "jsonrpc": "2.0",
        "method": "eth_hashrate",
        "params": [],
        "id": 0
      };
    return data;
}

describe('[AXIOS] Hashrate', () => {

    test('Should get 0x0 from Testnet', async () => {
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
        expect(response.data).toBeDefined();
        expect(response.data?.result).toEqual("0x0");
    });

    test('Should get 0x0 from Mainnet', async () => {
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
        expect(response.data).toBeDefined();
        expect(response.data?.result).toEqual("0x0");
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
