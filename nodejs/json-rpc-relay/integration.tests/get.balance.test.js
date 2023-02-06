console.clear();
const axios = require(`axios`);
require('dotenv').config({path: '.env'});
const Web3 = require('web3');
const { ethers } = require("ethers");

const arkhiaJsonRpcRelayMainnet = `${process.env.ARKHIA_MAINNET_URL}/${process.env.ARKHIA_API_KEY}`;
const arkhiaJsonRpcRelayTestnet  = `${process.env.ARKHIA_TESTNET_URL}/${process.env.ARKHIA_API_KEY}`;
const communityHashioMainnet = process.env.COMMUNITY_MAINNET_URL;
const testnetEvmAccount = "0x0000000000000000000000000000000000000589";

const getAccountPayload = () => {
    const data = JSON.stringify({
        "jsonrpc": "2.0",
        "method": "eth_getBalance",
        "params": [
            "0x0000000000000000000000000000000000000589"
        ],
        "id": 1
      });
    return data;
}

describe('[CURL] Accounts',  () => {

    // WIP
    test('Should get Balance from Hedera account through EVM Account address from Arhia Testnet', async () => {
        // Arrange
        const configAccounts = getAccountPayload();
        // Act
        //  const accountBalance = await axios.post(arkhiaJsonRpcRelayMainnet, configAccounts);
        // Assert
        // expect(accountBalance).toBeDefined();

    });
});

describe('[Web3] Accounts', () => {

    test('Should get Balance from Hedera account through EVM Account address from Arhia Testnet', async () => {
        // Arrange
        const web3Provider = new Web3(arkhiaJsonRpcRelayTestnet);

        // Act
        const balance = await web3Provider.eth.getBalance(testnetEvmAccount);

        // Assert
        expect(balance).toBeDefined();
        expect(Number(balance)).toBeGreaterThan(0);
    });
});

describe('[Ethers] Accounts', () => {

    test('Should get Balance from Hedera account through EVM Account address from Arhia Testnet', async () => {
        // Arrange
        const ethersProvider = new ethers.providers.JsonRpcProvider(arkhiaJsonRpcRelayTestnet);
        
        // Arrange
        const balance = await ethersProvider.getBalance(testnetEvmAccount);

        // Assert
        expect(balance).toBeDefined();
        expect(Number(balance)).toBeGreaterThan(0);
    });

});
