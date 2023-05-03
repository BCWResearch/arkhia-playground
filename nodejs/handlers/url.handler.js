require('dotenv').config({path: '.env'});

// Suffix
const jsonRPCSuffix = 'json-rpc/v1';
const restAPISuffix = 'api/v1';
const graphqlSuffix = 'graphql/alpha';
const apiKey = process.env.ARKHIA_API_KEY;
const isHashio = process.env.ARKHIA_HASHIO;

// APIS
const restApiUrlMainnet  = `${process.env.ARKHIA_MAINNET_API_URL}/${restAPISuffix}`;
const restApiUrlTestnet  = `${process.env.ARKHIA_TESTNET_API_URL}/${restAPISuffix}`;

const jsonRpcRelayMainnet  = `${process.env.ARKHIA_MAINNET_API_URL}/${jsonRPCSuffix}/${apiKey}`;
const jsonRpcRelayTestnet  = `${process.env.ARKHIA_TESTNET_API_URL}/${jsonRPCSuffix}/${apiKey}`;

const watchtowerUrlMainnet = `${process.env.ARKHIA_MAINNET_WATCHTOWER}?api_key=${apiKey}`;
const watchtowerUrlTestnet = `${process.env.ARKHIA_TESTNET_WATCHTOWER}?api_key=${apiKey}`;

const graphQLUrlMainnet = `${process.env.ARKHIA_MAINNET_API_URL}/${graphqlSuffix}`
const graphQLUrlTestnet = `${process.env.ARKHIA_TESTNET_API_URL}/${graphqlSuffix}`

class UrlHandler {

    getApiUrl = (isMainnet) => {
        return isMainnet ? restApiUrlMainnet : restApiUrlTestnet;
    }

    getTestnetUrl = () => {
        return restApiUrlTestnet;
    }

    getMainnetUrl = () => {
        return restApiUrlMainnet;
    }

    getWatchtowerUrlMainnet = () => {
        return watchtowerUrlMainnet;
    }

    getWatchtowerUrlTestnet = () => {
        return watchtowerUrlTestnet;
    }

    getJsonRpcTestnet = () => {
        return isHashio ? 'https://testnet.hashio.io/api' : jsonRpcRelayTestnet;
    }

    getJsonRpcMainnet = () => {
        return isHashio ? 'https://mainnet.hashio.io/api' : jsonRpcRelayMainnet;
    }

    getGraphQLMainnetUrl  = () => {
        return graphQLUrlMainnet;
    }
    getGraphQLTestnetUrl  = () => {
        return graphQLUrlTestnet;
    }

    getOperatorPrivateKey = () => {
        return process.env.OPERATOR_PRIVATE_KEY;
    }
}

module.exports = Object.freeze(new UrlHandler());
