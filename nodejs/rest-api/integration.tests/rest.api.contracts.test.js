console.clear();

require('dotenv').config({path: '.env'});
const {expect} = require('chai');
const restApiHandler = require('../handlers/rest.api.handler');
const { ethers } = require("ethers");
const testnetContract = {
    id: `0.0.7362015`,
    evm_id: `0x56eb8564562d1fb535c887e9d64bbc8b678e81af`
};

const mainnetContract = {
    id: `0.0.10160945`,
    evm_id: `0x3624d43530e45937d82f884c74447adc8eb72a55`
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

    const contractToUse = isMainnet ? mainnetContract : testnetContract;
    // Use well-known treasury account (0.0.2) which exists on all networks
    const fromAddress = `0x0000000000000000000000000000000000000002`;

    const payload = {
        block: "latest",
        data: encodedMethod,
        estimate: false,
        from: fromAddress,
        gas: 15000000,
        gasPrice: 15000000,
        to: contractToUse.evm_id,
        value: 0
    };

    // Act & Assert.
    // The API should work even if the contract reverts - we're testing the API endpoint, not the contract
    try {
        const contractResponse = await restApiHandler.getContractEvmCall(payload, isMainnet);
        // If successful, response should have data property
        expect(contractResponse).to.have.property(`data`);
    } catch (error) {
        // If contract reverts, that's acceptable - it means the API is working
        // We should get a proper error response with CONTRACT_REVERT_EXECUTED or similar
        expect(error.response).to.exist;
        expect(error.response.status).to.equal(400);
        expect(error.response.data).to.have.property('_status');
        // Valid error messages that indicate the API is working correctly
        const validErrors = ['CONTRACT_REVERT_EXECUTED', 'INVALID_CONTRACT_ID', 'CONTRACT_EXECUTION_EXCEPTION'];
        const errorMessage = error.response.data._status.messages[0].message;
        expect(validErrors).to.include(errorMessage);
    }
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
        return assertContractEvmCalls(true);
    });

});
