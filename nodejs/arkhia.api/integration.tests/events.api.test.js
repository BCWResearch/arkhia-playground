require("dotenv").config();
console.clear();

const arkhiaApiHandler = require("../arkhia.api.handler");
let isMainnet = true;

const callArkhiaAPIWithNoKey = async () => {
    try {
        const response = await arkhiaApiHandler.getEventRequestWithCustomKey(true, ``);
        return response;
    } 
    catch (error) {
        expect(error.response.data).toHaveProperty("status", false);
        expect(error.response.data.response).toContain("Please send a valid API key");
    }
}

const callArkhiaAPIWithInvalidKey = async () => {
    try {
        const response = await arkhiaApiHandler.getEventRequestWithCustomKey(true, `imrandomstuff`);
        return response;
    } 
    catch (error) {
        expect(error.response.data).toHaveProperty("status", false);
        expect(error.response.data.response).toContain("Please send a valid API key");
    }
}

const callArkhiaAPIWithValidKeyButWithoutApiSecret = async () => {
    try {
        const response = await arkhiaApiHandler.getEventSettings(false);
        return response;
    } 
    catch (error) {
        expect(error.response.data).toHaveProperty("status", false);
        expect(error.response.data.response).toContain("You have enabled 2 layer security. Please send a valid API secret in the body");
    }
}

const callArkhiaAPIEventSettings = async () => {
    try {
        const response = await arkhiaApiHandler.getEventSettings(true);

        expect(response.data).toHaveProperty("status", true);
        expect(response.data.response).toBeDefined();
        const eventSetting = response.data.response[0];
        expect(eventSetting).toHaveProperty("id");
        expect(eventSetting).toHaveProperty("item_id");
        expect(eventSetting).toHaveProperty("user_id");
        expect(eventSetting).toHaveProperty("network_id");
        expect(eventSetting).toHaveProperty("type_id");
        expect(eventSetting).toHaveProperty("enabled");
        expect(eventSetting).toHaveProperty("json_settings");
        expect(eventSetting).toHaveProperty("status");
        expect(eventSetting).toHaveProperty("created_at");
        expect(eventSetting).toHaveProperty("updated_at");
        expect(eventSetting).toHaveProperty("job_health_timestamp");
        expect(eventSetting).toHaveProperty("request_fetch_limit");
        return response;
    } 
    catch (error) {
        console.log(`Could not get any items`);
        console.log(error);
        expect(error.response.data).toHaveProperty("status", true);
    }
}

describe("Test to validate Events Arkhia API", () => {
    beforeAll(() => {

    });

    it('Call Event [Arkhia API] with an invalid ApiKey should return false', async function () {
        return callArkhiaAPIWithInvalidKey();
    });

    it('Call Event [Arkhia API] without ApiKey should be invalid should return false', async function () {
        return callArkhiaAPIWithNoKey();
    });

    it('Call Event [Arkhia API] without ApiSecret should return false', async function () {
        return callArkhiaAPIWithValidKeyButWithoutApiSecret();
    });

    it('Call Event [Arkhia API]  Settings should return a settings array with valid payload', async function () {
        return callArkhiaAPIEventSettings();
    });

    it('Testnet only | Call Event [Arkhia API]  Settings should return a settings array with valid payload', async function () {
        
    });

    it('Mainnet only | Call Event [Arkhia API]  Settings should return a settings array with valid payload', async function () {
        
    });

});

