console.clear();

require('dotenv').config({path: '.env'});
const {expect} = require('chai');
const restApiHandler = require('../handlers/rest.api.handler');
const { ethers } = require("ethers");
const testnetContract = {
    id: `0.0.4627387`,
    evm_id: `0000000000000000000000000000000000469bbb`
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
    const contractAbiJson = require('./abi.json');
    let dataCall = new ethers.utils.Interface(contractAbiJson);
    const encodedMethod = dataCall.encodeFunctionData("getContractMetadata");

    const payload = {
        block: "latest",
        data: encodedMethod,
        estimate: false,
        from: `0x052ad55b7aeaadc7964e4ee58a313b0c574ec1c7`,
        gas: 120000000,
        gasPrice: 100000000,
        to: testnetContract.evm_id,
        value: 0
    };

    // Act.
    const contractResponse = await restApiHandler.getContractEvmCall(payload, isMainnet);
    console.log(`contract response`);
    console.log(contractResponse);
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
 
 
    it('should be able to get a contract call', async function () {
        return assertContractEvmCalls(false);
    });
   
});
