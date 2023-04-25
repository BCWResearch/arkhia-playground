console.clear();

require('dotenv').config({path: '.env'});

const {expect} = require('chai');
const restApiHandler = require('../handlers/rest.api.handler');
const testnetAccountId = process.env.TESTNET_ACCOUNT_ID;
const mainnetAccountId = process.env.MAINNET_ACCOUNT_ID;
const tokenId = `0.0.1475673`;

const assertTransactionsByAccountId = async (isMainnet) => {
    const transactionByAccountId = await restApiHandler.getTransactionByAccountId(testnetAccountId, false);
    expect(transactionByAccountId).to.have.property('status').equals(200);
    expect(transactionByAccountId).to.have.property(`data`);
    expect(transactionByAccountId.data.transactions).to.have.lengthOf.at.least(1);
    const transaction = transactionByAccountId.data.transactions[0];
    expect(transaction).to.have.property(`charged_tx_fee`);
    expect(transaction).to.have.property(`transaction_hash`);
    expect(transaction).to.have.property(`transaction_id`);
    expect(transaction).to.have.property(`valid_start_timestamp`);
}

const assertToken = async (isMainnet) => {
    const response = await restApiHandler.getTokenById(tokenId, false);
    expect(response).to.have.property('status').equals(200);
    expect(response).to.have.property(`data`);
    const token = response.data;
    expect(token).to.have.property(`symbol`);
    expect(token).to.have.property(`token_id`);
    expect(token).to.have.property(`type`);
    ;
    expect(token).to.have.nested.property('type').to.be.a('string');
    expect(token).to.have.nested.property('token_id').to.be.a('string');
}
const assertTokens = async (isMainnet) => {
    const tokens = await restApiHandler.getTokens(false);
    expect(tokens).to.have.property('status').equals(200);
    expect(tokens).to.have.property(`data`);
    expect(tokens.data.tokens).to.have.lengthOf.at.least(1);
    const token = tokens.data.tokens[0];
    expect(token).to.have.property(`symbol`);
    expect(token).to.have.property(`token_id`);
    expect(token).to.have.property(`type`);
    ;
    expect(token).to.have.nested.property('type').to.be.a('string');
    expect(token).to.have.nested.property('token_id').to.be.a('string');
}
const assertTransactions = async (isMainnet) => {
    const transactions = await restApiHandler.getTransactions(false);
    expect(transactions).to.have.property('status').equals(200);
    expect(transactions).to.have.property(`data`);
    expect(transactions.data.transactions).to.have.lengthOf.at.least(1);
    const transaction = transactions.data.transactions[0];
    expect(transaction).to.have.property(`charged_tx_fee`);
    expect(transaction).to.have.property(`transaction_hash`);
    expect(transaction).to.have.property(`transaction_id`);
    expect(transaction).to.have.property(`valid_start_timestamp`);
}

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
    expect(firstContract).to.have.property('file_id');
    expect(firstContract).to.have.property('evm_address').that.is.a('string');
}
const assertBlocks = async (isMainnet) => {
    const blocks = await restApiHandler.getBlocks(false);
    expect(blocks).to.have.property('status').equals(200);
    expect(blocks).to.be.an('object');
    const block = blocks.data.blocks[0]
    expect(block).to.have.property('count').to.be.a('number');
    expect(block).to.have.property('hapi_version').to.be.a('string');
    expect(block).to.have.property('hash').to.be.a('string');
    expect(block).to.have.property('name').to.be.a('string');
    expect(block).to.have.property('number').to.be.a('number');
    expect(block).to.have.property('previous_hash').to.be.a('string');
    expect(block).to.have.property('size').to.be.a('number');
    expect(block).to.have.property('timestamp').to.be.an('object');
    expect(block.timestamp).to.have.property('from').to.be.a('string');
    expect(block.timestamp).to.have.property('to').to.be.a('string');
    expect(block).to.have.property('gas_used').to.be.a('number');
    expect(block).to.have.property('logs_bloom').to.be.a('string');


}

const assertSchedules = async (isMainnet) => {
    const schedules = await restApiHandler.getSchedules(false);
    expect(schedules).to.have.property('status').equals(200);
    expect(schedules).to.be.an('object');

    const schedule = schedules.data.schedules[0]
    expect(schedule).to.have.property('creator_account_id').to.be.a('string');
    expect(schedule).to.have.property('payer_account_id').to.be.a('string');
    expect(schedule).to.have.property('transaction_body').to.be.a('string');
    expect(schedule).to.have.property('signatures').to.be.an('array');
    expect(schedule).to.have.property('wait_for_expiry').to.be.a('boolean');

}

const assertBalances = async (isMainnet) => {
    const balances = await restApiHandler.getbalances(false);
    expect(balances).to.have.property('status').equals(200);
    expect(balances).to.be.an('object');

    const balance = balances.data.balances[0]
    expect(balance).to.have.property('account').to.be.a('string');
    expect(balance).to.have.property('balance').to.be.a('number');
    expect(balance).to.have.property('tokens').to.be.an('array');

}


describe('Rest API Integration tests for Testnet', function () {

    it('should be able to get the account by id', async function () {
        return assertAccountId(testnetAccountId, false);
    });

    it('should be able to access Testnet data when making an Account request to Testnet', async function () {
        const testnetAccount = await restApiHandler.getAccountById(testnetAccountId, false);
        expect(testnetAccount).to.have.property('status').equals(200);
        expect(testnetAccount).to.have.property(`data`);
        expect(testnetAccount.data.alias).to.be.a('string');
        expect(testnetAccount.data.alias).to.be.equal('CIQFAYG4VYRFAN4CR5CBORQALWGL5FNZCXGACO7W4W4N7EVJFXUNSYI');
    });

    it('should be able to get the contracts', async function () {
        return assertContracts(false);
    });

    it('should be able to get the accounts', async function () {
        return assertAccounts(false);
    });

    it('should be able to get transactions', async function () {
        return assertTransactions(false);
    });

    it('should be able to get tokens', async function () {
        return assertTokens(false);
    });

    it('should be able to get token id', async function () {
        return assertToken(false);
    });

    it('should be able to get the transaction by id', async function () {
        return assertTransactionsByAccountId(false);
    });
    it('should be able to get list of blocks', async function () {
        return assertBlocks(false);
    });
    it('should be able to get list of Schedules', async function () {
        return assertSchedules(false);
    });
    it('should be able to get balances', async function () {
        return assertBalances(false);
    });

});

describe('Rest API Integration tests for Mainnet', function () {

    it('should be able to get the account by id', async function () {
        return assertAccountId(mainnetAccountId, true);
    });

    it('should be able to access Mainnet data when making an Account request to Mainnet', async function () {
        const mainnetAccount = await restApiHandler.getAccountById(mainnetAccountId, true);
        expect(mainnetAccount).to.have.property('status').equals(200);
        expect(mainnetAccount).to.have.property(`data`);
        expect(mainnetAccount.data.alias).to.be.null;
    });

    it('should be able to get the contracts', async function () {
        return assertContracts(true);
    });

    it('should be able to get the accounts', async function () {
        return assertAccounts(true);
    });

    it('should be able to get the tokens', async function () {
        const tokens = await restApiHandler.getTokens(true);
        expect(tokens).to.have.property('status').equals(200);
    });

    it('should be able to get the network nodes', async function () {
        const nodes = await restApiHandler.getNetworkNodes(true);
        expect(nodes).to.have.property('status').equals(200);
    });

    it('should be able to get transactions', async function () {
        return assertTransactions(true);
    });

    it('should be able to get tokens', async function () {
        return assertTokens(true);
    });

    it('should be able to get token id', async function () {
        return assertToken(true);
    });

    it('should be able to get the transaction by id', async function () {
        return assertTransactionsByAccountId(true);

    });
    it('should be able to get list of blocks', async function () {
        return assertBlocks(true);
    });
    it('should be able to get list of Schedules', async function () {
        return assertSchedules(true);
    });

    it('should be able to get balances', async function () {
        return assertBalances(true);
    });


});
