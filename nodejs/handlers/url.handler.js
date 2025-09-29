require('dotenv').config({path: '.env'});

// Suffix
const jsonRPCSuffix = 'json-rpc/v1';
const restAPISuffix = 'api/v1';
const graphqlSuffix = 'graphql/alpha';
const subgraphSuffix = 'subgraph/v1'
const arkhiaWalletSuffix = 'gcp/bigquery';
const apiKey = process.env.ARKHIA_API_KEY;
const isHashio = process.env.ARKHIA_HASHIO === true ? true : false;

// APIS
const restApiUrlMainnet  = `${process.env.ARKHIA_MAINNET_API_URL}/${apiKey}/${restAPISuffix}`;
const restApiUrlTestnet  = `${process.env.ARKHIA_TESTNET_API_URL}/${apiKey}/${restAPISuffix}`;

const jsonRpcRelayMainnet  = `${process.env.ARKHIA_MAINNET_API_URL}/${jsonRPCSuffix}/${apiKey}`;
const jsonRpcRelayTestnet  = `${process.env.ARKHIA_TESTNET_API_URL}/${jsonRPCSuffix}/${apiKey}`;

const polygonJsonRpcMainnet  = `${process.env.POLYGON_MAINNET_API_URL}/${jsonRPCSuffix}/${apiKey}`;
const polygonJsonRpcMumbai  = `${process.env.POLYGON_MUMBAI_API_URL}/${jsonRPCSuffix}/${apiKey}`;

const watchtowerUrlMainnet = `${process.env.ARKHIA_MAINNET_WATCHTOWER}?api_key=${apiKey}`;
const watchtowerUrlTestnet = `${process.env.ARKHIA_TESTNET_WATCHTOWER}?api_key=${apiKey}`;

const graphQLUrlMainnet = `${process.env.ARKHIA_MAINNET_API_URL}/${graphqlSuffix}`;
const graphQLUrlTestnet = `${process.env.ARKHIA_TESTNET_API_URL}/${graphqlSuffix}`;

const subgraphUrlMainnet = `${process.env.ARKHIA_MAINNET_API_URL}/${subgraphSuffix}`;
const subgraphUrlTestnet = `${process.env.ARKHIA_TESTNET_API_URL}/${subgraphSuffix}`;

const accountHistoryMainnet = `${process.env.MAINNET_ACCOUNT_HISTORY_ID ?? ``}`;
const accountHistoryTestnet = `${process.env.TESTNET_ACCOUNT_HISTORY_ID ?? ``}`;

const arkhiaWalletURL = `${process.env.ARKHIA_MAINNET_API_URL}/${arkhiaWalletSuffix}/${apiKey}`;

const arkhiaApi = `${process.env.ARKHIA_API_URL}`;


class UrlHandler {

    getApiUrl = (isMainnet, isPublic = false) => {
        if (isPublic) {
            return isMainnet ? `https://mainnet-public.mirrornode.hedera.com/api/v1` :
            `https://testnet.mirrornode.hedera.com/api/v1`;
        }

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

    getPolygonMumbaiTestnet = () => {
        return polygonJsonRpcMumbai;
    }

    getPolygonMainnet = () => {
        return polygonJsonRpcMainnet;
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

    getAccountKeyMainnet = () => {
        return accountHistoryMainnet;
    }

    getAccountKeyTestnet = () => {
        return graphQLUrlTestnet;
    }

    getArkhiaApiUrl = () => {
        return arkhiaApi;
    }
    getSubgraphURL= (isMainnet)=>{
        return isMainnet? subgraphUrlTestnet: subgraphUrlMainnet
    }
    getArkhiaWalletURL = () => {
        const baseUrl = process.env.ARKHIA_MAINNET_API_URL.replace('/hedera/mainnet', '');
        return `${baseUrl}/${arkhiaWalletSuffix}/${apiKey}`;
    }
}

module.exports = Object.freeze(new UrlHandler());
