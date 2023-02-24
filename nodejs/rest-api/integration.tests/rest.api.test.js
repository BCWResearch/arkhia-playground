console.clear();

require('dotenv').config({path: '.env'});

const {expect} = require('chai');
const restApiHandler = require('../handlers/rest.api.handler');

describe('Rest API integration.tests', function () {

    it('should be able to get the account by id', async function () {
        const account = await restApiHandler.getAccountById(process.env.OPERATOR_ID)
        expect(account).to.have.property('status').equals(200);

        //Testing for account properties
        const {data} = account
        expect(data).to.have.property('account').equals(process.env.OPERATOR_ID);
        expect(data).to.have.nested.property('balance.balance').to.be.a('number');
        expect(data).to.have.nested.property('balance.timestamp').to.be.a('string');
        expect(data).to.have.nested.property('balance.tokens').to.be.an('array');
        expect(data).to.have.property('auto_renew_period').to.be.a('number');
        expect(data).to.have.property('decline_reward').to.be.a('boolean');


    });

    it('should be able to get the contracts', async function () {
        const contracts = await restApiHandler.getContracts();
        expect(contracts).to.have.property('status').equals(200);
        expect(contracts).to.have.property('data');
        expect(contracts.data).to.have.property('contracts');
        expect(contracts.data.contracts).to.be.an('array');
        expect(contracts.data.contracts).to.have.lengthOf.at.least(1)

        //Testing fot the properties on the first contract

        const firstContract = contracts.data.contracts[0];
        expect(firstContract).to.have.property('contract_id').that.is.a('string');
        expect(firstContract).to.have.property('created_timestamp').that.is.a('string');
        expect(firstContract).to.have.property('expiration_timestamp').that.is.a('string');
        expect(firstContract).to.have.property('file_id').that.is.a('string');
        expect(firstContract).to.have.property('evm_address').that.is.a('string');
    });

    it('should be able to get the accounts', async function () {
        const accounts = await restApiHandler.getAccounts();
        expect(accounts).to.have.property('status').equals(200);
        expect(accounts).to.have.property('data')


        //Testing for the properties of first account

        const firstAccount = accounts.data.accounts[0];
        expect(firstAccount).to.have.property('account').that.is.a('string');
        expect(firstAccount).to.have.property('auto_renew_period').that.is.a('number');
        expect(firstAccount.balance).to.have.property('timestamp').that.is.a('string');
        expect(firstAccount.balance).to.have.property('balance').that.is.a('number');
        expect(firstAccount).to.have.property('created_timestamp')
        expect(firstAccount).to.have.property('ethereum_nonce').that.is.a('number');
        expect(firstAccount).to.have.property('key').that.is.an('object');
    });

    it('should be able to get the tokens', async function () {
        const tokens = await restApiHandler.getTokens();
        expect(tokens).to.have.property('status').equals(200);
    });

    it('should be able to get the network nodes', async function () {
        const nodes = await restApiHandler.getNetworkNodes();
        expect(nodes).to.have.property('status').equals(200);
    });

});
