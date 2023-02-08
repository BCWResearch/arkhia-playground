console.clear();

require('dotenv').config({path: '.env'});

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
    
});
