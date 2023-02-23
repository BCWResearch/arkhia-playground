require('dotenv').config({path: '.env'});

const subscribeTopicRoute = `/com.hedera.mirror.api.proto.ConsensusService/subscribeTopic`;
 
class WatchtowerHandler {

    getSubscribeTopicPayload = (topic_id , limit) => {
        const payload = {
            consensusStartTime: {
                nanos: 0,
                seconds: `0`
            },
            limit: limit,
            topicID: {
                realmNum: `0`,
                shardNum: `0`,
                topicNum: topic_id
            }
        }
        const subscriptionPayload = {
            subscribe: subscribeTopicRoute,
            body :  payload
        };
        return subscriptionPayload;
    }

}

module.exports = Object.freeze(new WatchtowerHandler());
