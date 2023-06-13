require('dotenv').config();
console.clear();

const axios = require('axios');
const urlHandler = require('../handlers/url.handler');


// Arkhia config
const apiKey = process.env.ARKHIA_API_KEY;
const headers = { 'x-api-key': apiKey };

describe('Test to validate API key', () => {
    test('Should load API Key', () => {
        expect(apiKey).toBeDefined();
        expect(apiKey.length).toEqual(32);
    });

    test('Should validate API Key', async () => {
        const balancesUrl = `${urlHandler.getApiUrl()}/balances`;
        const response = await axios.get(balancesUrl, { headers });
        expect(response).toHaveProperty('status', 200);
        expect(response.data.status).not.toBe(false);
    });
});
