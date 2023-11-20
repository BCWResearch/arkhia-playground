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

    toggleSettingsItem = async (scoutTogglePayload, type, action) => {
        const settingsUrl = `${urlHandler.getArkhiaApiUrl()}/events/hedera/${action}/${type}/${apiKey}`;
        console.log(`Calling for toggle ${settingsUrl} with payload ${scoutTogglePayload}`);
        const response = await axios.post(settingsUrl, { scoutSettings: scoutTogglePayload }, headers);
        return response;
    }

    deleteItemSettings = async (scoutCreatePayload, tag) => {
        const settingsUrl = `${urlHandler.getArkhiaApiUrl()}/events/hedera/delete/${tag}/${apiKey}`;
        console.log(`Calling for ${settingsUrl} with payload ${scoutCreatePayload}`);
        const response = await axios.post(settingsUrl, { scoutSettings: scoutCreatePayload }, headers);
        return response;
    }

    getItemsCategoryConfig = async(eventSettingsPayload, item, configCategory) => {
        const settingsUnique = `${urlHandler.getArkhiaApiUrl()}/events/hedera/settings/${item}/${configCategory}/${apiKey}`;
        console.log(`Calling for ${settingsUnique} with payload ${eventSettingsPayload}`);
        const response = await axios.post(settingsUnique, { scoutSettings: eventSettingsPayload }, headers);
        return response;
    }

    updateItemsCategoryConfig = async (updateEventsPayload, eventType, configType) => {
        const updateUrl = `${urlHandler.getArkhiaApiUrl()}/events/hedera/settings/update/${eventType}/${configType}/${apiKey}`;
        console.log(`Calling for ${updateUrl} with payload ${updateEventsPayload}`);
        const response = await axios.post(updateUrl, { scoutSettings: updateEventsPayload }, headers);
        return response;
    }

    getStatusInfo = async () => {
        const updateUrl = `${urlHandler.getArkhiaApiUrl()}/service/status/${apiKey}`;
        const response = await axios.get(updateUrl);
        return response;
    }

    getArkhiaApiTokenMetadata = async (tokenPayload) => {
        const updateUrl = `${urlHandler.getArkhiaApiUrl()}/token/hedera/nft/metadata/esg/${apiKey}`;
        console.log(`Looking for ${updateUrl} with payload ${tokenPayload.toString()}`);
        const response = await axios.post(updateUrl, { itemSettings: tokenPayload }, headers);
       
       // `/token/:protocol?/metadata/:x_api_key?`,
        return response;
    }
}

module.exports = Object.freeze(new ArkhiaApiHandler());
