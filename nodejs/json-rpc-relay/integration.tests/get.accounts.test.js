console.clear();

require('dotenv').config({path: '.env'});
const Web3 = require('web3');
const { ethers } = require("ethers");
const { curly } = require('node-libcurl')

const arkhiaJsonRpcRelayTestnet  = `${process.env.ARKHIA_TESTNET_URL}/${process.env.ARKHIA_API_KEY}`;
const httpHeaderJson = [
    'Content-Type: application/json',
    'Accept: application/json'
  ];
const communityHashioMainnet = process.env.COMMUNITY_MAINNET_URL;

const getAccountPayload = () => {
    const data = JSON.stringify({"jsonrpc":"2.0","method":"eth_accounts","params":[],"id":1});
    return data;
}

describe('[CURL] Get Accounts',  () => {

    test('Should get Account information from Hedera account through EVM Account address from Arhia Testnet', async () => {

        // Arrange
        const configAccountsPayload = getAccountPayload();

        // Act
        const { data } = await curly.post(arkhiaJsonRpcRelayTestnet, {
            postFields: configAccountsPayload,
            httpHeader: httpHeaderJson,
        });

        // Assert
        expect(data.jsonrpc).toBeDefined();
    });
});

