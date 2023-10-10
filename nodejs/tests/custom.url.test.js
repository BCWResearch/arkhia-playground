require('dotenv').config();
const axios = require('axios');
const jsonRPCSuffix = 'json-rpc/v1';
const restAPISuffix = 'api/v1';
const graphqlSuffix = 'graphql/alpha';
const apiKey = process.env.ARKHIA_API_KEY;

const urls = [
    'https://hashpack.arkhia.io/hedera',
    'https://pangolin.arkhia.io/hedera',
    'https://metaco.arkhia.io/hedera',
    'https://gameon.arkhia.io/hedera',
];

describe('Testnet URL Status Tests', () => {
    urls.forEach((url) => {

        it(`should return a 200 status for ${url}`, async () => {
            const restApiUrlTestnet  = `${url}/testnet/${apiKey}/${restAPISuffix}/transactions`;
            const response = await axios.get(restApiUrlTestnet);
            expect(response.status).toBe(200);
        });
    });
});

describe('mainnet URL Status Tests', () => {
    urls.forEach((url) => {

        it(`should return a 200 status for ${url}`, async () => {
            const restApiUrlTestnet  = `${url}/mainnet/${apiKey}/${restAPISuffix}/transactions`;
            const response = await axios.get(restApiUrlTestnet);
            expect(response.status).toBe(200);
        });
    });
});
