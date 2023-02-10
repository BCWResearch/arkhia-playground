require('dotenv').config({path: '.env'});

const arkhiaJsonRpcRelayTestnet  = `${process.env.ARKHIA_TESTNET_URL}/${process.env.ARKHIA_API_KEY}`;
const arkhiaJsonRpcRelayMainnet  = `${process.env.ARKHIA_MAINNET_URL}/${process.env.ARKHIA_API_KEY}`;
const communityHashioMainnet = process.env.COMMUNITY_MAINNET_URL;
const communityHashioTestnet = process.env.COMMUNITY_TESTNET_URL;

class UrlHandler {

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
}

module.exports = Object.freeze(new UrlHandler());
