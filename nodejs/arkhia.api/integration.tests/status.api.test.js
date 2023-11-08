const arkhiaApiHandler = require("../arkhia.api.handler");

require("dotenv").config();
console.clear();

describe("Test to validate Arkhia API analytics functionality", () => {

    it('Call Status API should return a valid payload', async function () {
        const response = await arkhiaApiHandler.getStatusInfo();
        expect(response).toHaveProperty('status', 200);
        expect(response.data).toBeDefined();
        expect(response.data).toHaveProperty('maintenance_mode', false);
        expect(response.data).toHaveProperty('outage_mode', false);
    });
});
