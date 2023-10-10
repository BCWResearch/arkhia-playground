require('dotenv').config();

const axios = require('axios');
const urlHandler = require('../handlers/url.handler');

// Arkhia config
const apiKey = process.env.PROJECT_API_KEY;
const apiSecret = process.env.PROJECT_API_SECRET;
const apiKeyNot2Layer = process.env.NOT_2LAYER_PROJECT_API_KEY;

const body = {};
const headers = { headers: { "x-api-secret": apiSecret } };

class ArkhiaApiHandler {

    getArkhiaApiStatus = async (isMainnet) => {
        const statusApiUrl = `${urlHandler.getArkhiaApiUrl(isMainnet)}/service/status/${apiKeyNot2Layer}`;
        const response = await axios.get(statusApiUrl, body);
        return response;
    }

    getScoutRequestWithCustomKey = async (isMainnet, apiKey) => {
        const settingsUrl = apiKey === `` ?
         `${urlHandler.getArkhiaApiUrl(isMainnet)}/scout/settings/${apiKey}`:
         `${urlHandler.getArkhiaApiUrl(isMainnet)}/scout/settings/${apiKey}`;
        const response = await axios.post(settingsUrl, body);
        return response;
    }

    getScoutSettings = async (isMainnet, addHeader=true) => {
        const settingsUrl = `${urlHandler.getArkhiaApiUrl(isMainnet)}/scout/settings/${apiKey}`;
        const response = await axios.post(settingsUrl, body, addHeader ? headers: {});
        return response;
    }
}

module.exports = Object.freeze(new ArkhiaApiHandler());
