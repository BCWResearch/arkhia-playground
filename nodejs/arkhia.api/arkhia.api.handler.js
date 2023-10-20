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
        console.log(`Calling for ${statusApiUrl}`);
        const response = await axios.get(statusApiUrl, body);
        return response;
    }

    getEventRequestWithCustomKey = async (apiKey) => {
        const settingsUrl = `${urlHandler.getArkhiaApiUrl()}/events/hedera/settings/${apiKey}`;
        console.log(`Calling for ${settingsUrl}`);
        const response = await axios.post(settingsUrl, body);
        return response;
    }

    getItemSettings = async (addHeader = true) => {
        const settingsUrl = `${urlHandler.getArkhiaApiUrl()}/events/hedera/settings/${apiKey}`;
        console.log(`Calling for ${settingsUrl}`);
        const response = await axios.post(settingsUrl, body, addHeader ? headers : {});
        return response;
    }

    createItemSettings = async (scoutCreatePayload, tag) => {
        const settingsUrl = `${urlHandler.getArkhiaApiUrl()}/events/hedera/create/${tag}/${apiKey}`;
        console.log(`Calling for ${settingsUrl} with payload ${scoutCreatePayload}`);
        const response = await axios.post(settingsUrl, { scoutSettings: scoutCreatePayload }, headers);
        return response;
    }

    deleteItemSettings = async (scoutCreatePayload, tag) => {
        const settingsUrl = `${urlHandler.getArkhiaApiUrl()}/events/hedera/delete/${tag}/${apiKey}`;
        console.log(`Calling for ${settingsUrl} with payload ${scoutCreatePayload}`);
        const response = await axios.post(settingsUrl, { scoutSettings: scoutCreatePayload }, headers);
        return response;
    }

    updateAccountEventSettings = async (eventAccountUpdatePayload) => {
        // /events/:protocol?/settings/:type/update/:x_api_key
        const settingsUrl = `${urlHandler.getArkhiaApiUrl()}/events/hedera/settings/account/update/${apiKey}`;
        console.log(`Calling for ${settingsUrl} with payload ${eventAccountUpdatePayload}`);
        const response = await axios.post(settingsUrl, { scoutSettings: eventAccountUpdatePayload }, headers);
        return response;
    }
}

module.exports = Object.freeze(new ArkhiaApiHandler());
