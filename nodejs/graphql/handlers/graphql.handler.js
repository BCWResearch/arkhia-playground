require('dotenv').config({path: '.env'});
const axios = require('axios');
// Arkhia config

const url = process.env.ARKHIA_MAINNET_GRAPHQL;
const apiKey = process.env.ARKHIA_API_KEY;
const data = {
    query: `{
    account(input: {
      entityId: {
        shard: 0,
        realm: 0,
        num: 98
      }
    }) {
      alias
      autoRenewAccount {
        entityId {
          shard
          realm
          num
        }
      }
      autoRenewPeriod
      balance
      createdTimestamp
      declineReward
      deleted
      entityId {
        shard
        realm
        num
      }
      expirationTimestamp
      id
      key
      maxAutomaticTokenAssociations
      memo
      nonce
      obtainer {
        entityId {
          shard
          realm
          num
        }
      }
      pendingReward
      receiverSigRequired
      stakedAccount {
        entityId {
          shard
          realm
          num
        }
      }
      stakePeriodStart
      timestamp {
        from
        to
      }
      type
    }
  }`,
    variables: {}
};


class graphqlHandler {
    getData = async () => {
        try {
            const response = await axios.post(url, data, {
                headers: {
                    'x-api-key': apiKey,
                    'Content-Type': 'application/json'
                }
            })
            return response
        } catch (e) {
            console.error(e)
        }

    }

}

module.exports = Object.freeze(new graphqlHandler());

