require('dotenv').config({path: '.env'});
const urlHandler = require('../handlers/url.handler');

console.clear();

describe('Config variables', () => {
    test('Should load API Key', async () => {
        expect(process.env.ARKHIA_API_KEY).toBeDefined();
    });

    test('Should load API Key with 32 chars', async () => {
        expect(process.env.ARKHIA_API_KEY.length).toEqual(32);
    });

    test('Should load Arkhia Json-Rpc mainnet URL', async () => {
        expect(process.env.ARKHIA_MAINNET_URL).toBeDefined();
    });

    test('Should load Arkhia Json-Rpc testnet URL', async () => {
        expect(process.env.ARKHIA_TESTNET_URL).toBeDefined();
    });

    test('Should load Community Json-Rpc testnet URL', async () => {
        expect(process.env.COMMUNITY_TESTNET_URL).toBeDefined();
    });

    test('Should load Community Json-Rpc mainnet URL', async () => {
        expect(process.env.COMMUNITY_MAINNET_URL).toBeDefined();
    });

    test('Should load Testnet Account ID', async () => {
        expect(process.env.TESTNET_ACCOUNT_ID).toBeDefined();
    });

    test('Should load  Testnet Account EVM ID', async () => {
        expect(process.env.TESTNET_ACCOUNT_ID_EVM).toBeDefined();
    });

    test('Should get Url JSON-RPC relay Mainnet', async () => {
        expect(urlHandler.getJsonRpcMainnet()).toBeDefined();
        expect(urlHandler.getJsonRpcMainnet()).toContain(`hedera.mainnet`);
    });

    test('Should get Url JSON-RPC relay Testnet', async () => {
        expect(urlHandler.getJsonRpcTestnet()).toBeDefined();
        expect(urlHandler.getJsonRpcTestnet()).toContain(`hedera.testnet`);
    });

    test('Should get Url JSON-RPC relay Hashio Community Testnet', async () => {
        expect(urlHandler.getCommunityServiceTestnet()).toBeDefined();
        expect(urlHandler.getCommunityServiceTestnet()).toContain(`testnet.hashio`);
    });
    
    test('Should get Url JSON-RPC relay Hashio Community Mainnet', async () => {
        expect(urlHandler.getCommunityServiceMainnet()).toBeDefined();
        expect(urlHandler.getCommunityServiceMainnet()).toContain(`mainnet.hashio`);
    });

    test('Should load Mainnet Watchtower URL', async () => {
        expect(process.env.ARKHIA_MAINNET_WATCHTOWER).toBeDefined();
    });

    test('Should load Testnet Watchtower URL', async () => {
        expect(process.env.ARKHIA_TESTNET_WATCHTOWER).toBeDefined();
    });

    test('Should get Url Watchtower URL Mainnet', async () => {
        expect(urlHandler.getWatchtowerUrlMainnet()).toBeDefined();
        expect(urlHandler.getWatchtowerUrlMainnet()).toContain(`watchtowerws.mainnet`);
    });

    test('Should get Url Watchtower URL Testnet', async () => {
        expect(urlHandler.getWatchtowerUrlTestnet()).toBeDefined();
        expect(urlHandler.getWatchtowerUrlTestnet()).toContain(`watchtowerws.testnet`);
    });

    test('Should get Testnet Topic Id', async () => {
        expect(process.env.TESTNET_TOPIC_ID).toBeDefined();
    });

    test('Should get Mainnet Topic Id', async () => {
        expect(process.env.MAINNET_TOPIC_ID).toBeDefined();
    });
});
