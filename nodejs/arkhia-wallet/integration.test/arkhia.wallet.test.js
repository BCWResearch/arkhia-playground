console.clear();

require('dotenv').config({path: '.env'});

const {expect} = require('chai');
const arkhiaWalletHandler = require('../arkhia.wallet.handler');

const testQuery = "SELECT max(block_timestamp) from aptos-data-pdp.crypto_aptos_mainnet_us.blocks";
const customQuery = "SELECT count(*) as total_blocks from aptos-data-pdp.crypto_aptos_mainnet_us.blocks LIMIT 1";

const assertCheckCost = async (query) => {
    const response = await arkhiaWalletHandler.getCheckWalletCost(query);
    expect(response).to.have.property('status').equals(200);
    expect(response).to.have.property('data');
    expect(response.data).to.be.an('object');

    // Check for expected cost response properties (API returns 'query_cost')
    expect(response.data).to.have.property('query_cost');
    expect(response.data.query_cost).to.be.a('string');
    expect(parseFloat(response.data.query_cost)).to.be.at.least(0);

    console.log(`Query cost: ${response.data.query_cost}`);
    return response;
}

const assertExecuteBigQuery = async (query) => {
    const response = await arkhiaWalletHandler.executeBigQuery(query);
    expect(response).to.have.property('status').equals(200);
    expect(response).to.have.property('data');
    expect(response.data).to.be.an('object');

    // Check for expected execution response properties
    expect(response.data).to.have.property('results');
    expect(response.data.results).to.be.an('array');

    if (response.data.results.length > 0) {
        const firstResult = response.data.results[0];
        expect(firstResult).to.be.an('array');
        console.log('Query execution result:', firstResult);
    }

    return response;
}

describe('Arkhia Wallet Integration Tests', function () {
    this.timeout(30000);

    describe('Arkhia wallet Check Cost Endpoint', function () {
        it('should be able to check cost for default query', async function () {
            return assertCheckCost();
        });

        it('should be able to check cost for custom query', async function () {
            return assertCheckCost(customQuery);
        });

        it('should handle query with proper response format', async function () {
            const response = await arkhiaWalletHandler.getCheckWalletCost(testQuery);
            expect(response.status).to.equal(200);
            expect(response.data).to.have.property('query_cost');
            expect(typeof response.data.query_cost).to.equal('string');
        });
    });

    describe('Arkhia wallet Execute Endpoint', function () {
        it('should be able to execute default query', async function () {
            return assertExecuteBigQuery();
        });

        it('should be able to execute custom query', async function () {
            return assertExecuteBigQuery(customQuery);
        });

        it('should handle query execution with proper response format', async function () {
            const response = await arkhiaWalletHandler.executeBigQuery(testQuery);
            expect(response.status).to.equal(200);
            expect(response.data).to.have.property('results');
            expect(Array.isArray(response.data.results)).to.be.true;
        });

        it('should return valid timestamp data for max block_timestamp query', async function () {
            const response = await arkhiaWalletHandler.executeBigQuery(testQuery);
            expect(response.status).to.equal(200);

            if (response.data.results && response.data.results.length > 0) {
                const result = response.data.results[0];
                expect(result).to.be.an('array');
                expect(result.length).to.be.greaterThan(0);
                expect(result[0]).to.be.a('string');
            }
        });
    });

    describe('Error Handling', function () {
        it('should handle invalid query gracefully for check-cost', async function () {
            try {
                await arkhiaWalletHandler.getCheckWalletCost('INVALID SQL QUERY');
            } catch (error) {
                expect(error).to.be.instanceOf(Error);
            }
        });

        it('should handle invalid query gracefully for execute', async function () {
            try {
                await arkhiaWalletHandler.executeBigQuery('INVALID SQL QUERY');
            } catch (error) {
                expect(error).to.be.instanceOf(Error);

            }
        });
    });
});
