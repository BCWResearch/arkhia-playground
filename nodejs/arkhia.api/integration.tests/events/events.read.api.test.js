require("dotenv").config();
console.clear();
const arkhiaApiHandler = require("../../arkhia.api.handler");
const eventConfig = {
    type : {
        account: 1,
        contract: 2
    },
};

const callArkhiaAPIWithNoKey = async () => {
    try {
        const response = await arkhiaApiHandler.getEventRequestWithCustomKey(``);
        return response;
    } 
    catch (error) {
        expect(error.response.data).toHaveProperty("status", false);
        expect(error.response.data.response).toContain("Please send a valid API key");
    }
}

const callArkhiaAPIWithInvalidKey = async () => {
    try {
        const response = await arkhiaApiHandler.getEventRequestWithCustomKey(`imrandomstuff`);
        return response;
    } 
    catch (error) {
        console.log(error);
        expect(error.response.data).toHaveProperty("status", false);
        expect(error.response.data.response).toContain("Please send a valid API key");
    }
}

const callArkhiaAPIWithValidKeyButWithoutApiSecret = async () => {
    try {
        const response = await arkhiaApiHandler.getItemSettings(false);
        return response;
    } 
    catch (error) {
        expect(error.response.data).toHaveProperty("status", false);
        expect(error.response.data.response).toContain("You have enabled 2 layer security. Please send a valid API secret in the body");
    }
}

const callArkhiaAPIEventAllSettings = async () => {
    try {
        const response = await arkhiaApiHandler.getItemSettings(true);

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

const callArkhiaContractInvalidTag = async (eventSettingsPayload, itemType, configType) => {
    try {
        const response = await arkhiaApiHandler.getItemsCategoryConfig(eventSettingsPayload, itemType, configType);
    } catch(e) {
        expect(e.response.data).toHaveProperty("status", false);
        expect(e.response.data).toHaveProperty("response", "Invalid value");
    }
}

const callArkhiaContractEventsConfig = async (eventSettingsPayload, itemType, configType) => {
    const response = await arkhiaApiHandler.getItemsCategoryConfig(eventSettingsPayload, itemType, configType);
    expect(response.data).toHaveProperty("status", true);
    expect(response.data.response).toBeDefined();
    expect(response.data.response).toHaveProperty("config_type", "events");
    expect(response.data.response).toHaveProperty("config_object");
    expect(response.data.response).toHaveProperty("config_object_template");
}


describe("Test to validate Arkhia API authentication layer", () => {
   
    it('Call Event [Arkhia API] with an invalid ApiKey should return false', async function () {
        return callArkhiaAPIWithInvalidKey();
    });

    it('Call Event [Arkhia API] without ApiKey should be invalid should return false', async function () {
        return callArkhiaAPIWithNoKey();
    });

    it('Call Event [Arkhia API] without ApiSecret should return false', async function () {
        return callArkhiaAPIWithValidKeyButWithoutApiSecret();
    });
});


describe("Test to valid read events of the Events Arkhia API", () => {

    it('Call Event [Arkhia API]  Settings should return a settings array with valid payload', async function () {
        return callArkhiaAPIEventAllSettings();
    });

    it('Call Contract Events without valid tag should not return config ', async function () {

        const settings = await arkhiaApiHandler.getItemSettings();
        const contractItem = settings.data?.response.find((item) => item.type_id == eventConfig.type.contract && item.enabled == true);

        if (contractItem === null || contractItem === undefined) {
            console.info(`Could not find contract item.`);
            return;
        }

        const settingsPayload = {
            item_id: contractItem.item_id,
            network_id: contractItem.network_id,
        };

        return callArkhiaContractInvalidTag(settingsPayload, `contract`, 'random_tag');
    });
 
    it('Call Contract Events config should return the Events configuration ', async function () {

        const settings = await arkhiaApiHandler.getItemSettings();
        const contractItem = settings.data?.response.find((item) => item.type_id == eventConfig.type.contract && item.enabled == true);

        if (contractItem === null || contractItem === undefined) {
            console.info(`Could not find contract item to retrieve config.`);
            return;
        }

        const settingsPayload = {
            item_id: contractItem.item_id,
            network_id: contractItem.network_id,
        };

        return callArkhiaContractEventsConfig(settingsPayload, `contract`, 'events');
    });
  
});

