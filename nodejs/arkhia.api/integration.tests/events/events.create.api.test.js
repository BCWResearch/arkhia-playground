require("dotenv").config();
console.clear();

const restApiHandler = require("../../../rest-api/handlers/rest.api.handler");
const arkhiaApiHandler = require("../../arkhia.api.handler");


const eventConfig = {
    type : {
        account: 1,
        contract: 2
    },
    mainnet : {
        accountIdExists: `0.0.3517698`,
        accountId: `0.0.3910039`, // Here we can fetch the latest account created dynamically using Mirror Node
        contractIdExists: `0.0.3872547`,
        networkId: 295
    },
    testnet: {
        accountIdExists: `0.0.4530881`,
        accountId: `0.0.5695606`, // Same here
        contractIdExists: `0.0.4530862`,
        networkId: 296
    }
};


const createEventSettingsInvalidItem = async (eventCreatePayload) => {
    try {
        const response = await arkhiaApiHandler.createItemSettings(eventCreatePayload);
        return response;
    } 
    catch (error) {
        expect(error.response.data).toHaveProperty("status", false);
        expect(error.response.data.response).toContain("Could not create item. Arguments invalid or item does not seem available in the mirror node.");
    }
}

const createEventSettingsValidItemButAlreadyExists = async (eventCreatePayload) => {
    try {
        const response = await arkhiaApiHandler.createItemSettings(eventCreatePayload);
        return response;
    } 
    catch (error) {
        console.log(error);
        expect(error.response.data).toHaveProperty("status", false);
        expect(error.response.data.response).toContain("Event settings already exists");
    }
}

const createEventSettingsItem = async (eventCreatePayload, eventType, eventId) => {
  
        const response = await arkhiaApiHandler.createItemSettings(eventCreatePayload, eventType);
        const eventItem = response.data.response;
        expect(eventItem).toHaveProperty("id");
        expect(eventItem).toHaveProperty("item_id");
        expect(eventItem).toHaveProperty("user_id");
        expect(eventItem).toHaveProperty("network_id");
        expect(eventItem).toHaveProperty("type_id", eventId);
        expect(eventItem).toHaveProperty("enabled", false);
        expect(eventItem).toHaveProperty("json_settings");
        expect(eventItem).toHaveProperty("status");
        expect(eventItem).toHaveProperty("created_at");
        expect(eventItem).toHaveProperty("updated_at");
        expect(eventItem).toHaveProperty("job_health_timestamp");
        expect(eventItem).toHaveProperty("request_fetch_limit");
        return response;
}

describe("Test to validate Create Event Settings", () => {

    beforeAll(() => {

    });


    it('Testnet | Account | Create Event Settings with an invalid item should NOT create event settings', async function () {
        // Arrange.
        const eventCreatePayload = {
            item_id: `0.0.0000`,
            network_id: eventConfig.testnet.networkId,
        };
        return createEventSettingsInvalidItem(eventCreatePayload, `account`);
    });
 

    it('Testnet | Account | Create Event Settings with a valid payload but already existing should NOT create a Events settings item', async function () {
        // Arrange.
        const eventCreatePayload = {
            item_id: eventConfig.testnet.accountIdExists,
            network_id: eventConfig.testnet.networkId
        };
        return createEventSettingsValidItemButAlreadyExists(eventCreatePayload, `account`);
    });


    it('Testnet | Account | Create Contract Settings with a valid payload but already existing should NOT create a Events settings item', async function () {
        // Arrange.
        const eventCreatePayload = {
            item_id: eventConfig.testnet.contractIdExists,
            network_id: eventConfig.testnet.networkId
        };
        return createEventSettingsValidItemButAlreadyExists(eventCreatePayload, `contract`);
    });

  
   
    it('Testnet | Account | Create Event Settings with valid payload and not existing should create an Events settings item', async function () {
        // Arrange.
        // Only works if accounts are created constantly
        const accounts = await restApiHandler.getAccounts(false); 
        const latestAccountId = accounts.data.accounts[0];
        const eventCreatePayload = {
            item_id: latestAccountId.account,
            network_id: eventConfig.testnet.networkId,
        };

        console.log(`Creating Account ${eventCreatePayload.item_id} (${eventCreatePayload.network_id})`);      
        return createEventSettingsItem(eventCreatePayload, `account`, eventConfig.type.account);
    });


    it('Testnet | Contract | Create Event Settings with valid payload and not existing should create a Events settings item', async function () {
        // Arrange.
        const response = await restApiHandler.getContracts(false); 
        const latestContract = response.data.contracts[0];
        const eventCreatePayload = {
            item_id: latestContract.contract_id,
            network_id: eventConfig.testnet.networkId
        };
        console.log(`Creating Contract ${eventCreatePayload.item_id} (${eventCreatePayload.network_id})`);
        return createEventSettingsItem(eventCreatePayload, `contract`, eventConfig.type.contract);
    });


    //Mainnet
    it('Mainnet | Account | Create Event Settings with an invalid item should NOT create event settings', async function () {
        // Arrange.
        const eventCreatePayload = {
            item_id: `0.0.0000`,
            network_id: eventConfig.mainnet.networkId
        };
        return createEventSettingsInvalidItem(eventCreatePayload, `account`);
    });
 
    it('Mainnet | Account | Create Event Settings with a valid payload but already existing should NOT create a Events settings item', async function () {
        // Arrange.
        const eventCreatePayload = {
            item_id: eventConfig.mainnet.accountIdExists,
            network_id: eventConfig.mainnet.networkId
        };
        return createEventSettingsValidItemButAlreadyExists(eventCreatePayload, `account`);
    });
  
    it('Mainnet | Account | Create Event Settings with valid payload and not existing should create an Events settings item', async function () {
        // Arrange.
        // Only works if accounts are created constantly
        const accounts = await restApiHandler.getAccounts(true); 
        const latestAccountId = accounts.data.accounts[0];
        const eventCreatePayload = {
            item_id: latestAccountId.account,
            network_id: eventConfig.mainnet.networkId
        };
        return createEventSettingsItem(eventCreatePayload, `account`, eventConfig.type.account );
    });

    it('Mainnet | Contract | Create Event Settings with valid payload and not existing should create a Events settings item', async function () {
        // Arrange.
        const response = await restApiHandler.getContracts(true); 
        const latestContract = response.data.contracts[0];
        const eventCreatePayload = {
            item_id: latestContract.contract_id,
            network_id: eventConfig.mainnet.networkId
        };
        return createEventSettingsItem(eventCreatePayload, `contract`,  eventConfig.type.contract);
    });
    
});
