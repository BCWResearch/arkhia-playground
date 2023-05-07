console.clear();

require('dotenv').config({path: '.env'});
const Web3 = require('web3');
const {expect} = require('chai');
const restApiHandler = require('../handlers/rest.api.handler');
const testnetAccountId = process.env.TESTNET_ACCOUNT_ID;
const mainnetAccountId = process.env.MAINNET_ACCOUNT_ID;
const tokenId = `0.0.1475673`;
const { ethers } = require("ethers");
const testnetContract = {
    id: `0.0.3373111`,
    evm_id: `0x0000000000000000000000000000000000337837`
}
const urlHandler = require('../../handlers/url.handler');
const privateECDSAAccount = `0x8eaecc9af6db21e7bc66032d9891563e68e2930ac2a09da6c5872a92a3790203`;
const contractAbi = `[{"inputs":[{"internalType":"string","name":"_creatorName","type":"string"},{"internalType":"string","name":"_tokenSymbol","type":"string"},{"internalType":"string","name":"_tokenName","type":"string"},{"internalType":"uint256","name":"_tokenSupply","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"},{"indexed":false,"internalType":"string","name":"name","type":"string"},{"indexed":false,"internalType":"string","name":"message","type":"string"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"FairTradeEvent","type":"event"},{"stateMutability":"payable","type":"fallback"},{"inputs":[],"name":"getContractBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getContractMetadata","outputs":[{"components":[{"internalType":"string","name":"creatorName","type":"string"},{"internalType":"string","name":"tokenSymbol","type":"string"},{"internalType":"string","name":"tokenName","type":"string"},{"internalType":"uint256","name":"tokenSupply","type":"uint256"},{"internalType":"address","name":"tokenAddress","type":"address"}],"internalType":"struct FairTradeCoffee.FairTradeMetadata","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getFairTradeBuyerNumbers","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getFairTradeBuyers","outputs":[{"components":[{"internalType":"address","name":"from","type":"address"},{"internalType":"uint256","name":"timestamp","type":"uint256"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"message","type":"string"},{"internalType":"uint256","name":"amount","type":"uint256"}],"internalType":"struct FairTradeCoffee.FairTradeBuyer[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTokenRemainingBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_message","type":"string"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"makeDonationHbars","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"mintFungibleToken","outputs":[{"internalType":"address","name":"createdTokenAddress","type":"address"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"withdrawDonations","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]`;


const assertContracts = async (isMainnet) => {
    const contracts = await restApiHandler.getContracts(isMainnet);
    expect(contracts).to.have.property('status').equals(200);
    expect(contracts).to.have.property('data');
    expect(contracts.data).to.have.property('contracts');
    expect(contracts.data.contracts).to.be.an('array');
    expect(contracts.data.contracts).to.have.lengthOf.at.least(1)

    //Testing for the properties on the first contract

    const firstContract = contracts.data.contracts[0];
    expect(firstContract).to.have.property('contract_id').that.is.a('string');
    expect(firstContract).to.have.property('created_timestamp').that.is.a('string');
    expect(firstContract).to.have.property('expiration_timestamp').that.is.a('string');
    expect(firstContract).to.have.property('file_id');
    expect(firstContract).to.have.property('evm_address').that.is.a('string');
}


const assertContractById = async (isMainnet) => {
    const contractResponse = await restApiHandler.getContractById(testnetContract.id ,isMainnet);
    const contract = contractResponse.data;
    expect(contract).to.have.property('contract_id').that.is.a('string');
    expect(contract).to.have.property('created_timestamp').that.is.a('string');
    expect(contract).to.have.property('expiration_timestamp').that.is.a('string');
    expect(contract).to.have.property('file_id');
    expect(contract).to.have.property('evm_address').that.is.a('string');
}

const assertContractResultsById = async (isMainnet) => {
    const contractResponse = await restApiHandler.getContractResultsById(testnetContract.id ,isMainnet);
    const contract = contractResponse.data;
    expect(contract).to.have.property('results');
}

const assertContractResultLogsById = async (isMainnet) => {
    const contractResponse = await restApiHandler.getContractResultLogsById(testnetContract.id ,isMainnet);
    const contract = contractResponse.data;
    expect(contract).to.have.property('logs');
}


const assertContractEvmCalls = async (isMainnet) => {
    // Arrange.
    const provider = new ethers.providers.JsonRpcProvider(urlHandler.getJsonRpcTestnet());   
    let callAbi = [ "function getContractMetadata()" ];
    let dataCall = new ethers.utils.Interface(callAbi);

    const payload = {
        block: "latest",
        data: dataCall,
        estimate: false,
        from: privateECDSAAccount,
        gas: 120000000,
        gasPrice: 100000000,
        to: testnetContract.evm_id,
        value: 0
    };

    // Act.
    const contractResponse = await restApiHandler.getContractEvmCall(payload ,isMainnet);
    
    // Assert.
    expect(contractResponse).toBeDefined();
}



describe('Testnet | Rest API Integration tests ', function () {

    it('should be able to get the contracts', async function () {
        return assertContracts(false);
    });
  
    it('should be able to get a contract by Id', async function () {
        return assertContractById(false);
    });

    it('should be able to get contract results by Id', async function () {
        return assertContractResultsById(false);
    });

    it('should be able to get contract log results by Id', async function () {
        return assertContractResultLogsById(false);
    });
 
    it('should be able to get a contract call', async function () {
        return assertContractEvmCalls(false);
    });
   
});
