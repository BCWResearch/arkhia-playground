console.clear();
require('dotenv').config({path: '.env'});
const {expect} = require('chai');
const graphQlHandler = require('../handlers/graphql.handler');


describe('Account response', () => {

    it('should have the correct account number', async () => {
        const response = await graphQlHandler.getData()
        expect(response.data.account.entityId.num).to.equal(98);
    });

    it('should have a non-null balance', async () => {
        const response = await graphQlHandler.getData()
        expect(response.data.account.balance).to.not.be.null;
    });
})


