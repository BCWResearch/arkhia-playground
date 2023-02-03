console.clear();

require('dotenv').config({path: '.env'});

const multiCallAggregate = require('./../json-rpc-relay/multicall-aggregate-example/multicallAggregate');

describe('MulticallAggregate Arkhia Prod', () => {
    expect(process.env.ARKHIA_API_KEY).toBeDefined();
    test('getMultiCallData: Call Arkhia Testnet', async () => {
        const data = await multiCallAggregate.getMultiCallData(`https://hedera.testnet.arkhia.io/json-rpc/v1/${process.env.ARKHIA_API_KEY}`);
        expect(data).toHaveProperty('data');
    });

    test('getMultiCallData: Call Arkhia Mainnet', async () => {
        const data = await multiCallAggregate.getMultiCallData(`https://hedera.mainnet.arkhia.io/json-rpc/v1/${process.env.ARKHIA_API_KEY}`);
        expect(data).toHaveProperty('data');
    });
});

describe('MulticallAggregate Hashio', () => {
    test('getMultiCallData: Call Hashio Testnet', async () => {
        const data = await multiCallAggregate.getMultiCallData('https://testnet.hashio.io/api');
        expect(data).toHaveProperty('data');
    });

    test('getMultiCallData: Call Hashio Mainnet', async () => {
        const data = await multiCallAggregate.getMultiCallData('https://mainnet.hashio.io/api');
        expect(data).toHaveProperty('data');
    });
});
