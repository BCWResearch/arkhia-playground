require('dotenv').config();
console.clear();

const axios = require('axios');
const urlHandler = require('../handlers/url.handler');


// Arkhia config
const apiKey = process.env.ARKHIA_API_KEY;
const headers = { 'x-api-key': apiKey };

describe('Test to validate API key', () => {
    test('Should load correct API Key', () => {
        expect(apiKey).toBeDefined();
        expect(apiKey.length).toEqual(32);
    });

    test('this API Key is not valid', async () => {
        try {
            const balancesUrl = `${urlHandler.getApiUrl()}/balances`;
            const response = await axios.get(balancesUrl, { headers });
        } catch (error) {
            expect((error.response.data)).toHaveProperty('status', false);
            expect(error.response.data.response).toContain('Unauthorized');
            console.error(error.response.data.response)
        }


    });



});
