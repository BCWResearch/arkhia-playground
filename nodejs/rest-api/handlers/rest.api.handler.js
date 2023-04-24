require('dotenv').config();

const axios = require('axios');
const urlHandler = require('../../handlers/url.handler');

// Arkhia config
const apiKey = process.env.ARKHIA_API_KEY;
const body = { headers: { "x-api-key": apiKey } };

class RestApiHandler {

    getAccounts = async(isMainnet) => {
        try {
            const accountsUrl = `${urlHandler.getApiUrl(isMainnet)}/accounts`;
            const response = await axios.get(accountsUrl, body);
            return response;
        } catch(e) {
            console.error(e);
        }
    }

    getAccountById = async (accountId, isMainnet) => {
        try {
            const accountUrl = `${urlHandler.getApiUrl(isMainnet)}/accounts/${accountId}`;
            const response = await axios.get(accountUrl, body);
            return response;
        } catch(e) {
            console.error(e);
        }
    }

    getTokens = async (isMainnet) => {
        try {
            const tokensUrl = `${urlHandler.getApiUrl(isMainnet)}/tokens`;
            const response = await axios.get(tokensUrl, body);
            return response;
        } catch(e) {
            console.error(e);
        }
    }

    getTokenById = async (tokenId, isMainnet) => {
        try {
            const tokenUrl = `${urlHandler.getApiUrl(isMainnet)}/tokens/${tokenId}`;
            const response = await axios.get(tokenUrl, body);
            return response;
        } catch(e) {
            console.error(e);
        }
    }

    getContracts = async (isMainnet) => {
        try {
            const contractUrl = `${urlHandler.getApiUrl(isMainnet)}/contracts`;
            const response = await axios.get(contractUrl, body);
            return response;
        } catch(e) {
            console.error(e);
        }
    }

    getContractById = async (contract_id, isMainnet) => {
        try {
            const contractUrl = `${urlHandler.getApiUrl(isMainnet)}/contracts/${contract_id}`;
            const response = await axios.get(contractUrl, body);
            return response;
        } catch(e) {
            console.error(e);
        }
    }

    getTransactions = async (isMainnet) => {
        try {
            const transactionsUrl = `${urlHandler.getApiUrl(isMainnet)}/transactions`;
            const response = await axios.get(transactionsUrl, body);
            return response;
        } catch(e) {
            console.error(e);
        }
    }

    getTransactionByAccountId = async (accountId, isMainnet) => {
        try {
            const transactionsUrl = `${urlHandler.getApiUrl(isMainnet)}/transactions?account.id=${accountId}`;
            const response = await axios.get(transactionsUrl, body);
            return response;
        } catch(e) {
            console.error(e);
        }
    }

    getNetworkNodes = async(isMainnet) => {
        try {
            const networkNodesUrl = `${urlHandler.getApiUrl(isMainnet)}/network/nodes`;
            const response = await axios.get(networkNodesUrl, body);
            return response;
        } catch(e) {
            console.error(e);
        }
    }


}

module.exports = Object.freeze(new RestApiHandler());
