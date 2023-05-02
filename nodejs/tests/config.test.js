require('dotenv').config({path: '.env'});
const urlHandler = require('../handlers/url.handler');

console.clear();

describe('Config variables', () => {
    test('Should load API Key', async () => {
        expect(process.env.ARKHIA_API_KEY).toBeDefined();
    });

    test('Should load Hashio var', async () => {
        expect(process.env.ARKHIA_HASHIO).toBeDefined();
    });

    test('Should get Arkhia Mainnet base URL', async () => {
        expect(process.env.ARKHIA_MAINNET_API_URL).toBeDefined();
    });

    test('Should get Arkhia Tesnet base URL', async () => {
        expect(process.env.ARKHIA_TESTNET_API_URL).toBeDefined();
    });

    test('Should load API Key with 32 chars', async () => {
        expect(process.env.ARKHIA_API_KEY.length).toEqual(32);
    });

    test('Should load Testnet Account ID', async () => {
        expect(process.env.TESTNET_ACCOUNT_ID).toBeDefined();
    });

    test('Should load  Testnet Account EVM ID', async () => {
        expect(process.env.TESTNET_ACCOUNT_ID_EVM).toBeDefined();
    });

    test('Should get Mainnet Account Id', async () => {
        expect(process.env.MAINNET_ACCOUNT_ID).toBeDefined();
    });

    test('Should get Mainnet Evm Account Id', async () => {
        expect(process.env.MAINNET_ACCOUNT_ID_EVM).toBeDefined();
    });

    test('Should load Mainnet Watchtower URL', async () => {
        expect(process.env.ARKHIA_MAINNET_WATCHTOWER).toBeDefined();
    });

    test('Should load Testnet Watchtower URL', async () => {
        expect(process.env.ARKHIA_TESTNET_WATCHTOWER).toBeDefined();
    });

    test('Should get Testnet Topic Id', async () => {
        expect(process.env.TESTNET_TOPIC_ID).toBeDefined();
    });

    test('Should get Mainnet Topic Id', async () => {
        expect(process.env.MAINNET_TOPIC_ID).toBeDefined();
    });

    test('Should get Url graphQL URL Testnet', async () => {
        expect(urlHandler.getGraphQLTestnetUrl()).toBeDefined();
        expect(urlHandler.getGraphQLTestnetUrl()).toContain(`graphql/alpha`);
    });
    
    test('Should get Url graphQL URL Mainnet', async () => {
        expect(urlHandler.getGraphQLMainnetUrl()).toBeDefined();
        expect(urlHandler.getGraphQLMainnetUrl()).toContain(`graphql/alpha`);
    });

});



