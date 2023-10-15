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

    getArkhiaApiStatus = async () => {
        const statusApiUrl = `${urlHandler.getArkhiaApiUrl()}/service/status/${apiKeyNot2Layer}`;
        const response = await axios.get(statusApiUrl, body);
        return response;
    }

    getEventRequestWithCustomKey = async (apiKey) => {
        const settingsUrl = apiKey === `` ?
         `${urlHandler.getArkhiaApiUrl()}/events/hedera/settings/${apiKey}`:
         `${urlHandler.getArkhiaApiUrl()}/events/hedera/settings/${apiKey}`;
        const response = await axios.post(settingsUrl, body);
        return response;
    }

    getEventSettings = async (addHeader = true) => {
        const settingsUrl = `${urlHandler.getArkhiaApiUrl()}/events/hedera/settings/${apiKey}`;
        console.log(`Calling for ${settingsUrl}`);
        const response = await axios.post(settingsUrl, body, addHeader ? headers : {});
        return response;
    }

    createEventSettings = async (scoutCreatePayload) => {
        const settingsUrl = `${urlHandler.getArkhiaApiUrl()}/events/hedera/settings/create/${apiKey}`;
        console.log(`Calling for ${settingsUrl} with payload ${scoutCreatePayload}`);
        const response = await axios.post(settingsUrl, { scoutSettings: scoutCreatePayload }, headers);
        return response;
    }
}

module.exports = Object.freeze(new ArkhiaApiHandler());
