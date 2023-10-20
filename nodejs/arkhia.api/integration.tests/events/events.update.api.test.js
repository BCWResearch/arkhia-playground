require("dotenv").config();
console.clear();

const restApiHandler = require("../../../rest-api/handlers/rest.api.handler");
const arkhiaApiHandler = require("../../arkhia.api.handler");



const createEventSettingsInvalidItem = async (eventCreatePayload) => {
    try {
        const response = await arkhiaApiHandler.createEventSettings(eventCreatePayload);
        return response;
    } 
    catch (error) {
        expect(error.response.data).toHaveProperty("status", false);
        expect(error.response.data.response).toContain("Could not create item. Arguments invalid or item does not seem available in the mirror node.");
    }
}


describe("Test to validate Create Event Settings", () => {

 
    it('Testnet | Contract | Should update enable for a testnet Contract and return result', async function () {
        try {
            // Arrange.
            const settings = await arkhiaApiHandler.getItemSettings();
            expect(settings.data).toHaveProperty("status", true);
            const randomContract = settings.data.response.find(( item) => item.type_id = 2);

            
            console.log(`get settings`);
            console.log(randomContract);

        }catch (e) {
            console.error('Could not fetch an account item to update. Please create one first.')
        }
      

        /*
        const eventUpdatePayload = {
            item_id: `0.0.0000`,
            network_id: eventConfig.testnet.networkId,
            enabled: true
        };
        return createEventSettingsInvalidItem(eventCreatePayload);
        */
    });
 

    
});
