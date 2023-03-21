require('dotenv').config();

const axios = require('axios');

// Arkhia config
const baseMainnetApiUrl = process.env.ARKHIA_MAINNET_API_URL;
const baseTestnetApiUrl = process.env.ARKHIA_TESTNET_API_URL;
const restApiUrl = `${baseMainnetApiUrl}`;
const apiKey = process.env.ARKHIA_API_KEY;
const body = { headers: { "x-api-key": apiKey } };

const getRestApiUrl = (mainnet) => {
    return
}

class RestApiHandler {

    getApiUrl = (isMainnet) => {
        return isMainnet ? baseMainnetApiUrl : baseTestnetApiUrl;
    }
    getTestnetUrl = () => {
        return baseTestnetApiUrl;
    }
    getMainnetUrl = () => {
        return baseMainnetApiUrl;
    }

    getAccountById = async (accountId, isMainnet) => {
        try {
            const accountUrl = `${this.getApiUrl(isMainnet)}/accounts/${accountId}`;
            const response = await axios.get(accountUrl, body);
            return response;
        } catch(e) {
            console.error(e);
        }
    }

    getTokens = async (isMainnet) => {
        try {
            const tokensUrl = `${this.getApiUrl(isMainnet)}/tokens`;
            const response = await axios.get(tokensUrl, body);
            return response;
        } catch(e) {
            console.error(e);
        }
    }

    getTokenById = async (tokenId, isMainnet) => {
        try {
            const tokenUrl = `${this.getApiUrl(isMainnet)}/tokens/${tokenId}`;
            const response = await axios.get(tokenUrl, body);
            return response;
        } catch(e) {
            console.error(e);
        }
    }

    getContracts = async (isMainnet) => {
        try {
            const contractUrl = `${this.getApiUrl(isMainnet)}/contracts`;
            const response = await axios.get(contractUrl, body);
            return response;
        } catch(e) {
            console.error(e);
        }
    }

    getContractById = async (contract_id, isMainnet) => {
        try {
            const contractUrl = `${this.getApiUrl(isMainnet)}/contracts/${contract_id}`;
            const response = await axios.get(contractUrl, body);
            return response;
        } catch(e) {
            console.error(e);
        }
    }

    getTransactions = async (isMainnet) => {
        try {
            const transactionsUrl = `${this.getApiUrl(isMainnet)}/transactions`;
            const response = await axios.get(transactionsUrl, body);
            return response;
        } catch(e) {
            console.error(e);
        }
    }

    getNetworkNodes = async(isMainnet) => {
        try {
            const networkNodesUrl = `${this.getApiUrl(isMainnet)}/network/nodes`;
            const response = await axios.get(networkNodesUrl, body);
            return response;
        } catch(e) {
            console.error(e);
        }
    }

    getAccounts = async(isMainnet) => {
        try {
            const accountsUrl = `${this.getApiUrl(isMainnet)}/accounts`;
            const response = await axios.get(accountsUrl, body);
            return response;
        } catch(e) {
            console.error(e);
        }
    }
}

module.exports = Object.freeze(new RestApiHandler());
