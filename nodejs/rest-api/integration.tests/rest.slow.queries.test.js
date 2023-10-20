console.clear();

require('dotenv').config({path: '.env'});

const {expect} = require('chai');
const restApiHandler = require('../handlers/rest.api.handler');
const burst = 30;
//TODO: Move these variables to ENV file
const mainnetAccountID = '0.0.1716145'
const testnetAccountID  = '0.0.4520099'

describe('Rest API Block Queries test', function () {

    beforeAll(() => {

    });

    it('Arkhia | Mainnet | Get Blocks Limit 1 ', async function () {
        for ( let i =0; i< burst; i++ ) {
            const result = await restApiHandler.getBlockSlow(true, false);
            expect(result.data).to.have.property(`blocks`);
        }
    });

    it('Public | Mainnet | Get Blocks Limit 1 ', async function () {
        for ( let i =0; i< burst; i++ ) {
            const result = await restApiHandler.getBlockSlow(true, true);
            expect(result.data).to.have.property(`blocks`);
        }
    });

    it('Arkhia | Testnet | Get Blocks Limit 1 ', async function () {
        for ( let i =0; i< burst; i++ ) {
            const result = await restApiHandler.getBlockSlow(false, false);
            expect(result.data).to.have.property(`blocks`);
        }
    });

    it('Public | Testnet | Get Blocks Limit 1 ', async function () {
        for ( let i =0; i< burst; i++ ) {
            const result = await restApiHandler.getBlockSlow(false, true);
            expect(result.data).to.have.property(`blocks`);
        }
    });
});

describe('Rest API CryptoTransfer Slow Queries test', function () {

    beforeAll(() => {

    });

    it('Arkhia | Mainnet | Get Crypto Transfer ', async function () {
        for ( let i =0; i< burst; i++ ) {
            const result = await restApiHandler.getCryptoTransferSlow();
            expect(result).to.have.property(`data`);
        }
    });

    it('Public | Mainnet | Get Crypto Transfer ', async function () {
        for ( let i =0; i< burst; i++ ) {
            const result = await restApiHandler.getCryptoTransferSlow(true, true);
            expect(result).to.have.property(`data`);
        }
    });

    it('Arkhia | Testnet | Get Crypto Transfer ', async function () {
        for ( let i =0; i< burst; i++ ) {
            const result = await restApiHandler.getCryptoTransferSlow(false, false);
            expect(result).to.have.property(`data`);
        }
    });

    it('Public | Testnet | Get Crypto Transfer ', async function () {
        for ( let i =0; i< burst; i++ ) {
            const result = await restApiHandler.getCryptoTransferSlow(false, true);
            expect(result).to.have.property(`data`);
        }
    });
});

describe('Rest API Account token queries test', function () {

    beforeAll(() => {

    });

    it('Arkhia | Mainnet | Get tokens for account  ', async function () {
        for ( let i =0; i< burst; i++ ) {
            const result = await restApiHandler.gettokenslow(true, false, mainnetAccountID);
            expect(result.data).to.have.property(`tokens`);
        }
    });

    it('Public | Mainnet | Get tokens for account', async function () {
        for ( let i =0; i< burst; i++ ) {
            const result = await restApiHandler.gettokenslow(true, true, mainnetAccountID);
            expect(result.data).to.have.property(`tokens`);
        }
    });

    it('Arkhia | Testnet | Get token for account', async function () {
        for ( let i =0; i< burst; i++ ) {
            const result = await restApiHandler.gettokenslow(false, false, testnetAccountID);
            expect(result.data).to.have.property(`tokens`);
        }
    });

    it('Public | Testnet | Get tokens for account', async function () {
        for ( let i =0; i< burst; i++ ) {
            const result = await restApiHandler.gettokenslow(false, true, testnetAccountID);
            expect(result.data).to.have.property(`tokens`);
        }
    });
});
