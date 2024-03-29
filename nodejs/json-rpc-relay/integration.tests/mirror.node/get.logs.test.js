console.clear();

require('dotenv').config({path: '.env'});
const { curly } = require('node-libcurl');
const urlHandler = require('../../../handlers/url.handler');
const httpHeaderJson = ['Content-Type: application/json', 'Accept: application/json'];

const getEthLogsPayload = () => {
    const ethLogsPayload = JSON.stringify(
        {
            "jsonrpc": "2.0",
            "id": 0,
            "method": "eth_getLogs",
            "params": [
                {
                    "fromBlock": "0x2edb",
                    "toBlock": "0x2edb"
                }
            ]
        });
    return ethLogsPayload;
}

describe('[CURL] Get Logs',  () => {

    test('Should get Logs from Arhia Testnet', async () => {

        // Arrange
        const ethLogsPayload = getEthLogsPayload();

        // Act
        const { data } = await curly.post(urlHandler.getJsonRpcTestnet(), {
            postFields: ethLogsPayload,
            httpHeader: httpHeaderJson,
        });

        // Assert
        expect(data.result.length).toBeGreaterThan(0);
        expect(data.result[0].address).toBeDefined();
        expect(data.result[0].blockHash).toBeDefined();
        expect(data.result[0].blockNumber).toBeDefined();
        expect(data.result[0].transactionIndex).toBeDefined();
        expect(data.result[0].data).toBeDefined();
        expect(data.result[0].address.length).toBeGreaterThan(20);
    });
});
