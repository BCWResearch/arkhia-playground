console.clear();

require('dotenv').config({path: '.env'});

const { ethers } = require("ethers");
const ABI = require('./../samples/multicall/multicall.abi');
const arkhiaJsonRpcRelayMainnet = `${process.env.ARKHIA_MAINNET_URL}/${process.env.ARKHIA_API_KEY}`;
const arkhiaJsonRpcRelayTestnet  = `${process.env.ARKHIA_TESTNET_URL}/${process.env.ARKHIA_API_KEY}`;

const getMainnetContractFromEthers = (_jsonRpcProvider) => {
    const jsonRpcProvider = new ethers.providers.JsonRpcProvider(_jsonRpcProvider);
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

    test('Should have a valid contract from Arkhia Mainnet', async () => {
         // Arrange
         console.log(`Getting contract from ${arkhiaJsonRpcRelayMainnet}...`);

         // Act
         const contractInstance = await getMainnetContractFromEthers(arkhiaJsonRpcRelayMainnet);

         // Asset
         expect(contractInstance).toBeDefined();
    });


    test('Should have a valid contract from Arkhia Testnet', async () => {
        // Arrange
        console.log(`Getting contract from ${arkhiaJsonRpcRelayTestnet}...`);

        // Act
        const contractInstance = await getMainnetContractFromEthers(arkhiaJsonRpcRelayTestnet);

        // Asset
        expect(contractInstance).toBeDefined();
   });

    test('Should call successfully multicall on Arkhia Mainnet', async () => {
        // Arrange
        const multiCallData = require('./../samples/multicall/data');
        const contractInstance = getMainnetContractFromEthers(arkhiaJsonRpcRelayMainnet);

        // Act
        const transaction = await contractInstance.aggregate(
            multiCallData.map((item) => ([item.address, item.callData]))
        );

        // Assert
        expect(transaction).toBeDefined();
        expect(transaction).toHaveProperty('data');
    });

    test('Should call successfully multicall on Community Mainnet', async () => {
        // Arrange
        const multiCallData = require('./../samples/multicall/data');
        const contractInstance = getMainnetContractFromEthers(process.env.COMMUNITY_MAINNET_URL);

        // Act
        const transaction = await contractInstance.aggregate(
            multiCallData.map((item) => ([item.address, item.callData]))
        );

        // Assert
        expect(transaction).toBeDefined();
        expect(transaction).toHaveProperty('data');
    });

});
