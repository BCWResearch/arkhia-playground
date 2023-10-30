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

const deleteSettingsInvalidItem = async (eventCreatePayload, eventType) => {
    try {
        const response = await arkhiaApiHandler.deleteItemSettings(eventCreatePayload, eventType);
        return response;
    } 
    catch (error) {
        expect(error.response.data).toHaveProperty("status", false);
        expect(error.response.data.response).toContain("Unable to find setting item");
    }
}

const deleteSettingsItem = async (eventDeletePayload, eventType) => {
    const response = await arkhiaApiHandler.deleteItemSettings(eventDeletePayload, eventType);
    expect(response.data).toHaveProperty("status", true);
    const item = response.data.response;
    expect(item).toHaveProperty("item_id", eventDeletePayload.item_id);
    return response;
}

describe("Test to validate Delete Item Event Settings", () => {



    it('Account | Delete a account should return null if not found', async function () {
        // Arrange.
        const deleteAccount = {
            item_id: `0.0.0000`,
            network_id: eventConfig.testnet.networkId,
        };
        return deleteSettingsInvalidItem(deleteAccount, `account`);
    });

    it('Contract | Delete a contract should return null if not found', async function () {
        // Arrange.
        const deleteAccount = {
            item_id: `0.0.0000`,
            network_id: eventConfig.mainnet.networkId,
        };
        return deleteSettingsInvalidItem(deleteAccount, `contract`);
    });

    it('Account | Should be able to delete a valid account item', async function () {
        const accounts = await arkhiaApiHandler.getItemSettings();
        const accountItem = accounts.data?.response.find((item) => item.type_id == eventConfig.type.account);
        expect(accountItem).toBeDefined();
        const itemDeletePayload = {
            item_id: accountItem.item_id,
            network_id: accountItem.network_id,
        };

        console.log(`Deleting Account ${itemDeletePayload.item_id} (${itemDeletePayload.network_id})`);      
        return deleteSettingsItem(itemDeletePayload, `account`, eventConfig.type.account);
   
    });

    it('Contract | Should be able to delete a valid contract item', async function () {
        const accounts = await arkhiaApiHandler.getItemSettings();
        const accountItem = accounts.data?.response.find((item) => item.type_id == eventConfig.type.contract);
    
        if (accountItem === null) {
            console.log(`Could not find item account`);
            return;
        }
        const itemDeletePayload = {
            item_id: accountItem.item_id,
            network_id: accountItem.network_id,
        };

        console.log(`Deleting Contract ${itemDeletePayload.item_id} (${itemDeletePayload.network_id})`);      
        return deleteSettingsItem(itemDeletePayload, `contract`, eventConfig.type.contract);
   
    });
 

    it('Eth Topic | Should be able to delete a valid contract item', async function () {
        const items = await arkhiaApiHandler.getItemSettings();
        const ethItem = items.data?.response.find((item) => item.type_id == eventConfig.type.ethTopic);
    
        if (ethItem === null) {
            console.log(`Could not find item eth topic`);
            return;
        }
        const itemDeletePayload = {
            item_id: ethItem.item_id,
            network_id: ethItem.network_id,
        };
        console.log(`Deleting Eth Topic ${itemDeletePayload.item_id} (${itemDeletePayload.network_id})`);      
        return deleteSettingsItem(itemDeletePayload, `ethtopic`, eventConfig.type.ethTopic);
   
    });

});
