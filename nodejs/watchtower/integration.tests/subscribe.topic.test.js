console.clear();

require('dotenv').config({ path: '.env' });
const urlHandler = require('../../handlers/url.handler');
const watchtowerHandler = require('../../handlers/watchtower.handler');
const io = require('socket.io-client');
let socket;
let topicSubscriptionPayload;
const topicTestnet = process.env.TESTNET_TOPIC_ID;
const topicMainnet = process.env.MAINNET_TOPIC_ID;

let messagesAmount = 3; // make sure we get a few topics down
let messageCount = 0;
let timeout = 10000;

const verifyTopicSubscriptionResponse = (msg) => {
    expect(msg.listeners).toBeDefined();
    expect(msg.listeners.data).toBeDefined();
    expect(msg.listeners.error).toBeDefined();
    expect(msg.listeners.end).toBeDefined();
    expect(msg.listeners.status).toBeDefined();
    expect(msg.meta.subscribe).toBeDefined();
    expect(msg.meta.body).toBeDefined();
}

const verifyTopicPayload = (data, topicId) => {
    expect(data).toBeDefined();

    expect(data).toHaveProperty('subscribe');
    expect(data).toHaveProperty('body');

    expect(data.body).toHaveProperty('consensusStartTime');
    expect(data.body).toHaveProperty('limit');
    expect(data.body).toHaveProperty('topicID');

    expect(data.body.limit).toEqual('100');
    expect(data.body.topicID).toHaveProperty('topicNum');
    expect(data.body.topicID.topicNum).toEqual(topicId);
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

const unsubscribeTopic = (socket, topic) => {
    socket.emit(`unsubscribe`, topic.uid, (success) => {
        expect(success).toEqual(true);
    });
}

describe('Subscribe to Topic [Watchtower] on Testnet', () => {

    beforeAll((done) => {
        messageCount = 0;
        socket = io(urlHandler.getWatchtowerUrlTestnet());
        topicSubscriptionPayload = watchtowerHandler.getSubscribeTopicPayload(topicTestnet, `100`);
        socket.on('connect', function () {
            done();
        });
    });

    it('Should have correct subscription payload', () => {
        verifyTopicPayload(topicSubscriptionPayload, topicTestnet);
    });

    it('Should have correct message coming down when subscribing to topic', (done) => {
        socket.emit(`subscribe`, topicSubscriptionPayload, (msg) => {
            verifyTopicSubscriptionResponse(msg)
            unsubscribeTopic(socket, msg);
            done();
        });
    }, timeout);

    it('Should have messages streaming down when subscribing to topic', (done) => {

        socket.emit(`subscribe`, topicSubscriptionPayload, (msg) => {
            socket.on(msg.listeners.data, function (message) {
                verifyTopicSubscriptionMessageStream(message);
                if (messageCount === 0) expect(message.data.message).toEqual('Hello from Arkhia');
                if (messageCount === 1) expect(message.data.message).toEqual('Welcome to Watchtower');
                if (messageCount === 2) expect(message.data.message).toEqual('Hello again...');
                messageCount++;
                if (messageCount === messagesAmount) {
                    unsubscribeTopic(socket, msg);
                    done();
                }

            });
        });
    }, timeout);

    afterAll(() => {
        socket.close();
    });
});

describe('Subscribe to Topic [Watchtower] on Mainnet',  () => {

    beforeAll((done) => {
        messageCount = 0;
        socket = io(urlHandler.getWatchtowerUrlMainnet());
        topicSubscriptionPayload = watchtowerHandler.getSubscribeTopicPayload(topicMainnet, `100`);
        socket.on('connect', function () {
            done();
        });
    });

    it('Should have correct subscription payload', () => {
        verifyTopicPayload(topicSubscriptionPayload, topicMainnet);
    });

    it('Should have correct message coming down when subscribing to topic', (done) => {
        socket.emit(`subscribe`, topicSubscriptionPayload, (msg) => {
            verifyTopicSubscriptionResponse(msg)
            unsubscribeTopic(socket, msg);
            done();
        });
    }, timeout);

    it('Should have messages streaming down when subscribing to topic', (done) => {

        socket.emit(`subscribe`, topicSubscriptionPayload, (msg) => {  
            socket.on(msg.listeners.data, function (message) {
                verifyTopicSubscriptionMessageStream(message);
                expect(message.data.message).toEqual('Mirror Node acceptance test');
                unsubscribeTopic(socket, msg);
                done();
            });
        });
    }, timeout);

    afterAll(() => {
        socket.close();
    });

});

