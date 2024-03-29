console.clear();

require('dotenv').config({path: '.env'});
const Web3 = require('web3');
const { ethers } = require("ethers");
const urlHandler = require('../../../../handlers/url.handler');

const contractAbi = `[{"inputs":[{"internalType":"string","name":"_creatorName","type":"string"},{"internalType":"string","name":"_tokenSymbol","type":"string"},{"internalType":"string","name":"_tokenName","type":"string"},{"internalType":"uint256","name":"_tokenSupply","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"},{"indexed":false,"internalType":"string","name":"name","type":"string"},{"indexed":false,"internalType":"string","name":"message","type":"string"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"FairTradeEvent","type":"event"},{"stateMutability":"payable","type":"fallback"},{"inputs":[],"name":"getContractBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getContractMetadata","outputs":[{"components":[{"internalType":"string","name":"creatorName","type":"string"},{"internalType":"string","name":"tokenSymbol","type":"string"},{"internalType":"string","name":"tokenName","type":"string"},{"internalType":"uint256","name":"tokenSupply","type":"uint256"},{"internalType":"address","name":"tokenAddress","type":"address"}],"internalType":"struct FairTradeCoffee.FairTradeMetadata","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getFairTradeBuyerNumbers","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getFairTradeBuyers","outputs":[{"components":[{"internalType":"address","name":"from","type":"address"},{"internalType":"uint256","name":"timestamp","type":"uint256"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"message","type":"string"},{"internalType":"uint256","name":"amount","type":"uint256"}],"internalType":"struct FairTradeCoffee.FairTradeBuyer[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTokenRemainingBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_message","type":"string"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"makeDonationHbars","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"mintFungibleToken","outputs":[{"internalType":"address","name":"createdTokenAddress","type":"address"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"withdrawDonations","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]`;

const testnetContractConfig = {
    id: `0.0.1194516`,
    sol_id: `0x943eE4fe771C01388a78717C173080e173cf70c4`
}

describe('[Web3] Call Contract Method', () => {

    test('Testnet | Should call contract Balance from Contract ', async () => {
        // Arrange
        const web3 = new Web3(urlHandler.getJsonRpcTestnet());
        const contractJson = await JSON.parse(contractAbi);
        const sampleContract =  new web3.eth.Contract(contractJson, testnetContractConfig.sol_id);

        // Act
        let contractBalance = await sampleContract.methods.getContractBalance().call();

        // Assert
        console.log(``);
        expect(contractBalance).toBeDefined();
    });

    test('Testnet | Should call metadata from Contract ', async () => {
        // Arrange
        const web3 = new Web3(urlHandler.getJsonRpcTestnet());
        const contractJson = await JSON.parse(contractAbi);
        const sampleContract =  new web3.eth.Contract(contractJson, testnetContractConfig.sol_id);

        // Act
        let metadata = await sampleContract.methods.getContractMetadata().call();

        // Assert
        console.log(``);
        expect(metadata).toBeDefined();
        expect(metadata.tokenSymbol).toEqual('ARKH');
        expect(metadata.tokenName).toEqual('Token');
    });

});

describe('[Ethers] Call Contract Method', () => {

    test('Testnet | Should call contract Balance from Contract', async () => {
        // Arrange
        const privateECDSAAccount = `0xbc5daad36686fd629a93ae8bcd1a833d93df62eaaa307f5ffa69a592ff44b360`;
        const provider = new ethers.providers.JsonRpcProvider(urlHandler.getJsonRpcTestnet());
        const signer = new ethers.Wallet(privateECDSAAccount, provider);
        const sampleContract = new ethers.Contract(testnetContractConfig.sol_id, contractAbi, signer)

        // Act
        let contractBalance = await sampleContract.getContractBalance();

        // Assert
        console.log(``);
        expect(contractBalance).toBeDefined();
    });

    test('Testnet | Should call metadata from Contract', async () => {
        // Arrange
        const privateECDSAAccount = `0xbc5daad36686fd629a93ae8bcd1a833d93df62eaaa307f5ffa69a592ff44b360`;
        const provider = new ethers.providers.JsonRpcProvider(urlHandler.getJsonRpcTestnet());
        const signer = new ethers.Wallet(privateECDSAAccount, provider);
        const sampleContract = new ethers.Contract(testnetContractConfig.sol_id, contractAbi, signer)

        // Act
        let metadata = await sampleContract.getContractMetadata();

        // Assert
        console.log(``);
        expect(metadata).toBeDefined();
        expect(metadata.tokenSymbol).toEqual('ARKH');
        expect(metadata.tokenName).toEqual('Token');
    });
});
