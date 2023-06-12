console.clear();

require('dotenv').config({ path: '.env' });
const urlHandler = require('../../handlers/url.handler');
const watchtowerHandler = require('../../handlers/watchtower.handler');
const io = require('socket.io-client');
let socket;
let balanceSubscriptionPayload;
const accountTestnet = "0.0.98"; // this accountId is always available on testnet/mainnet

let timeout = 10000;
const isStarterPlan = urlHandler.getJsonRpcTestnet().includes('starter');
describe('Verify multiple subscriptions to CryptoGetBalance [Watchtower] on Testnet', () => {
    beforeAll((done) => {
        messageCount = 0;
        socket = io(urlHandler.getWatchtowerUrlTestnet());
        balanceSubscriptionPayload = watchtowerHandler.getBalancePayload(accountTestnet);
        socket.on('connect', function () {
            done();
        });
    });

    isStarterPlan
        ? it('Should fail on active subscripton > 1', (done) => {
            socket.emit(`subscribe`, balanceSubscriptionPayload, (msg) => {
                socket.on('error', function (error) {
                    expect(error).toEqual("You have subscribed to the maximum number of services for your current plan. Please upgrade your subscription to subscribe more services.")
                    socket.emit('unsubscribe', msg.uid, (msg) => {
                        expect(msg).toEqual(true);
                        done();
                    });
                });
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
                    // resubscribe to the same account
                    socket.emit(`subscribe`, balanceSubscriptionPayload, (msg2) => {

                    })
                });
            });
        })
        : it('Skipping Starter Plan [Watchtower] subscriptions test because apiKey is not for Starter', () => {
            expect(true).toEqual(true);
        });
    afterAll(() => {
        socket.close();
    });
}, timeout);