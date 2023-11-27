require("dotenv").config();
console.clear();
const arkhiaApiHandler = require("../../arkhia.api.handler");
const tokenEsgId= '0.0.1302948';
const networks = {
    mainnnet: 295,
    testnet: 296
};

const callTokenNftEsgMetadata = async (tokenPayload) => {
    try {
        const response = await arkhiaApiHandler.getArkhiaApiTokenMetadata(tokenPayload);
        expect(response.data).toHaveProperty("status", true);
        expect(response.data.response).toHaveProperty("tokenIsEsg", true);
        expect(response.data.response).toHaveProperty("tokenEsgData");
        expect(response.data.response).toHaveProperty("tokenEsgSchemaValidation");
        return response;
    } 
    catch (error) {
        console.log(error);
        expect(error.response.data).toHaveProperty("status", true);
        expect(error.response.data.response).toContain("This test went wrong. You should not be here.");
    }
}

describe("Test to valid Arkhia API Token Metadata ", () => {

    it('Call Token metadata endpoint should return not found message if invalid token', async function () {
        const tokenPayload = {
            item_id: '0.0.11111',
            network_id: networks.mainnnet,
            nft_serialnumber: 30
        }
        try {
            const response = await arkhiaApiHandler.getArkhiaApiTokenMetadata(tokenPayload);
            return response;
        } 
        catch (error) {
            expect(error.response.data).toHaveProperty('status', false);
            expect(error.response.data).toHaveProperty('response', 'Nft with Serial number 30 for Token 0.0.11111 could not be found.')
      }
    });


    it('Call Token metadata endpoint should return valid NFT metadata', async function () {
        const tokenPayload = {
            item_id: tokenEsgId,
            network_id: networks.mainnnet,
            nft_serialnumber: 30
        }
        return callTokenNftEsgMetadata(tokenPayload);
    });

});
