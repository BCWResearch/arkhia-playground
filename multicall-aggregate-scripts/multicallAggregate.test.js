const multiCallAggregate = require('./multicallAggregate');

describe('MulticallAggregate Arkhia Prod', () => {
    expect(process.env.ARKHIA_KEY).toBeDefined();
    test('getMultiCallData: Call Arkhia Testnet', async () => {
        const data = await multiCallAggregate.getMultiCallData(`https://hedera.testnet.arkhia.io/json-rpc/v1/${process.env.ARKHIA_KEY}`);
        expect(data).toHaveProperty('data');
    });

    test('getMutliCallData: Call Arkhia Mainnet', async () => {
        const data = await multiCallAggregate.getMultiCallData(`https://hedera.mainnet.arkhia.io/json-rpc/v1/${process.env.ARKHIA_KEY}`);
        expect(data).toHaveProperty('data');
    });
});

describe('MulticallAggregate Hashio', () => {
    test('getMultiCallData: Call Hashio Testnet', async () => {
        const data = await multiCallAggregate.getMultiCallData('https://testnet.hashio.io/api');
        expect(data).toHaveProperty('data');
    });

    test('getMutliCallData: Call Hashio Mainnet', async () => {
        const data = await multiCallAggregate.getMultiCallData('https://mainnet.hashio.io/api');
        expect(data).toHaveProperty('data');
    });
});