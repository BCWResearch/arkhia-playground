console.clear();

require('dotenv').config({path: '.env'});
const Web3 = require('web3');
const { ethers } = require("ethers");
const urlHandler = require('../../../../handlers/url.handler');
const privateECDSAAccount = process.env.MAINNET_ECDSA_PRIVATE_KEY
const contractAbi = `[{"inputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"uint256","name":"_mobileNumber","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"string","name":"_name","type":"string"}],"name":"getMobileNumber","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"","type":"string"}],"name":"myDirectory","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"uint256","name":"_mobileNumber","type":"uint256"}],"name":"setMobileNumber","outputs":[],"stateMutability":"nonpayable","type":"function"}]`
const mainnetContractConfig = {
    id: `0.0.3746808`,
    sol_id: `0000000000000000000000000000000000392bf8`
}

describe('[Web3] Call Contract Method', () => {

    test('Mainnet | Should call contract Balance from Contract ', async () => {
        // Arrange
        const web3 = new Web3(urlHandler.getJsonRpcMainnet());
        const contractJson = await JSON.parse(contractAbi);
        const sampleContract =  new web3.eth.Contract(contractJson, mainnetContractConfig.sol_id);

        // Act
        let contractBalance = await sampleContract.methods.getContractBalance().call();

        // Assert
        console.log(``);
        expect(contractBalance).toBeDefined();
    });

    test('Mainnet | Should call metadata from Contract ', async () => {
        // Arrange
        const web3 = new Web3(urlHandler.getJsonRpcMainnet());
        const contractJson = await JSON.parse(contractAbi);
        const sampleContract =  new web3.eth.Contract(contractJson, mainnetContractConfig.sol_id);

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

    test('mainnet | Should call contract Balance from Contract', async () => {
        // Arrange
        const provider = new ethers.providers.JsonRpcProvider(urlHandler.getJsonRpcMainnet());
        const signer = new ethers.Wallet(privateECDSAAccount, provider);
        const sampleContract = new ethers.Contract(mainnetContractConfig.sol_id, contractAbi, signer)

        // Act
        let contractBalance = await sampleContract.getContractBalance();

        // Assert
        console.log(``);
        expect(contractBalance).toBeDefined();
    });

    test('Mainnet | Should call metadata from Contract', async () => {
        // Arrange
        const provider = new ethers.providers.JsonRpcProvider(urlHandler.getJsonRpcMainnet());
        const signer = new ethers.Wallet(privateECDSAAccount, provider);
        const sampleContract = new ethers.Contract(mainnetContractConfig.sol_id, contractAbi, signer)

        // Act
        let metadata = await sampleContract.getContractMetadata();

        // Assert
        console.log(``);
        expect(metadata).toBeDefined();
        expect(metadata.tokenSymbol).toEqual('ARKH');
        expect(metadata.tokenName).toEqual('Token');
    });
});
