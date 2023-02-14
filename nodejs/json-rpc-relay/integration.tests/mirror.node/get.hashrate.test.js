console.clear();

require('dotenv').config({path: '.env'});
const Web3 = require('web3');
const { curly } = require('node-libcurl')

const httpHeaderJson = [
    'Content-Type: application/json',
    'Accept: application/json'
  ];
const arkhiaJsonRpcRelayTestnet = `${process.env.ARKHIA_TESTNET_URL}/${process.env.ARKHIA_API_KEY}`;
const arkhiaJsonRpcRelayMainnet = `${process.env.ARKHIA_MAINNET_URL}/${process.env.ARKHIA_API_KEY}`;
const communityHashioTestnet = process.env.COMMUNITY_TESTNET_URL;
const communityHashioMainnet = process.env.COMMUNITY_MAINNET_URL;

const getPayload = () => {
    const data = {
        "jsonrpc": "2.0",
        "method": "eth_hashrate",
        "params": [],
        "id": 0
      };
    return data;
}

describe('[CURL] Hashrate', () => {

    test('Should get 0x0 from Arkhia Testnet', async () => {
        // Arrange
        const configPayload = getPayload();

        // Act
        const { data } = await curly.post(arkhiaJsonRpcRelayTestnet, {
            postFields: JSON.stringify(configPayload),
            httpHeader: httpHeaderJson,
        });

        // Assert
        expect(data).toBeDefined();
        expect(data?.result).toEqual("0x0");
    });

    test('Should get 0x0 from Arkhia Mainnet', async () => {
        // Arrange
        const configPayload = getPayload();

        // Act
        const { data } = await curly.post(arkhiaJsonRpcRelayMainnet, {
            postFields: JSON.stringify(configPayload),
            httpHeader: httpHeaderJson,
        });

        // Assert
        expect(data).toBeDefined();
        expect(data?.result).toEqual("0x0");
    });

    test('Should get 0x0 from Hashio Testnet', async () => {
        // Arrange
        const configPayload = getPayload();

        // Act
        const { data } = await curly.post(communityHashioTestnet, {
            postFields: JSON.stringify(configPayload),
            httpHeader: httpHeaderJson,
        });

        // Assert
        expect(data).toBeDefined();
        expect(data?.result).toEqual("0x0");
    });

    test('Should get 0x0 from Hashio Mainnet', async () => {
        // Arrange
        const configPayload = getPayload();

        // Act
        const { data } = await curly.post(communityHashioMainnet, {
            postFields: JSON.stringify(configPayload),
            httpHeader: httpHeaderJson,
        });

        // Assert
        expect(data).toBeDefined();
        expect(data?.result).toEqual("0x0");
    });
});

describe('[Web3] Hashrate', () => {

    test('Should get 0 hashrate from Arkhia Testnet', async () => {
        // Arrange
        const web3Provider = new Web3(arkhiaJsonRpcRelayTestnet);

        // Act
        const hashrate = await web3Provider.eth.getHashrate();

        // Assert
        expect(hashrate).toBeDefined();
        expect(Number(hashrate)).toEqual(0);
    });

    test('Should get 0 hashrate from Arkhia Mainnet', async () => {
        // Arrange
        const web3Provider = new Web3(arkhiaJsonRpcRelayMainnet);

        // Act
        const hashrate = await web3Provider.eth.getHashrate();

        // Assert
        expect(hashrate).toBeDefined();
        expect(Number(hashrate)).toEqual(0);
    });

    test('Should get 0 hashrate from Hashio Testnet', async () => {
        // Arrange
        const web3Provider = new Web3(communityHashioTestnet);

        // Act
        const hashrate = await web3Provider.eth.getHashrate();

        // Assert
        expect(hashrate).toBeDefined();
        expect(Number(hashrate)).toEqual(0);
    });

    test('Should get 0 hashrate from Hashio Mainnet', async () => {
        // Arrange
        const web3Provider = new Web3(communityHashioMainnet);

        // Act
        const hashrate = await web3Provider.eth.getHashrate();

        // Assert
        expect(hashrate).toBeDefined();
        expect(Number(hashrate)).toEqual(0);
    });
});
