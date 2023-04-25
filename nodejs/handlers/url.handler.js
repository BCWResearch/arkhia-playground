require('dotenv').config({path: '.env'});
const jsonRPCSuffix = 'json-rpc/v1';
const restAPISuffix = 'api/v1';
const graphqlSuffix = 'graphql/alpha';
const arkhiaJsonRpcRelayTestnet  = `${process.env.ARKHIA_TESTNET_URL}/${jsonRPCSuffix}/${process.env.ARKHIA_API_KEY}`;
const arkhiaJsonRpcRelayMainnet  = `${process.env.ARKHIA_MAINNET_URL}/${jsonRPCSuffix}/${process.env.ARKHIA_API_KEY}`;
const baseMainnetApiUrl = `${process.env.ARKHIA_MAINNET_URL}/${restAPISuffix}`;
const baseTestnetApiUrl = `${process.env.ARKHIA_TESTNET_URL}/${restAPISuffix}`;

const communityHashioMainnet = process.env.COMMUNITY_MAINNET_URL;
const communityHashioTestnet = process.env.COMMUNITY_TESTNET_URL;

const watchtowerUrlMainnet = `${process.env.ARKHIA_MAINNET_WATCHTOWER}?api_key=${process.env.ARKHIA_API_KEY}`;
const watchtowerUrlTestnet = `${process.env.ARKHIA_TESTNET_WATCHTOWER}?api_key=${process.env.ARKHIA_API_KEY}`;

const graphQLUrlMainnet = `${process.env.ARKHIA_MAINNET_URL}/${graphqlSuffix}`
const graphQLUrlTestnet = `${process.env.ARKHIA_TESTNET_URL}/${graphqlSuffix}`

class UrlHandler {

    getApiUrl = (isMainnet) => {
        return isMainnet ? baseMainnetApiUrl : baseTestnetApiUrl;
    }
    getTestnetUrl = () => {
        return baseTestnetApiUrl;
    }
    getMainnetUrl = () => {
        return baseMainnetApiUrl;
    }

    getWatchtowerUrlMainnet = () => {
        return watchtowerUrlMainnet;
    }

    getWatchtowerUrlTestnet = () => {
        return watchtowerUrlTestnet;
    }

    getJsonRpcTestnet = () => {
        return arkhiaJsonRpcRelayTestnet;
    }

    getJsonRpcMainnet = () => {
        return arkhiaJsonRpcRelayMainnet;
    }

    getCommunityServiceMainnet = () => {
        return communityHashioMainnet;
    }

    getCommunityServiceTestnet = () => {
        return communityHashioTestnet;
    }

    getOperatorPrivateKey = () => {
        return process.env.OPERATOR_PRIVATE_KEY;
    }
    getGraphQLMainnetUrl  = () => {
        return graphQLUrlMainnet
    }
    getGraphQLTestnetUrl  = () => {
        return graphQLUrlTestnet
    }
}

module.exports = Object.freeze(new UrlHandler());
