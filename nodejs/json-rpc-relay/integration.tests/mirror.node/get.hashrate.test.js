console.clear();
const axios = require(`axios`);
require('dotenv').config({path: '.env'});
const Web3 = require('web3');
const { ethers } = require("ethers");

const arkhiaJsonRpcRelayMainnet = `${process.env.ARKHIA_MAINNET_URL}/${process.env.ARKHIA_API_KEY}`;
const arkhiaJsonRpcRelayTestnet  = `${process.env.ARKHIA_TESTNET_URL}/${process.env.ARKHIA_API_KEY}`;
const communityHashioMainnet = process.env.COMMUNITY_MAINNET_URL;

const hashratePayload = () => {
    const data = {
        "jsonrpc": "2.0",
        "method": "eth_hashrate",
        "params": [],
        "id": 0
      };
    return data;
}

describe('[CURL] Hashrate', () => {

    test('Should get 0x0 from Hedera account through EVM Account address from Arhia Testnet', async () => {
        // Arrange
        const configHashratePayload = hashratePayload();

        // Act
        const result = await axios.post(arkhiaJsonRpcRelayTestnet, configHashratePayload);

        // Assert
        expect(result).toBeDefined();

    });
});

describe('[Web3] Hashrate', () => {

    test('Should get 0 hashrate from Arhia Testnet', async () => {
        // Arrange
        const web3Provider = new Web3(arkhiaJsonRpcRelayTestnet);

        // Act
        const hashrate = await web3Provider.eth.getHashrate();

        // Assert
        expect(hashrate).toBeDefined();
        expect(Number(hashrate)).toEqual(0);
    });
});

// describe('[Ethers] Hashrate', () => {

//     test('Should get Hashrate from Hedera from Arhia Testnet', async () => {
//         // Arrange
//         const ethersProvider = new ethers.providers.JsonRpcProvider(arkhiaJsonRpcRelayTestnet);
        
//         // Arrange
//         const balance = await ethersProvider.getHashrate();

//         // Assert
//         expect(balance).toBeDefined();
//         // expect(Number(balance)).toBeGreaterThan(0);
//     });
// });
