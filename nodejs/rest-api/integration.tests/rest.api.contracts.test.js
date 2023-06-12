console.clear();

require('dotenv').config({path: '.env'});
const {expect} = require('chai');
const restApiHandler = require('../handlers/rest.api.handler');
const { ethers } = require("ethers");
const testnetContract = {
    id: `0.0.4627387`,
    evm_id: `0000000000000000000000000000000000469bbb`
};

const mainnetContract = {
    id: `0.0.2958097`,
    evm_id: `0x86ecca95fecdb515d068975b75eac4357d6e86c5`
}

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
    const contractId = isMainnet ? mainnetContract.id : testnetContract.id;
    const contractResponse = await restApiHandler.getContractById(contractId ,isMainnet);
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
    const contractAbiJson = require('./abi.json');
    let dataCall = new ethers.utils.Interface(contractAbiJson);
    const encodedMethod = dataCall.encodeFunctionData("getContractMetadata");

    const payload = {
        block: "latest",
        data: encodedMethod,
        estimate: false,
        from: `0x052ad55b7aeaadc7964e4ee58a313b0c574ec1c7`,
        gas: 15000000,
        gasPrice: 15000000,
        to: testnetContract.evm_id,
        value: 0
    };

    // Act.
    const contractResponse = await restApiHandler.getContractEvmCall(payload, isMainnet);

    // Assert.
    expect(contractResponse).to.have.property(`data`);
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
 
    it('should be able to get a contract call (HIP-584)', async function () {
        return assertContractEvmCalls(false);
    });
   
});


describe('Mainnet | Rest API Integration tests ', function () {

    it('should be able to get the contracts', async function () {
        return assertContracts(true);
    });
  
    it('should be able to get a contract by Id', async function () {
        return assertContractById(true);
    });

    it('should be able to get contract results by Id', async function () {
        return assertContractResultsById(true);
    });

    it('should be able to get contract log results by Id', async function () {
        return assertContractResultLogsById(true);
    });
 
    it('should be able to get a contract call (HIP-584)', async function () {
        return assertContractEvmCalls(false);
    });
   
});
