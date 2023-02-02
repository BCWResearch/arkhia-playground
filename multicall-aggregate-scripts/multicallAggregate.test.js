const multiCallAggregate = require('./multicallAggregate');

describe('MulticallAggregate Arkhia Prod', () => { 
    if (process.env.ARKHIA_TESTNET_KEY) {
        test('getMultiCallData: Call Prod Testnet', async () => {
            const data = await multiCallAggregate.getMultiCallData(`https://hedera.testnet.arkhia.io/json-rpc/v1/${process.env.ARKHIA_TESTNET_KEY}`);
            expect(data).toHaveProperty('data');
        });
    }

    if (process.env.ARKHIA_MAINNET_KEY) {
        test('getMutliCallData: Call Prod Mainnet', async () => {
            const data = await multiCallAggregate.getMultiCallData(`https://hedera.testnet.arkhia.io/json-rpc/v1/${process.env.ARKHIA_MAINNET_KEY}`);
            expect(data).toHaveProperty('data');
        });
    }
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