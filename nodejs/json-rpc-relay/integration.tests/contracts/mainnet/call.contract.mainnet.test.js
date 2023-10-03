console.clear();

require('dotenv').config({ path: '.env' });
const Web3 = require('web3');
const { ethers } = require("ethers");
const urlHandler = require('../../../../handlers/url.handler');
const ERC20 = require('../artifact/erc20abi.json');
const privateECDSAAccount = process.env.MAINNET_OPERATOR_PRIVATE_EVM_KEY;
const contractAbi = `[{"inputs":[{"internalType":"string","name":"_creatorName","type":"string"},{"internalType":"string","name":"_tokenSymbol","type":"string"},{"internalType":"string","name":"_tokenName","type":"string"},{"internalType":"uint256","name":"_tokenSupply","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"},{"indexed":false,"internalType":"string","name":"name","type":"string"},{"indexed":false,"internalType":"string","name":"message","type":"string"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"FairTradeEvent","type":"event"},{"stateMutability":"payable","type":"fallback"},{"inputs":[],"name":"getContractBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getContractMetadata","outputs":[{"components":[{"internalType":"string","name":"creatorName","type":"string"},{"internalType":"string","name":"tokenSymbol","type":"string"},{"internalType":"string","name":"tokenName","type":"string"},{"internalType":"uint256","name":"tokenSupply","type":"uint256"},{"internalType":"address","name":"tokenAddress","type":"address"}],"internalType":"struct FairTradeCoffee.FairTradeMetadata","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getFairTradeBuyerNumbers","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getFairTradeBuyers","outputs":[{"components":[{"internalType":"address","name":"from","type":"address"},{"internalType":"uint256","name":"timestamp","type":"uint256"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"message","type":"string"},{"internalType":"uint256","name":"amount","type":"uint256"}],"internalType":"struct FairTradeCoffee.FairTradeBuyer[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTokenRemainingBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_message","type":"string"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"makeDonationHbars","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"mintFungibleToken","outputs":[{"internalType":"address","name":"createdTokenAddress","type":"address"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"withdrawDonations","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]`;

const mainnetContractConfig = {
    id: `0.0.2935861`,
    sol_id: `0x00000000000000000000000000000000002ccc35`
}

const mainnetUSDCContractConfig = {
    id: `0.0.456858`,
    sol_id: `0x000000000000000000000000000000000006f89a`
}

describe('[Web3] Call Contract Method', () => {

    test('Mainnet | Should call contract Balance from Contract ', async () => {
        // Arrange
        const web3 = new Web3(urlHandler.getJsonRpcMainnet());
        const contractJson = await JSON.parse(contractAbi);
        // const sampleContract =  new web3.eth.Contract(contractJson, mainnetContractConfig.sol_id);

            // Act
        let contractBalance =  await web3.eth.getBalance(mainnetContractConfig.sol_id); 
    
        // Assert
        console.log(`balacne?`);
        console.log(contractBalance);
        expect(contractBalance).toBeDefined();
        expect(Number(contractBalance)).toBeGreaterThanOrEqual(0);
    });
});

describe('[Ethers] Call Contract Method', () => {

    test('Mainnet | Should call contract Balance from Contract', async () => {
        // Arrange
        const provider = new ethers.providers.JsonRpcProvider(urlHandler.getJsonRpcMainnet());
        const signer = new ethers.Wallet(privateECDSAAccount, provider);
        const sampleContract = new ethers.Contract(mainnetContractConfig.sol_id, contractAbi, signer)

        // Act
        let contractBalance = await provider.getBalance(mainnetContractConfig.sol_id); 
        
        // Assert
        console.log(``);
        expect(contractBalance).toBeDefined(); 
        expect(Number(contractBalance)).toBeGreaterThanOrEqual(0);
    });

    test('Mainnet | Verify ETH_CALL_DEFAULT_TO_CONSENSUS_NODE = FALSE', async () => {
        // Arrange
        const provider = new ethers.providers.JsonRpcProvider(urlHandler.getJsonRpcMainnet());
        const signer = new ethers.Wallet(privateECDSAAccount, provider);
        const usdcContract = new ethers.Contract(mainnetUSDCContractConfig.sol_id, ERC20.abi, signer)

        const responseTime = [];

        // Act
        for (let i = 0; i < 5; i++) {
            const startTime = new Date().getTime();
            await usdcContract.name();
            const endTime = new Date().getTime();
            responseTime.push(endTime - startTime);
        }
        // Assert
        // sort response time from fastest to slowest and assert if median is under milliseconds
        const sortedResponseTime = responseTime.sort((a, b) => a - b);
        const medianResponseTime = sortedResponseTime[2];
        expect(medianResponseTime).toBeLessThan(1000);
    });

});

