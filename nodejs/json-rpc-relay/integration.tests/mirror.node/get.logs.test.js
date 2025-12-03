console.clear();

require('dotenv').config({path: '.env'});
const axios = require('axios');
const urlHandler = require('../../../handlers/url.handler');

const getEthLogsPayload = () => {
    const ethLogsPayload = {
        "jsonrpc": "2.0",
        "id": 0,
        "method": "eth_getLogs",
        "params": [
            {
                "fromBlock": "0x2edb",
                "toBlock": "0x2edb"
            }
        ]
    };
    return ethLogsPayload;
}

describe('[AXIOS] Get Logs',  () => {

    test('Should get Logs from Arhia Testnet', async () => {

        // Arrange
        const ethLogsPayload = getEthLogsPayload();

        // Act
        const response = await axios.post(urlHandler.getJsonRpcTestnet(), ethLogsPayload, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        // Assert
        expect(response.data.result.length).toBeGreaterThan(0);
        expect(response.data.result[0].address).toBeDefined();
        expect(response.data.result[0].blockHash).toBeDefined();
        expect(response.data.result[0].blockNumber).toBeDefined();
        expect(response.data.result[0].transactionIndex).toBeDefined();
        expect(response.data.result[0].data).toBeDefined();
        expect(response.data.result[0].address.length).toBeGreaterThan(20);
    });
});
