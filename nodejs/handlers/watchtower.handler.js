require('dotenv').config({ path: '.env' });

const subscribeTopicRoute = `/com.hedera.mirror.api.proto.ConsensusService/subscribeTopic`;
const getBalanceRoute = `/proto.CryptoService/cryptoGetBalance`;

class WatchtowerHandler {

    getSubscribeTopicPayload = (topic_id, limit) => {
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
            body: payload
        };
        return subscriptionPayload;
    }

    getBalancePayload = (account_id) => {
        const accountArr = account_id.split('.');
        const payload = {
            "cryptogetAccountBalance": {
                "header": {
                    "responseType": 0
                },
                "accountID": {
                    "realmNum": accountArr[0],
                    "shardNum": accountArr[1],
                    "accountNum": accountArr[2],
                }
            }
        }
        const balancePayload = {
            subscribe: getBalanceRoute,
            body: payload
        };
        return balancePayload;
    }

}

module.exports = Object.freeze(new WatchtowerHandler());
