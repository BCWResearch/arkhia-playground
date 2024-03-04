require('dotenv').config({path: '.env'});
const urlHandler = require('../../handlers/url.handler');
const axios = require('axios');

const query = JSON.stringify({query: '{ transfers(first: 5) { id sender recipient amount }'});



class SubgraphHandler {
    getTransfers = async (isMainnet)=>{

        try {
            const response = await axios.post(`${urlHandler.getSubgraphURL(isMainnet)}/aba76682a6nb4K6bDDN6aa71N1c4NN8a/erc20-transfers-quickstart/`, {
                query: 'query { transfers(first: 5) { id sender recipient amount } }',
                variables: {}
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            return response;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }



}


module.exports =  Object.freeze(new SubgraphHandler());
