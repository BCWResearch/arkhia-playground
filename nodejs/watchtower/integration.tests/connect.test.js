console.clear();

require('dotenv').config({path: '.env'});
const urlHandler = require('../../handlers/url.handler');
const io = require('socket.io-client');
let socket;
let statusMessage;
let servicesList;

let socketOpenStatus = true;
let socketCloseStatus = false;

describe('Open/Close Connection [Watchtower]',  () => {

    beforeAll((done) => {
        socket = io(urlHandler.getWatchtowerUrlTestnet());
   
        socket.on('connect', function () {
            socketOpenStatus = true;
            socket.close();
        });
        socket.on('disconnect', function () {
            socketCloseStatus = true;
            done();
        });
    });

    it('Should be able to listen to connect event ',  () => {
        expect(socketOpenStatus).toEqual(true);
    });

    it('Should be able to listen to disconnect event',  () => {
        expect(socketCloseStatus).toEqual(true);
    });
});

describe('Connections [Watchtower]',  () => {

    beforeAll((done) => {
        socket = io(urlHandler.getWatchtowerUrlTestnet());
        socket.on('connect', function () {
            socket.on('status', (msg) => {
                statusMessage = msg;
                done();
            });
        });
    });

    it('Should be able to receive connection status payload',  () => {
        expect(statusMessage).toBeDefined();
    });

    it('Should be able to receive an adequate connection status payload',  () => {
        // Properties
        expect(statusMessage).toHaveProperty('clientId');
        expect(statusMessage).toHaveProperty('message');
        expect(statusMessage).toHaveProperty('events');
        expect(statusMessage.events).toHaveProperty('request');
        expect(statusMessage.events).toHaveProperty('response');
        // Request data
        expect(statusMessage.events.request).toContain('subscribe');
        expect(statusMessage.events.request).toContain('unsubscribe');
        expect(statusMessage.events.request).toContain('list-services');
        // Response data
        expect(statusMessage.events.response).toContain('data');
        expect(statusMessage.events.response).toContain('error');
        expect(statusMessage.events.response).toContain('end');
        expect(statusMessage.events.response).toContain('status');
        expect(statusMessage.message).toEqual('Connected successfully');
    });

    afterAll(() => {
        socket.close();
    });

});


describe('Services listed [Watchtower]',  () => {

    beforeAll((done) => {
        socket = io(urlHandler.getWatchtowerUrlTestnet());
        socket.emit(`list-services`, (services) => {
            servicesList = services;
            done();
        });

    });

    it('Should be able to receive services after connection',  () => {
        expect(servicesList).toBeDefined();
    });

    it('Should be able to receive subscribeTopic subscription from service',  () => {
        expect(servicesList[`/com.hedera.mirror.api.proto.ConsensusService/subscribeTopic`]).toBeDefined();
    });

    it('Should be able to receive getNodes subscription from service',  () => {
        expect(servicesList[`/com.hedera.mirror.api.proto.NetworkService/getNodes`]).toBeDefined();
    });

    it('Should be able to receive createAccount from service',  () => {
        expect(servicesList[`/proto.CryptoService/createAccount`]).toBeDefined();
    });

    it('Should be able to receive updateAccount from service',  () => {
        expect(servicesList[`/proto.CryptoService/updateAccount`]).toBeDefined();
    });

    it('Should be able to receive cryptoTransfer from service',  () => {
        expect(servicesList[`/proto.CryptoService/cryptoTransfer`]).toBeDefined();
    });

    it('Should be able to receive cryptoDelete from service',  () => {
        expect(servicesList[`/proto.CryptoService/cryptoDelete`]).toBeDefined();
    });

    it('Should be able to receive approveAllowances from service',  () => {
        expect(servicesList[`/proto.CryptoService/approveAllowances`]).toBeDefined();
    });

    it('Should be able to receive deleteAllowances from service',  () => {
        expect(servicesList[`/proto.CryptoService/deleteAllowances`]).toBeDefined();
    });

    it('Should be able to receive addLiveHash from service',  () => {
        expect(servicesList[`/proto.CryptoService/addLiveHash`]).toBeDefined();
    });

    it('Should be able to receive deleteLiveHash from service',  () => {
        expect(servicesList[`/proto.CryptoService/deleteLiveHash`]).toBeDefined();
    });

    it('Should be able to receive getLiveHash from service',  () => {
        expect(servicesList[`/proto.CryptoService/getLiveHash`]).toBeDefined();
    });

    it('Should be able to receive getAccountRecords from service',  () => {
        expect(servicesList[`/proto.CryptoService/getAccountRecords`]).toBeDefined();
    });

    it('Should be able to receive cryptoGetBalance from service',  () => {
        expect(servicesList[`/proto.CryptoService/cryptoGetBalance`]).toBeDefined();
    });

    it('Should be able to receive getAccountInfo from service',  () => {
        expect(servicesList[`/proto.CryptoService/getAccountInfo`]).toBeDefined();
    });

    it('Should be able to receive getTransactionReceipts from service',  () => {
        expect(servicesList[`/proto.CryptoService/getTransactionReceipts`]).toBeDefined();
    });

    it('Should be able to receive getFastTransactionRecord from service',  () => {
        expect(servicesList[`/proto.CryptoService/getFastTransactionRecord`]).toBeDefined();
    });

    it('Should be able to receive getTxRecordByTxID from service',  () => {
        expect(servicesList[`/proto.CryptoService/getTxRecordByTxID`]).toBeDefined();
    });

    it('Should be able to receive getStakersByAccountID from service',  () => {
        expect(servicesList[`/proto.CryptoService/getStakersByAccountID`]).toBeDefined();
    });

    afterAll(() => {
        socket.close();
    });

});

