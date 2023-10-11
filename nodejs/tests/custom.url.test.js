require('dotenv').config();
process.env = require('dotenv-array')()
const axios = require('axios');
const jsonRPCSuffix = 'json-rpc/v1';
const restAPISuffix = 'api/v1';
const { curly } = require('node-libcurl');
const httpHeaderJson = ['Content-Type: application/json','Accept: application/json'];

const apiKey = process.env.ARKHIA_API_KEY;

const urls = process.env.CUSTOM_URLS

const getAccountPayload = () => {
    const data = JSON.stringify({"jsonrpc":"2.0","method":"eth_accounts","params":[],"id":1});
    return data;
}
describe('Testnet URL Status Tests', () => {
    urls.forEach((url) => {

        it(`should be able to make REST API requests for ${url}`, async () => {
            const ApiUrl  = `${url}/testnet/${apiKey}/${restAPISuffix}/transactions`;
            const response = await axios.get(ApiUrl);
            expect(response.status).toBe(200);
        });

        it(`should be able to make JSON-RPC requests for ${url}`, async () => {

            const configAccountsPayload = getAccountPayload();
            const ApiUrl  = `${url}/testnet/${jsonRPCSuffix}/${apiKey}`
            const { data } = await curly.post(ApiUrl, {
                postFields: configAccountsPayload,
                httpHeader: httpHeaderJson,
            });
            expect(data.jsonrpc).toBeDefined();
        });


    });
});

describe('Mainnet URL Status Tests', () => {
    urls.forEach((url) => {

        it(`should be able to make REST API requests for for ${url}`, async () => {
            const ApiUrl  = `${url}/mainnet/${apiKey}/${restAPISuffix}/transactions`;
            const response = await axios.get(ApiUrl);
            expect(response.status).toBe(200);
        });

        it(`should be able to make JSON-RPC requests for ${url}`, async () => {

            const configAccountsPayload = getAccountPayload();
            const ApiUrl  = `${url}/mainnet/${jsonRPCSuffix}/${apiKey}`
            const { data } = await curly.post(ApiUrl, {
                postFields: configAccountsPayload,
                httpHeader: httpHeaderJson,
            });
            expect(data.jsonrpc).toBeDefined();
        });
    });
});
