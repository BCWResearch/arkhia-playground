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
            const accountsUrl = `${urlHandler.getApiUrl(isMainnet)}/accounts?order=desc`;
            const response = await axios.get(accountsUrl);
            return response;
        } catch (e) {
            console.error(e.response.data);
        }
    }

    getAccountById = async (accountId, isMainnet) => {
        try {
            const accountUrl = `${urlHandler.getApiUrl(isMainnet)}/accounts/${accountId}`;
            const response = await axios.get(accountUrl);
            return response;
        } catch (e) {
            console.error(e.response.data);
        }
    }

    // Rest of the methods with similar modifications

    getTokens = async (isMainnet) => {
        try {
            const tokensUrl = `${urlHandler.getApiUrl(isMainnet)}/tokens`;
            const response = await axios.get(tokensUrl);
            return response;
        } catch(e) {
            console.error(e.response.data);
        }
    }

    getTokenById = async (tokenId, isMainnet) => {
        try {
            const tokenUrl = `${urlHandler.getApiUrl(isMainnet)}/tokens/${tokenId}`;
            const response = await axios.get(tokenUrl);
            return response;
        } catch(e) {
            console.error(e.response.data);
        }
    }

    getContracts = async (isMainnet) => {
        try {
            const contractUrl = `${urlHandler.getApiUrl(isMainnet)}/contracts`;
            const response = await axios.get(contractUrl);
            return response;
        } catch(e) {
            console.error(e.response.data);
        }
    }

    getContractById = async (contract_id, isMainnet) => {
        try {
            const contractUrl = `${urlHandler.getApiUrl(isMainnet)}/contracts/${contract_id}`;
            const response = await axios.get(contractUrl);
            return response;
        } catch(e) {
            console.error(e.response.data);
        }
    }

    getContractResultsById = async (contract_id, isMainnet) => {
        try {
            const contractUrl = `${urlHandler.getApiUrl(isMainnet)}/contracts/${contract_id}/results`;
            const response = await axios.get(contractUrl);
            return response;
        } catch(e) {
            console.error(e.response.data);
        }
    }

    getContractResultLogsById = async (contract_id, isMainnet) => {
        try {
            const contractUrl = `${urlHandler.getApiUrl(isMainnet)}/contracts/${contract_id}/results/logs`;
            const response = await axios.get(contractUrl);
            return response;
        } catch(e) {
            console.error(e.response.data);
        }
    }

    getContractEvmCall = async (payload, isMainnet) => {
        try {
            // works with url : `https://testnet.mirrornode.hedera.com/api/v1/contracts/call`
            const contractUrl = `${urlHandler.getApiUrl(isMainnet)}/contracts/call`;
            const response = await axios.post(contractUrl, payload);
            return response;
        } catch(e) {
            console.log(`Error`);
            console.error(e.response.data);
            console.log(e.response.data._status);
        }
    }

    getTransactions = async (isMainnet) => {
        try {
            const transactionsUrl = `${urlHandler.getApiUrl(isMainnet)}/transactions`;
            const response = await axios.get(transactionsUrl);
            return response;
        } catch(e) {
            console.error(e.response.data);
        }
    }

    getAccountInfoByCryptoTransfer = async(accountId, isMainnet) => {
        try {
            const transactionUrl = `${urlHandler.getApiUrl(isMainnet)}/accounts/${accountId}?transactionType=cryptotransfer&limit=200&order=asc`;
            const response = await axios.get(transactionUrl);
            return response;
        } catch(e) {
            console.error(e.response.data);
        }
    }

    getTransactionByAccountId = async (isMainnet) => {
        try {
            const transactionsUrl = `${urlHandler.getApiUrl(isMainnet)}/transactions?account.id=0.0.779573&limit=3&order=desc`;
            const response = await axios.get(transactionsUrl);
            return response;
        } catch(e) {
            console.error(e.response.data);
        }
    }

    getNetworkNodes = async(isMainnet) => {
        try {
            const networkNodesUrl = `${urlHandler.getApiUrl(isMainnet)}/network/nodes`;
            const response = await axios.get(networkNodesUrl);
            return response;
        } catch(e) {
            console.error(e.response.data);
        }
    }
    getBlocks = async (isMainnet) => {
        try {
            const blocksUrl = `${urlHandler.getApiUrl(isMainnet)}/blocks`;
            const response = await axios.get(blocksUrl);
            return response;
        } catch(e) {
            console.error(e.response.data);
        }
    }

    getSchedules = async (isMainnet) => {
        try {
            const schedulesUrl = `${urlHandler.getApiUrl(isMainnet)}/schedules`;
            const response = await axios.get(schedulesUrl);
            return response;
        } catch(e) {
            console.error(e.response.data);
        }
    }

    getBalances = async (isMainnet) => {
        try {
            const balancesUrl = `${urlHandler.getApiUrl(isMainnet)}/balances`;
            const response = await axios.get(balancesUrl);
            return response;
        } catch (e) {
            console.error(e.response.data);
        }
    }

    getCryptoTransfer = async (isMainnet) => {
        try {
            const balancesUrl = `${urlHandler.getApiUrl(isMainnet)}/transactions?transactionType=CRYPTOCREATEACCOUNT&limit=220`;
            const response = await axios.get(balancesUrl);
            return response;
        } catch (e) {
            console.error(e.response.data);
        }
    }

    getCustomQueryMainnet = async (getCustomQuery) => {
        try {
            const balancesUrl = `https://starter.arkhia.io/hedera/mainnet${getCustomQuery}`;
            const response = await axios.get(balancesUrl);
            return response;
        } catch (e) {
            console.error(e.response.data);
        }
    }

    getBlockSlow = async (isMainnet = true, usePublic = false) => {
        try {
            const baseUrl = urlHandler.getApiUrl(isMainnet, usePublic);
            const blockUrl =  `${baseUrl}/blocks?order=desc&limit=1`;
            const response = await axios.get(blockUrl);
            console.log(`Calling ${blockUrl};`)
            return response;
        } catch (e) {
            console.error(e);
        }
    }

    gettokenslow = async (isMainnet = true, usePublic = false, accountID) => {
        try {
            const baseUrl = urlHandler.getApiUrl(isMainnet, usePublic);
            const tokenUrl =  `${baseUrl}/accounts/${accountID}/tokens`;
            const response = await axios.get(tokenUrl);
            console.log(`Calling ${tokenUrl};`)
            return response;
        } catch (e) {
            console.error(e);
        }
    }

    getCryptoTransferSlow = async (isMainnet = true, usePublic = false) => {
        try {
            const baseUrl = urlHandler.getApiUrl(isMainnet, usePublic);
            const cryptoTransferUrl = `${baseUrl}/transactions?order=asc&transactiontype=cryptotransfer&limit=100&timestamp=gte%3A1678267183.900257309`;
            console.log(`Calling ${cryptoTransferUrl};`)
            const response = await axios.get(cryptoTransferUrl);
            return response;
        } catch (e) {
            console.error(e.response.data);
        }
    }
}

module.exports = Object.freeze(new RestApiHandler());
