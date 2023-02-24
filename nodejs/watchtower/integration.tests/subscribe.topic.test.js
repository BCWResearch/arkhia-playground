console.clear();

require('dotenv').config({path: '.env'});
const urlHandler = require('../../handlers/url.handler');
const watchtowerHandler = require('../../handlers/watchtower.handler');
const io = require('socket.io-client');
let socket;
let topicSubscriptionPayload;
const topicTestnet = `3493291`;
let messagesAmount = 3; // make sure we get a few topics down
let messageCount = 0;
let timeout = 5000;

describe('Subscribe to Topic [Watchtower]',  () => {

    beforeAll((done) => {
        messageCount = 0;
        socket = io(urlHandler.getWatchtowerUrlTestnet());
        topicSubscriptionPayload = watchtowerHandler.getSubscribeTopicPayload(topicTestnet, `100`);
        socket.on('connect', function () {
            done();
        });
    });

    it('Should have correct subscription payload',  () => {
        expect(topicSubscriptionPayload).toBeDefined();

        expect(topicSubscriptionPayload).toHaveProperty('subscribe');
        expect(topicSubscriptionPayload).toHaveProperty('body');

        expect(topicSubscriptionPayload.body).toHaveProperty('consensusStartTime');
        expect(topicSubscriptionPayload.body).toHaveProperty('limit');
        expect(topicSubscriptionPayload.body).toHaveProperty('topicID');

        expect(topicSubscriptionPayload.body.limit).toEqual('100');
        expect(topicSubscriptionPayload.body.topicID).toHaveProperty('topicNum');
        expect(topicSubscriptionPayload.body.topicID.topicNum).toEqual('3493291');
    });

    it('Should have correct message coming down when subscribing to topic',  (done) => {
        socket.emit(`subscribe`, topicSubscriptionPayload, (msg) => {  
            expect(msg.listeners).toBeDefined();
            expect(msg.listeners.data).toBeDefined();
            expect(msg.listeners.error).toBeDefined();
            expect(msg.listeners.end).toBeDefined();
            expect(msg.listeners.status).toBeDefined();
            expect(msg.meta.subscribe).toBeDefined();
            expect(msg.meta.body).toBeDefined();
            done();
        });
    }, timeout);

    it('Should have messages streaming down when subscribing to topic',  (done) => {

        socket.emit(`subscribe`, topicSubscriptionPayload, (msg) => {  
            socket.on(msg.listeners.data, function (message) {
                expect(message.error).toBeDefined();
                expect(message.error).toEqual(false);
                expect(message.uid).toBeDefined();
                expect(message.data).toBeDefined();
                expect(message.data).toHaveProperty('consensusTimestamp');
                expect(message.data).toHaveProperty('message');
                expect(message.data).toHaveProperty('runningHash');
                expect(message.data).toHaveProperty('sequenceNumber');
                expect(message.data).toHaveProperty('runningHashVersion');
                expect(message.data).toHaveProperty('chunkInfo');

                if (messageCount === 0) expect(message.data.message).toEqual('Hello from Arkhia');
                if (messageCount === 1) expect(message.data.message).toEqual('Welcome to Fridays Workshop');
                if (messageCount === 2) expect(message.data.message).toEqual('Hello again...');
                messageCount++;

                if (messageCount === messagesAmount) {
                    done();
                }
         
            });
        });
    }, timeout);

    afterAll(() => {
        socket.close();
    });

});



