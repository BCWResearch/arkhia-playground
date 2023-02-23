require('dotenv').config({path: '.env'});

const arkhiaJsonRpcRelayTestnet  = `${process.env.ARKHIA_TESTNET_URL}/${process.env.ARKHIA_API_KEY}`;
const arkhiaJsonRpcRelayMainnet  = `${process.env.ARKHIA_MAINNET_URL}/${process.env.ARKHIA_API_KEY}`;
const communityHashioMainnet = process.env.COMMUNITY_MAINNET_URL;
const communityHashioTestnet = process.env.COMMUNITY_TESTNET_URL;

const watchtowerUrlMainnet = `${process.env.ARKHIA_MAINNET_WATCHTOWER}?api_key=${process.env.ARKHIA_API_KEY}`;
const watchtowerUrlTestnet = `${process.env.ARKHIA_TESTNET_WATCHTOWER}?api_key=${process.env.ARKHIA_API_KEY}`;

class UrlHandler {

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
}

module.exports = Object.freeze(new UrlHandler());
