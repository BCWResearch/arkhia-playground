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
        } catch {
            console.error(e);
            return "";
        }
    }

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

    getContractResultsById = async (contract_id, isMainnet) => {
        try {
            const contractUrl = `${urlHandler.getApiUrl(isMainnet)}/contracts/${contract_id}/results`;
            const response = await axios.get(contractUrl, body);
            return response;
        } catch(e) {
            console.error(e);
        }
    }

    getContractResultLogsById = async (contract_id, isMainnet) => {
        try {
            const contractUrl = `${urlHandler.getApiUrl(isMainnet)}/contracts/${contract_id}/results/logs`;
            const response = await axios.get(contractUrl, body);
            return response;
        } catch(e) {
            console.error(e);
        }
    }


    getContractEvmCall = async (payload, isMainnet) => {
        try {
            // works with url : `https://testnet.mirrornode.hedera.com/api/v1/contracts/call`
            const contractUrl = `${urlHandler.getApiUrl(isMainnet)}/contracts/call`;
            const response = await axios.post(contractUrl, payload, body);
            return response;
        } catch(e) {
            console.log(`Error`);
            console.log(e.response);
            console.log(e.response.data._status);
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
    getBlocks = async (isMainnet) => {
        try {
            const blocksUrl = `${urlHandler.getApiUrl(isMainnet)}/blocks`;
            const response = await axios.get(blocksUrl, body);
            return response;
        } catch(e) {
            console.error(e);
        }
    }

    getSchedules = async (isMainnet) => {
        try {
            const schedulesUrl = `${urlHandler.getApiUrl(isMainnet)}/schedules`;
            const response = await axios.get(schedulesUrl, body);
            return response;
        } catch(e) {
            console.error(e);
        }
    }

    getBalances = async (isMainnet) => {
        try {
            const balancesUrl = `${urlHandler.getApiUrl(isMainnet)}/balances`;
            const response = await axios.get(balancesUrl, body);
            return response;
        } catch(e) {
            console.error(e);
        }
    }



}

module.exports = Object.freeze(new RestApiHandler());
