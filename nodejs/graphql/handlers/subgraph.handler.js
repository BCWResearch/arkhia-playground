require('dotenv').config({path: '.env'});
const urlHandler = require('../../handlers/url.handler');
const axios = require('axios');

 const apiKey = process.env.ARKHIA_API_KEY



class SubgraphHandler {
    getTransfers = async (isMainnet)=>{

        try {
            const response = await axios.post(`${urlHandler.getSubgraphURL(isMainnet)}/${apiKey}/erc20-transfers-quickstart/`, {
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
