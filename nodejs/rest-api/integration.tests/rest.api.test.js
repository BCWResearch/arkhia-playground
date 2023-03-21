console.clear();

require('dotenv').config({path: '.env'});

const {expect} = require('chai');
const restApiHandler = require('../handlers/rest.api.handler');
const testnetAccountId = process.env.TESTNET_ACCOUNT_ID;
const mainnetAccountId = process.env.MAINNET_ACCOUNT_ID;

const assertAccountId = async (accountId, isMainnet) => {
    const account = await restApiHandler.getAccountById(accountId, isMainnet);
    expect(account).to.have.property('status').equals(200);
    expect(account).to.have.property(`data`);

    const {data} = account;
    expect(data).to.have.property('account').equals(mainnetAccountId);
    expect(data).to.have.nested.property('balance.balance').to.be.a('number');
    expect(data).to.have.nested.property('balance.timestamp').to.be.a('string');
    expect(data).to.have.nested.property('balance.tokens').to.be.an('array');
    expect(data).to.have.property('auto_renew_period').to.be.a('number');
    expect(data).to.have.property('decline_reward').to.be.a('boolean');
}

const assertAccounts = async (isMainnet) => {
    const accounts = await restApiHandler.getAccounts(isMainnet);
    expect(accounts).to.have.property('status').equals(200);
    expect(accounts).to.have.property('data');

    //Testing for the properties of first account
    const firstAccount = accounts.data.accounts[0];
    expect(firstAccount).to.have.property('account').that.is.a('string');
    expect(firstAccount).to.have.property('auto_renew_period').that.is.a('number');
    expect(firstAccount.balance).to.have.property('timestamp').that.is.a('string');
    expect(firstAccount.balance).to.have.property('balance').that.is.a('number');
    expect(firstAccount).to.have.property('created_timestamp')
    expect(firstAccount).to.have.property('ethereum_nonce').that.is.a('number');
    expect(firstAccount).to.have.property('key').that.is.an('object');
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
    expect(firstContract).to.have.property('file_id').that.is.a('string');
    expect(firstContract).to.have.property('evm_address').that.is.a('string');
}

describe('Rest API Integration tests for Testnet', function () {

    it('should be able to get the account by id', async function () {
        assertAccountId(testnetAccountId, false);
    });

    it('should be able to access Testnet data when making an Account request to Testnet', async function () {
        const testnetAccount = await restApiHandler.getAccountById(testnetAccountId, false);
        expect(testnetAccount).to.have.property('status').equals(200);
        expect(testnetAccount).to.have.property(`data`);
        expect(testnetAccount.data.alias).to.be.a('string');
        expect(testnetAccount.data.alias).to.be.equal('CIQFAYG4VYRFAN4CR5CBORQALWGL5FNZCXGACO7W4W4N7EVJFXUNSYI');
    });

    it('should be able to get the contracts', async function () {
        assertContracts(false);
    });

    it('should be able to get the accounts', async function () {
        assertAccounts(false);
    });
});

describe('Rest API Integration tests for Mainnet', function () {

    it('should be able to get the account by id', async function () {
        assertAccountId(mainnetAccountId, true);
    });

    it('should be able to access Mainnet data when making an Account request to Mainnet', async function () {
        const mainnetAccount = await restApiHandler.getAccountById(mainnetAccountId, true);
        expect(mainnetAccount).to.have.property('status').equals(200);
        expect(mainnetAccount).to.have.property(`data`);
        expect(mainnetAccount.data.alias).to.be.null;
    });

    it('should be able to get the contracts', async function () {
        assertContracts(true);
    });

    it('should be able to get the accounts', async function () {
        assertAccounts(true);
    });

    it('should be able to get the tokens', async function () {
        const tokens = await restApiHandler.getTokens(true);
        expect(tokens).to.have.property('status').equals(200);
    });

    it('should be able to get the network nodes', async function () {
        const nodes = await restApiHandler.getNetworkNodes(true);
        expect(nodes).to.have.property('status').equals(200);
    });

});
