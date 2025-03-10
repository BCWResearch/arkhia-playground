console.clear();
require('dotenv').config({path: '.env'});
const {
    Client,
    TopicMessageQuery
} = require("@hashgraph/sdk");

const nodes = { "35.237.100.180:50211" : "0.0.3"}
const topicId = process.env.TESTNET_TOPIC_ID || '0.0.5674329';
const accountId = process.env.TEST_ACCOUNT_ID || '0.0.1354';
const privateKey = process.env.TESTNET_OPERATOR_PRIVATE_KEY;
const arkhiaGRPC = process.env.ARKHIA_TESTNET_GRPC || 'grpc.testnet.arkhia.io:443';

async function createClient() {
    if (accountId == null || privateKey == null ) {
        throw new Error("Variables accountId and privateKey must be present");
    }
    const client = Client.forNetwork(nodes).setMirrorNetwork(arkhiaGRPC);
    client.setOperator(accountId, privateKey);
    return client;
}

async function getMessagesFromTopic(topicId) {
    const client = await createClient();
    console.log(`Subscribing to ${arkhiaGRPC}`);
    //Create the query
    new TopicMessageQuery()
        .setTopicId(topicId)
        .setStartTime(0)
        .subscribe(
            client,
            (message) => console.log(topicId + ": -> " + Buffer.from(message.contents, "utf8").toString())
        );
}

getMessagesFromTopic(topicId);