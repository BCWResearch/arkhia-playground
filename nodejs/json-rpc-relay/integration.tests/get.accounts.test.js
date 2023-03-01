console.clear();

require('dotenv').config({path: '.env'});
const { curly } = require('node-libcurl');
const urlHandler = require('../../handlers/url.handler');
const httpHeaderJson = ['Content-Type: application/json','Accept: application/json'];

const getAccountPayload = () => {
    const data = JSON.stringify({"jsonrpc":"2.0","method":"eth_accounts","params":[],"id":1});
    return data;
}

describe('[CURL] Get Accounts',  () => {

    test('Should get Account information from Hedera account through EVM Account address from Arhia Testnet', async () => {

        // Arrange
        const configAccountsPayload = getAccountPayload();

        // Act
        const { data } = await curly.post(urlHandler.getJsonRpcTestnet(), {
            postFields: configAccountsPayload,
            httpHeader: httpHeaderJson,
        });

        // Assert
        expect(data.jsonrpc).toBeDefined();
    });
});

