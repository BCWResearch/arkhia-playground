console.clear();

require('dotenv').config({ path: '.env' });
const { makeJsonRpcRequest } = require('../helpers/jsonrpc.helper');
const urlHandler = require('../../../handlers/url.handler');

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
        const response = await makeJsonRpcRequest(urlHandler.getJsonRpcTestnet(), configPayload);

        // Assert
        expect(response.data).toBeDefined();
        expect(response.data.length).toBe(batchRequestLimit);
        expect(response.data[0].result).toBeDefined();
        expect(response.data[0].result).toBe(hashTestnetNetworkId);
    });

    test(`Should throw error on current chain id from Testnet for ${(batchRequestLimit + 1)} batch request exceeding 1 more than limit`, async () => {
        // Arrange
        const configPayload = getPayload(batchRequestLimit + 1);

        // Act & Assert
        try {
            await makeJsonRpcRequest(urlHandler.getJsonRpcTestnet(), configPayload);
            // If it doesn't throw, fail the test
            fail('Expected request to fail with 400 error');
        } catch (error) {
            expect(error.response).toBeDefined();
            expect(error.response.status).toBe(400);
            expect(error.response.data).toBeDefined();
            expect(error.response.data.error).toBeDefined();
            expect(error.response.data.error.message).toContain("Batch request amount " + (batchRequestLimit + 1) + " exceeds max " + batchRequestLimit);
        }
    });


});
