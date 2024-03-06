console.clear();
require('dotenv').config({path: '.env'});
const subGraphHandler = require('../handlers/subgraph.handler')



const assertTransfers = async (isMainnet) => {
    const response = await subGraphHandler.getTransfers(isMainnet)
    expect(response.status).toBe(200);
    expect(response.data.data.transfers).toEqual(expect.any(Array));
}
const assertProperty = async (isMainnet) => {
    const response = await subGraphHandler.getTransfers(isMainnet)
    const parsed = (response.data.data.transfers[0]);
    expect(parsed).toHaveProperty('id')
    expect(parsed).toHaveProperty('sender')
    expect(parsed).toHaveProperty('amount')
}
describe('Subgraph API test', () => {

    test('Should have an array of data', async function () {
        return assertTransfers()
    });
    test('Should have transfer properties', async function () {
        return assertProperty()
    });



})
