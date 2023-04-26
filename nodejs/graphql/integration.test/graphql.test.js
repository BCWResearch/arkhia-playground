console.clear();
require('dotenv').config({path: '.env'});
const {expect} = require('chai');
const graphQlHandler = require('../handlers/graphql.handler');


const assertAccount = async () => {
    const response = await graphQlHandler.fetchData()
    expect(response).to.have.property('data');
    expect(response.data).to.have.property('account');
    expect(response.data.account).to.have.property('balance');
    expect(response.data.account).to.have.property('entityId');
    expect(response.data.account).to.have.property('key');
    expect(response.data.account).to.have.property('stakePeriodStart');
    expect(response.data.account).to.have.property('timestamp');
    expect(response.data.account).to.have.property('type');
    expect(response.data.account.balance).to.be.a('number');
    expect(response.data.account.entityId).to.be.an('object');
    expect(response.data.account.key).to.be.an('object');
    expect(response.data.account.stakePeriodStart).to.be.a('string');
    expect(response.data.account.timestamp).to.be.an('object');
    expect(response.data.account.type).to.be.a('string');

}

const assertAccountID = async () => {
    const response = await graphQlHandler.fetchData()
    expect(response.data.account).to.have.property('id').that.is.not.null;
    expect(response.data.account).to.have.property('type').that.is.not.null;

}
describe('GraphQL API test', () => {

    it('Should have a data object with an account property', async function () {
        return assertAccount()
    });

    it('Should have an account with a non-null ID and type', async function () {
        return assertAccountID()
    });

})


