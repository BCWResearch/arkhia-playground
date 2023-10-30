require("dotenv").config();
console.clear();
const arkhiaApiHandler = require("../../arkhia.api.handler");


const eventConfig = {
    type : {
        account: 1,
        contract: 2,
        ethTopic: 5
    },
    mainnet : {
        networkId: 295
    },
    testnet: {
        networkId: 296
    }
};


const toggleSettingsItem = async (eventTooglePayload, eventType, eventToggle, expectedValue) => {
    const response = await arkhiaApiHandler.toggleSettingsItem(eventTooglePayload, eventType, eventToggle);
    const eventItem = response.data.response;
    
    expect(eventItem).toHaveProperty("id");
    expect(eventItem).toHaveProperty("item_id");
    expect(eventItem).toHaveProperty("user_id");
    expect(eventItem).toHaveProperty("network_id");
    expect(eventItem).toHaveProperty("type_id");
    expect(eventItem).toHaveProperty("enabled", expectedValue);
    expect(eventItem).toHaveProperty("json_settings");
    expect(eventItem).toHaveProperty("status");
    expect(eventItem).toHaveProperty("created_at");
    expect(eventItem).toHaveProperty("updated_at");
    expect(eventItem).toHaveProperty("job_health_timestamp");
    expect(eventItem).toHaveProperty("request_fetch_limit");
    return response;
}

describe("Test to Toggle On/Off Item Event Settings", () => {


    it('Should toggle ON Account', async function () {
        const accounts = await arkhiaApiHandler.getItemSettings();
        const accountItem = accounts.data?.response.find((item) => item.type_id == eventConfig.type.account && item.enabled == false);

        if (accountItem === null || accountItem === undefined) {
            console.info(`Could not find account item disabled to toggle on.`);
            expect(accountItem).toHaveProperty('enabled', false);
            return;
        }
        const itemTogglePayload = {
            item_id: accountItem.item_id,
            network_id: accountItem.network_id,
        };
        return toggleSettingsItem(itemTogglePayload, `account`, `enable`, true);
    });

    it('Should toggle OFF Account', async function () {
        const accounts = await arkhiaApiHandler.getItemSettings();

        const accountItem = accounts.data?.response.find((item) => item.type_id == eventConfig.type.account && item.enabled == true);

        if (accountItem === null || accountItem === undefined) {
            console.info(`Could not find account item disabled to toggle off.`);
            expect(accountItem).toHaveProperty('enabled', true);
            return;
        }
        const itemTogglePayload = {
            item_id: accountItem.item_id,
            network_id: accountItem.network_id,
        };
        return toggleSettingsItem(itemTogglePayload, `account`, `disable`, false);
    });

    it('Should toggle ON Contract', async function () {
        const settings = await arkhiaApiHandler.getItemSettings();
        const contractItem = settings.data?.response.find((item) => item.type_id == eventConfig.type.contract && item.enabled == false);

        if (contractItem === null || contractItem === undefined) {
            console.info(`Could not find contract item disabled to toggle on.`);
            expect(contractItem).toHaveProperty('enabled', false);
            return;
        }
        const itemTogglePayload = {
            item_id: contractItem.item_id,
            network_id: contractItem.network_id,
        };
        return toggleSettingsItem(itemTogglePayload, `contract`, `enable`, true);
    });

    it('Should toggle OFF Contract', async function () {
        const settings = await arkhiaApiHandler.getItemSettings();
        const contractItem = settings.data?.response.find((item) => item.type_id == eventConfig.type.contract && item.enabled == true);

        if (contractItem === null || contractItem === undefined) {
            console.info(`Could not find contract item disabled to toggle off.`);
            expect(contractItem).toHaveProperty('enabled', true);
            return;
        }
        const itemTogglePayload = {
            item_id: contractItem.item_id,
            network_id: contractItem.network_id,
        };
        return toggleSettingsItem(itemTogglePayload, `contract`, `disable`, false);
    });

    it('Should toggle ON Eth Topic', async function () {
        const items = await arkhiaApiHandler.getItemSettings();
        const item = items.data?.response.find((item) => item.type_id == eventConfig.type.ethTopic && item.enabled == false);

        if (item === null || item === undefined) {
            console.info(`Could not find item disabled to toggle on.`);
            expect(item).toHaveProperty('enabled', false);
            return;
        }
        const itemTogglePayload = {
            item_id: item.item_id,
            network_id: item.network_id,
        };
        return toggleSettingsItem(itemTogglePayload, `ethtopic`, `enable`, true);
    });

    it('Should toggle OFF Eth Topic', async function () {
        const items = await arkhiaApiHandler.getItemSettings();
        const item = items.data?.response.find((item) => item.type_id == eventConfig.type.ethTopic && item.enabled ==  true);

        if (item === null || item === undefined) {
            console.info(`Could not find item disabled to toggle on.`);
            expect(item).toHaveProperty('enabled', false);
            return;
        }
        const itemTogglePayload = {
            item_id: item.item_id,
            network_id: item.network_id,
        };
        return toggleSettingsItem(itemTogglePayload, `ethtopic`, `disable`, false);
    });
 
});
