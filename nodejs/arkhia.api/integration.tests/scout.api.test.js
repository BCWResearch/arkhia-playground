require("dotenv").config();
console.clear();

const arkhiaApiHandler = require("../arkhia.api.handler");
const isMainnet = true;

const callArkhiaAPIWithNoKey = async (isMainnet) => {
    try {
        const response = await arkhiaApiHandler.getScoutRequestWithCustomKey(true, ``);
        return response;
    } 
    catch (error) {
        expect(error.response.data).toHaveProperty("status", false);
        expect(error.response.data.response).toContain("Please send a valid API key");
    }
}

const callArkhiaAPIWithInvalidKey = async (isMainnet) => {
    try {
        const response = await arkhiaApiHandler.getScoutRequestWithCustomKey(true, `imrandomstuff`);
        return response;
    } 
    catch (error) {
        expect(error.response.data).toHaveProperty("status", false);
        expect(error.response.data.response).toContain("Please send a valid API key");
    }
}

const callArkhiaAPIWithValidKeyButWithoutApiSecret = async (isMainnet) => {
    try {
        const response = await arkhiaApiHandler.getScoutSettings(isMainnet, false);
        return response;
    } 
    catch (error) {
        expect(error.response.data).toHaveProperty("status", false);
        expect(error.response.data.response).toContain("You have enabled 2 layer security. Please send a valid API secret in the body");
    }
}

const callArkhiaAPIScoutSettings = async (isMainnet) => {
    try {
        const response = await arkhiaApiHandler.getScoutSettings(isMainnet, true);
        expect(response.data).toHaveProperty("status", true);
        expect(response.data.response).toBeDefined();
        const scoutSetting = response.data.response[0];
        expect(scoutSetting).toHaveProperty("id");
        expect(scoutSetting).toHaveProperty("item_id");
        expect(scoutSetting).toHaveProperty("user_id");
        expect(scoutSetting).toHaveProperty("network_id");
        expect(scoutSetting).toHaveProperty("type_id");
        expect(scoutSetting).toHaveProperty("enabled");
        expect(scoutSetting).toHaveProperty("json_settings");
        expect(scoutSetting).toHaveProperty("status");
        expect(scoutSetting).toHaveProperty("created_at");
        expect(scoutSetting).toHaveProperty("updated_at");
        expect(scoutSetting).toHaveProperty("job_health_timestamp");
        expect(scoutSetting).toHaveProperty("request_fetch_limit");
        return response;
    } 
    catch (error) {
        expect(error.response.data).toHaveProperty("status", true);
    }
}

describe("Test to validate Scout Arkhia API", () => {

    it('Call Scout [Arkhia API] with an invalid ApiKey should return false', async function () {
        return callArkhiaAPIWithInvalidKey(isMainnet);
    });

    it('Call Scout [Arkhia API] without ApiKey should be invalid should return false', async function () {
        return callArkhiaAPIWithNoKey(isMainnet);
    });

    it('Call Scout [Arkhia API] without ApiSecret should return false', async function () {
        return callArkhiaAPIWithValidKeyButWithoutApiSecret(isMainnet);
    });

    it('Call Scout [Arkhia API]  Settings should return a settings array with valid payload', async function () {
        return callArkhiaAPIScoutSettings(isMainnet);
    });

});
