require('dotenv').config();

const axios = require('axios');
const urlHandler = require('../handlers/url.handler');

// Arkhia config
const apiKey = process.env.ARKHIA_API_KEY;

class ArkhiaWalletHandler {

    getCheckWalletCost = async (query = "SELECT max(block_timestamp) from aptos-data-pdp.crypto_aptos_mainnet_us.blocks") => {
        try {
            const arkhiaWalletUrl = `${urlHandler.getArkhiaWalletURL()}/check-cost`;
            const data = { query: query };
            const headers = {
                'Content-Type': 'application/json'
            };
            const response = await axios.post(arkhiaWalletUrl, data, { headers });
            return response;
        } catch (e) {
            console.error('Error in getCheckWalletCost:', e.response?.data || e.message);
            throw e;
        }
    }

    executeBigQuery = async (query = "SELECT max(block_timestamp) from aptos-data-pdp.crypto_aptos_mainnet_us.blocks") => {
        try {
            const arkhiaWalletUrl = `${urlHandler.getArkhiaWalletURL()}/execute`;
            const data = { query: query };
            const headers = {
                'Content-Type': 'application/json'
            };
            const response = await axios.post(arkhiaWalletUrl, data, { headers });
            return response;
        } catch (e) {
            console.error('Error in executeBigQuery:', e.response?.data || e.message);
            throw e;
        }
    }

}


module.exports = Object.freeze(new ArkhiaWalletHandler());
