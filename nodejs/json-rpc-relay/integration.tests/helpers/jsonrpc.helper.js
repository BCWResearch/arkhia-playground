const axios = require('axios');

/**
 * Common JSON-RPC headers configuration
 */
const jsonRpcHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
};

/**
 * Common axios config for JSON-RPC requests
 */
const jsonRpcConfig = {
    headers: jsonRpcHeaders
};

/**
 * Make a JSON-RPC request with common headers
 * @param {string} url - The JSON-RPC endpoint URL
 * @param {object} payload - The JSON-RPC payload
 * @returns {Promise} Axios response promise
 */
const makeJsonRpcRequest = async (url, payload) => {
    return await axios.post(url, payload, jsonRpcConfig);
};

module.exports = {
    jsonRpcHeaders,
    jsonRpcConfig,
    makeJsonRpcRequest
};
