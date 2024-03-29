console.clear();

require('dotenv').config({path: '.env'});
const Web3 = require('web3');
const { ethers } = require("ethers");
const { curly } = require('node-libcurl');
const urlHandler = require('../../../../handlers/url.handler');

const httpHeaderJson = ['Content-Type: application/json', 'Accept: application/json'];
const testnetEvmAccount = "0x0000000000000000000000000000000000000589";

const getBalancePayload = () => {
    const data = JSON.stringify({
        "jsonrpc": "2.0",
        "method": "eth_getBalance",
        "params": [
            "0x0000000000000000000000000000000000000589", "latest"
        ],
        "id": 1
    });
    return data;
}

describe('[CURL] GetBalance',  () => {

    test('Should get Balance from Hedera account through EVM Account address from Arhia Testnet', async () => {

        // Arrange
        const getBalance= getBalancePayload();

        // Act
        const { data } = await curly.post(urlHandler.getJsonRpcTestnet(), {
            postFields: getBalance,
            httpHeader: httpHeaderJson,
        });

        // Assert
        expect(data).toBeDefined();
        expect(data.result.toString().length).toEqual(22);
        expect(data.jsonrpc).toBeDefined();
    });
});


describe('[Web3] GetBalance', () => {

    test('Should get Balance from Hedera account through EVM Account address from Arhia Testnet', async () => {
        // Arrange
        const web3Provider = new Web3(urlHandler.getJsonRpcTestnet());

        // Act
        const balance = await web3Provider.eth.getBalance(testnetEvmAccount);

        // Assert
        expect(balance).toBeDefined();
        expect(Number(balance)).toBeGreaterThan(0);
    });

});

describe('[Ethers] GetBalance', () => {

    test('Should get Balance from Hedera account through EVM Account address from Arhia Testnet', async () => {
        // Arrange
        const ethersProvider = new ethers.providers.JsonRpcProvider(urlHandler.getJsonRpcTestnet());
        
        // Arrange
        const balance = await ethersProvider.getBalance(testnetEvmAccount);

        // Assert
        expect(balance).toBeDefined();
        expect(Number(balance)).toBeGreaterThan(0);
    });

});

