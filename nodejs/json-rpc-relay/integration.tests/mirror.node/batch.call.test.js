console.clear();

require('dotenv').config({ path: '.env' });
const { curly } = require('node-libcurl');
const urlHandler = require('../../../handlers/url.handler');
const httpHeaderJson = ['Content-Type: application/json', 'Accept: application/json'];

const testnetNetworkId = 296;
const hashTestnetNetworkId = "0x128";

const batchRequestLimit = parseInt(process.env.JSONRPC_BATCH_REQUEST_SIZE || "25")

const getPayload = (count = 0) => {
    const payload = { method: "eth_chainId", params: [], id: 1, jsonrpc: "2.0" };
    return count > 0 ? new Array(count).fill(payload) : payload;
}

describe('Batch EthChainId', () => {

    test(`Should get current chain id from Testnet for ${batchRequestLimit} batch requests`, async () => {
        // Arrange
        const configPayload = getPayload(batchRequestLimit);

        // Act
        const { data } = await curly.post(urlHandler.getJsonRpcTestnet(), {
            postFields: JSON.stringify(configPayload),
            httpHeader: httpHeaderJson,
        });

        // Assert
        expect(data).toBeDefined();
        expect(data.length).toBe(batchRequestLimit);
        expect(data[0].result).toBeDefined();
        expect(data[0].result).toBe(hashTestnetNetworkId);
    });

    test(`Should throw error on current chain id from Testnet for ${(batchRequestLimit + 1)} batch request exceeding 1 more than limit`, async () => {
        // Arrange
        const configPayload = getPayload(batchRequestLimit + 1);

        // Act
        const { data } = await curly.post(urlHandler.getJsonRpcTestnet(), {
            postFields: JSON.stringify(configPayload),
            httpHeader: httpHeaderJson,
        });

        // Assert
        expect(data).toBeDefined();
        expect(data.error).toBeDefined();
        expect(data.error.message).toBe("Batch request amount " + (batchRequestLimit + 1) + " exceeds max " + batchRequestLimit);
    });


});
