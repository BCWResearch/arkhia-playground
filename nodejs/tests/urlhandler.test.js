require('dotenv').config({path: '.env'});
const urlHandler = require('../handlers/url.handler');

console.clear();

describe('Url Handler', () => {

    test('Should get Url API Mainnet', async () => {
        expect(urlHandler.getMainnetUrl()).toBeDefined();
        expect(urlHandler.getMainnetUrl()).toContain(`hedera/mainnet/api/v1`);
    });

    test('Should get Url API Testnet', async () => {
        expect(urlHandler.getTestnetUrl()).toBeDefined();
        expect(urlHandler.getTestnetUrl()).toContain(`hedera/testnet/api/v1`);
    });

    test('Should get Url JSON-RPC relay Mainnet', async () => {
        expect(urlHandler.getJsonRpcMainnet()).toBeDefined();
        expect(urlHandler.getJsonRpcMainnet()).toContain(`hedera/mainnet/json-rpc/v1`);
    });

    test('Should get Url JSON-RPC relay Testnet', async () => {
        expect(urlHandler.getJsonRpcTestnet()).toBeDefined();
        expect(urlHandler.getJsonRpcTestnet()).toContain(`hedera/testnet/json-rpc/v1`);
    });

    test('Should get Url Watchtower URL Mainnet', async () => {
        expect(urlHandler.getWatchtowerUrlMainnet()).toBeDefined();
        expect(urlHandler.getWatchtowerUrlMainnet()).toContain(`watchtowerws.mainnet`);
    });

    test('Should get Url Watchtower URL Testnet', async () => {
        expect(urlHandler.getWatchtowerUrlTestnet()).toBeDefined();
        expect(urlHandler.getWatchtowerUrlTestnet()).toContain(`watchtowerws.testnet`);
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



