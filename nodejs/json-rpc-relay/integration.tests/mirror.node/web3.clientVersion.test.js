console.clear();

require('dotenv').config({path: '.env'});
const Web3 = require('web3');
const { curly } = require('node-libcurl');
const { ethers } = require("ethers");

const httpHeaderJson = [
    'Content-Type: application/json',
    'Accept: application/json'
  ];
const arkhiaJsonRpcRelayTestnet  = `${process.env.ARKHIA_TESTNET_URL}/${process.env.ARKHIA_API_KEY}`;
const arkhiaJsonRpcRelayMainnet  = `${process.env.ARKHIA_MAINNET_URL}/${process.env.ARKHIA_API_KEY}`;
const communityHashioMainnet = process.env.COMMUNITY_MAINNET_URL;
const communityHashioTestnet = process.env.COMMUNITY_TESTNET_URL;

const getPayload = () => {
    const data = {
        "jsonrpc": "2.0",
        "method": "web3_clientVersion",
        "params": [],
        "id": 0
      };
    return data;
}

describe('[CURL] ClientVersion', () => {

    test('Should get relay version from Arhia Testnet', async () => {
        // Arrange
        const configPayload = getPayload();

        // Act
        const { data } = await curly.post(arkhiaJsonRpcRelayTestnet, {
            postFields: JSON.stringify(configPayload),
            httpHeader: httpHeaderJson,
        });

        // Assert
        expect(data?.result).toBeDefined();
        expect(data?.result).toBe("relay/0.17.1");
    });

    test('Should get relay version from Arhia Mainnet', async () => {
        // Arrange
        const configPayload = getPayload();

        // Act
        const { data } = await curly.post(arkhiaJsonRpcRelayMainnet, {
            postFields: JSON.stringify(configPayload),
            httpHeader: httpHeaderJson,
        });

        // Assert
        expect(data?.result).toBeDefined();
        expect(data?.result).toBe("relay/0.17.1");
    });

    test('Should get relay version from Hashio Testnet', async () => {
        // Arrange
        const configPayload = getPayload();

        // Act
        const { data } = await curly.post(communityHashioTestnet, {
            postFields: JSON.stringify(configPayload),
            httpHeader: httpHeaderJson,
        });

        // Assert
        expect(data?.result).toBeDefined();
        expect(data?.result).toBe("relay/0.17.1");
    });

    test('Should get relay version from Hashio Mainnet', async () => {
        // Arrange
        const configPayload = getPayload();

        // Act
        const { data } = await curly.post(communityHashioMainnet, {
            postFields: JSON.stringify(configPayload),
            httpHeader: httpHeaderJson,
        });

        // Assert
        expect(data?.result).toBeDefined();
        expect(data?.result).toBe("relay/0.17.1");
    });
});

describe('[Web3] ClientVersion', () => {
    test('Should get clientVersion from Arhia Testnet', async () => {
        // Arrange
        const web3Provider = new Web3(arkhiaJsonRpcRelayTestnet);

        // Act
        const result = await web3Provider.eth.getNodeInfo();

        // Assert
        expect(result).toBeDefined();
        expect(result).toBe("relay/0.17.1");
    });

    test('Should get clientVersion from Arhia Mainnet', async () => {
        // Arrange
        const web3Provider = new Web3(arkhiaJsonRpcRelayMainnet);

        // Act
        const result = await web3Provider.eth.getNodeInfo();

        // Assert
        expect(result).toBeDefined();
        expect(result).toBe("relay/0.17.1");
    });

    test('Should get clientVersion from Hashio Testnet', async () => {
        // Arrange
        const web3Provider = new Web3(communityHashioTestnet);

        // Act
        const result = await web3Provider.eth.getNodeInfo();

        // Assert
        expect(result).toBeDefined();
        expect(result).toBe("relay/0.17.1");
    });

    test('Should get clientVersion from Hashio Mainnet', async () => {
        // Arrange
        const web3Provider = new Web3(communityHashioMainnet);

        // Act
        const result = await web3Provider.eth.getNodeInfo();

        // Assert
        expect(result).toBeDefined();
        expect(result).toBe("relay/0.17.1");
    });
});

describe('[Ethers] ClientVersion', () => {

    test('Should get clientVersion from Hedera from Arhia Testnet', async () => {
        // Arrange
        const ethersProvider = new ethers.providers.JsonRpcProvider(arkhiaJsonRpcRelayTestnet);
        
        // Arrange
        const result = await ethersProvider.send("web3_clientVersion", []);

        // Assert
        expect(result).toBeDefined();
        expect(result).toBe("relay/0.17.1");
    });

    test('Should get clientVersion from Hedera from Arhia Mainnet', async () => {
        // Arrange
        const ethersProvider = new ethers.providers.JsonRpcProvider(arkhiaJsonRpcRelayMainnet);
        
        // Arrange
        const result = await ethersProvider.send("web3_clientVersion", []);

        // Assert
        expect(result).toBeDefined();
        expect(result).toBe("relay/0.17.1");
    });

    test('Should get clientVersion from Hedera from Arhia Mainnet', async () => {
        // Arrange
        const ethersProvider = new ethers.providers.JsonRpcProvider(communityHashioTestnet);
        
        // Arrange
        const result = await ethersProvider.send("web3_clientVersion", []);

        // Assert
        expect(result).toBeDefined();
        expect(result).toBe("relay/0.17.1");
    });

    test('Should get clientVersion from Hedera from Arhia Mainnet', async () => {
        // Arrange
        const ethersProvider = new ethers.providers.JsonRpcProvider(communityHashioMainnet);
        
        // Arrange
        const result = await ethersProvider.send("web3_clientVersion", []);

        // Assert
        expect(result).toBeDefined();
        expect(result).toBe("relay/0.17.1");
    });
});
