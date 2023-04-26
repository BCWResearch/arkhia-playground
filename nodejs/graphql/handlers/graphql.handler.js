require('dotenv').config({path: '.env'});

const Curl = require('node-libcurl').Curl;
const urlHandler = require('../../handlers/url.handler');

class GraphQlHandler {
    static async fetchData() {
        const curl = new Curl();
        const url = urlHandler.getGraphQLMainnetUrl();
        const apiKey = process.env.ARKHIA_API_KEY;
        const postData = JSON.stringify({
            query: '{ account(input: { entityId: { shard: 0, realm: 0, num: 98 } }) { alias autoRenewAccount { entityId { shard realm num } } autoRenewPeriod balance createdTimestamp declineReward deleted entityId { shard realm num } expirationTimestamp id key maxAutomaticTokenAssociations memo nonce obtainer { entityId { shard realm num } } pendingReward receiverSigRequired stakedAccount { entityId { shard realm num } } stakePeriodStart timestamp { from to } type } }',
            variables: {},
        });

        return new Promise((resolve, reject) => {
            curl.setOpt(Curl.option.URL, url);
            curl.setOpt(Curl.option.HTTPHEADER, [
                `x-api-key: ${apiKey}`,
                'Content-Type: application/json',
            ]);
            curl.setOpt(Curl.option.POSTFIELDS, postData);

            curl.perform();

            curl.on('end', (statusCode, data, headers) => {
                curl.close();
                resolve(JSON.parse(data));
            });

            curl.on('error', error => {
                console.error('Curl error:', error);
                curl.close();
                reject(error);
            });
        });
    }
}

module.exports = GraphQlHandler;
