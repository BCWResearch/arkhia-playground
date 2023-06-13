require('dotenv').config();

const axios = require('axios');
const urlHandler = require('../../handlers/url.handler');

// Arkhia config
const apiKey = process.env.ARKHIA_API_KEY;
const body = { headers: { "x-api-key": apiKey } };

class RestApiHandler {

    getAccountAlias = (isMainnet) => {
        try {
            const alias = isMainnet ? process.env.MAINNET_ACCOUNT_ALIAS : process.env.TESTNET_ACCOUNT_ALIAS;
            return alias;
        } catch (e) {
            console.error(e.response.data);
            return "";
        }
    }

    getAccounts = async (isMainnet) => {
        try {
            const accountsUrl = `${urlHandler.getApiUrl(isMainnet)}/accounts`;
            const response = await axios.get(accountsUrl, body);
            return response;
        } catch (e) {
            console.error(e.response.data);
        }
    }

    getAccountById = async (accountId, isMainnet) => {
        try {
            const accountUrl = `${urlHandler.getApiUrl(isMainnet)}/accounts/${accountId}`;
            const response = await axios.get(accountUrl, body);
            return response;
        } catch (e) {
            console.error(e.response.data);
        }
    }

    // Rest of the methods with similar modifications

    // ...

    getBalances = async (isMainnet) => {
        try {
            const balancesUrl = `${urlHandler.getApiUrl(isMainnet)}/balances`;
            const response = await axios.get(balancesUrl, body);
            return response;
        } catch (e) {
            console.error(e.response.data);
        }
    }
}

module.exports = Object.freeze(new RestApiHandler());
