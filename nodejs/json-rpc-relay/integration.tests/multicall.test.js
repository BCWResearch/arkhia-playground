console.clear();

require('dotenv').config({path: '.env'});

const { ethers } = require("ethers");
const ABI = require('./../samples/multicall/multicall.abi');
const urlHandler = require('../../handlers/url.handler');
const arkhiaJsonRpcRelayMainnet = urlHandler.getJsonRpcMainnet();
const arkhiaJsonRpcRelayTestnet  = urlHandler.getJsonRpcTestnet();

const getMainnetContractFromEthers = (_jsonRpcProvider) => {
    const jsonRpcProvider = new ethers.providers.JsonRpcProvider(urlHandler.getJsonRpcMainnet());
    const mainnetContractAddress = "0x00000000000000000000000000000000001a89ac";
    const mainnetPrivateKey = "6d3ecf59765d194ca6da047d605d6a1062b0a00e190b83cecb2158d5a510b8dd";

    const signer = new ethers.Wallet(mainnetPrivateKey, jsonRpcProvider)
    const contract = new ethers.Contract(mainnetContractAddress, ABI, signer);
    return contract;
}

describe('Curl: Multicall Aggregation: Json-RPC Relay', () => {
    test('No integration.tests available', async () => {
       expect(true);
    });
});

describe('Web3: Multicall Aggregation: Json-RPC Relay', () => {
    test('No integration.tests available', async () => {
        expect(true);
     });
});

describe('Ethers: Multicall Aggregation: Json-RPC Relay', () => {

    beforeAll(() => {

        console.log(`Preparing contract...`);
    });

    beforeEach (() => {

    });

    test('Should have a valid contract from Mainnet', async () => {
         // Arrange
         console.log(`Getting contract from ${arkhiaJsonRpcRelayMainnet}...`);

         // Act
         const contractInstance = await getMainnetContractFromEthers(arkhiaJsonRpcRelayMainnet);

         // Asset
         expect(contractInstance).toBeDefined();
    });


    test('Should have a valid contract from Testnet', async () => {
        // Arrange
        console.log(`Getting contract from ${arkhiaJsonRpcRelayTestnet}...`);

        // Act
        const contractInstance = await getMainnetContractFromEthers(arkhiaJsonRpcRelayTestnet);

        // Asset
        expect(contractInstance).toBeDefined();
   });

});
