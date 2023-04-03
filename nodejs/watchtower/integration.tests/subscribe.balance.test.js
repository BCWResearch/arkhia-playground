console.clear();

require('dotenv').config({ path: '.env' });
const urlHandler = require('../../handlers/url.handler');
const watchtowerHandler = require('../../handlers/watchtower.handler');
const io = require('socket.io-client');
let socket;
let topicSubscriptionPayload;
const accountTestnet = process.env.TESTNET_ACCOUNT_ID;

let messagesAmount = 3; // make sure we get a few topics down
let messageCount = 0;
let timeout = 10000;

const verifyBalanceSubscriptionResponse = (msg) => {
    expect(msg.listeners).toBeDefined();
    expect(msg.listeners.data).toBeDefined();
    expect(msg.listeners.error).toBeDefined();
    expect(msg.listeners.end).toBeDefined();
    expect(msg.listeners.status).toBeDefined();
    expect(msg.meta.subscribe).toBeDefined();
    expect(msg.meta.body).toBeDefined();
}

const verifyBalancePayload = (data, account) => {
    const accountArr = account.split('.');
    expect(data).toBeDefined();

    expect(data).toHaveProperty('subscribe');
    expect(data).toHaveProperty('body');

    expect(data.body.cryptogetAccountBalance).toBeDefined();
    expect(data.body.cryptogetAccountBalance).toHaveProperty('header');
    expect(data.body.cryptogetAccountBalance).toHaveProperty('accountID');

    expect(data.body.cryptogetAccountBalance.header).toHaveProperty('responseType');
    expect(data.body.cryptogetAccountBalance.header.responseType).toEqual(0);

    expect(data.body.cryptogetAccountBalance.accountID).toBeDefined();
    expect(data.body.cryptogetAccountBalance.accountID).toHaveProperty('realmNum');
    expect(data.body.cryptogetAccountBalance.accountID).toHaveProperty('shardNum');
    expect(data.body.cryptogetAccountBalance.accountID).toHaveProperty('accountNum');
    expect(data.body.cryptogetAccountBalance.accountID.realmNum).toEqual(accountArr[0]);
    expect(data.body.cryptogetAccountBalance.accountID.shardNum).toEqual(accountArr[1]);
    expect(data.body.cryptogetAccountBalance.accountID.accountNum).toEqual(accountArr[2]);
}

const verifyTopicSubscriptionMessageStream = (message) => {
    expect(message.error).toBeDefined();
    expect(message.error).toEqual(false);
    expect(message.uid).toBeDefined();
    expect(message.data).toBeDefined();
    expect(message.data).toHaveProperty('consensusTimestamp');
    expect(message.data).toHaveProperty('message');
    expect(message.data).toHaveProperty('runningHash');
    expect(message.data).toHaveProperty('sequenceNumber');
    expect(message.data).toHaveProperty('runningHashVersion');
}

describe('Subscribe to CryptoGetBalance [Watchtower] on Testnet', () => {

    beforeAll((done) => {
        messageCount = 0;
        socket = io(urlHandler.getWatchtowerUrlTestnet());
        topicSubscriptionPayload = watchtowerHandler.getBalancePayload(accountTestnet);
        socket.on('connect', function () {
            done();
        });
    });

    it('Should have correct subscription payload', () => {
        verifyBalancePayload(topicSubscriptionPayload, accountTestnet);
    });

    it('Should have correct balance payload in response', (done) => {
        socket.emit(`subscribe`, topicSubscriptionPayload, (msg) => {
            verifyBalanceSubscriptionResponse(msg)
            done();
        });
    }, timeout);

    it('Should have balance response when subscribing to CryptoGetBalance', (done) => {

        socket.emit(`subscribe`, topicSubscriptionPayload, (msg) => {
            socket.on(msg.listeners.data, function (message) {
                expect(message).toBeDefined();
                expect(message.error).toBeDefined();
                expect(message.error).toEqual(false);
                expect(message.data).toBeDefined();
                expect(message.data).toHaveProperty('cryptogetAccountBalance');
                expect(message.data.cryptogetAccountBalance).toBeDefined();
                expect(message.data.cryptogetAccountBalance).toHaveProperty('header');
                expect(message.data.cryptogetAccountBalance).toHaveProperty('accountID');
                expect(message.data.cryptogetAccountBalance).toHaveProperty('balance');
                expect(message.data.cryptogetAccountBalance.header).toBeDefined();
                
                expect(message.data.cryptogetAccountBalance.accountID).toBeDefined();
                expect(message.data.cryptogetAccountBalance.accountID).toHaveProperty('accountNum');
                expect(message.data.cryptogetAccountBalance.accountID.accountNum).toBeDefined();
                expect(message.data.cryptogetAccountBalance.accountID.accountNum).toHaveProperty('low');
                expect(message.data.cryptogetAccountBalance.accountID.accountNum).toHaveProperty('high');
                expect(message.data.cryptogetAccountBalance.accountID.accountNum).toHaveProperty('unsigned');

                done();
            });
        });
    }, timeout);

    afterAll(() => {
        socket.close();
    });
});