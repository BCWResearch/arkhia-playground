require("dotenv").config();
console.clear();
const restApiHandler = require("../../../rest-api/handlers/rest.api.handler");
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
    },
    randomEthTopics: [
        `0x90890809c654f11d6e72a28fa60149770a0d11ec6c92319d6ceb2bb0a4ea1a15`,
        `0x10890809c654f11d6e72a28fa60149770a0d11ec6c92319d6ceb2bb0a4ea1a15`,
        `0x20890809c654f11d6e72a28fa60149770a0d11ec6c92319d6ceb2bb0a4ea1a15`,
        `0x30890809c654f11d6e72a28fa60149770a0d11ec6c92319d6ceb2bb0a4ea1a15`,
        `0x40890809c654f11d6e72a28fa60149770a0d11ec6c92319d6ceb2bb0a4ea1a15`,
        `0x50890809c654f11d6e72a28fa60149770a0d11ec6c92319d6ceb2bb0a4ea1a15`,
        `0x60890809c654f11d6e72a28fa60149770a0d11ec6c92319d6ceb2bb0a4ea1a15`,
        `0x70890809c654f11d6e72a28fa60149770a0d11ec6c92319d6ceb2bb0a4ea1a15`,
        `0x80890809c654f11d6e72a28fa60149770a0d11ec6c92319d6ceb2bb0a4ea1a15`,
        `0x90890809c654f11d6e72a28fa60149770a0d11ec6c92319d6ceb2bb0a4ea1a15`,
        `0x11890809c654f11d6e72a28fa60149770a0d11ec6c92319d6ceb2bb0a4ea1a15`,
        `0x92890809c654f11d6e72a28fa60149770a0d11ec6c92319d6ceb2bb0a4ea1a15`,
        `0x93890809c654f11d6e72a28fa60149770a0d11ec6c92319d6ceb2bb0a4ea1a15`,
        `0x94890809c654f11d6e72a28fa60149770a0d11ec6c92319d6ceb2bb0a4ea1a15`,
        `0x95890809c654f11d6e72a28fa60149770a0d11ec6c92319d6ceb2bb0a4ea1a15`,
        `0x96890809c654f11d6e72a28fa60149770a0d11ec6c92319d6ceb2bb0a4ea1a15`,
        `0x97890809c654f11d6e72a28fa60149770a0d11ec6c92319d6ceb2bb0a4ea1a15`,
        `0x98890809c654f11d6e72a28fa60149770a0d11ec6c92319d6ceb2bb0a4ea1a15`,
        `0x99890809c654f11d6e72a28fa60149770a0d11ec6c92319d6ceb2bb0a4ea1a15`,
        `0x910890809c654f11d6e72a28fa60149770a0d11ec6c92319d6ceb2bb0a4ea1a15`,
    ]
};

const createEventSettingsInvalidArguments = async (eventCreatePayload, eventType) => {
    try {
        const response = await arkhiaApiHandler.createItemSettings(eventCreatePayload, eventType);
        return response;
    } 
    catch (error) {
        expect(error.response.data).toHaveProperty("status", false);
        expect(error.response.data.response).toContain("Key arguments are invalid (item_id/network_id/type)");
    }
}

const createEventSettingsInvalidItem = async (eventCreatePayload, eventType) => {
    try {
        const response = await arkhiaApiHandler.createItemSettings(eventCreatePayload, eventType);
        return response;
    } 
    catch (error) {
        expect(error.response.data).toHaveProperty("status", false);
        expect(error.response.data.response).toContain("Could not create item. Arguments invalid or item does not seem available in Hedera Mirror Node");
    }
}

const createEventSettingsValidItemButAlreadyExists = async (eventCreatePayload, eventType) => {
    try {
        const response = await arkhiaApiHandler.createItemSettings(eventCreatePayload, eventType);
        return response;
    } 
    catch (error) {
        console.log(error);
        expect(error.response.data).toHaveProperty("status", false);
        expect(error.response.data.response).toContain("Event settings already exists");
    }
}

const createEventSettingsItem = async (eventCreatePayload, eventType, eventId) => {
    try {
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
    } catch(error) {
        expect(error.data?.status).toHaveProperty("status", true);
        console.log(`Something went wrong`);
        console.log(error);
  
    }
}

describe("Test to validate Create Event Settings | Account ", () => {

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
        const settings = await arkhiaApiHandler.getItemSettings();
        const accountItem = settings.data?.response.find((item) => item.type_id == eventConfig.type.account && item.enabled == true);

        if (accountItem === null || accountItem === undefined) {
            console.info(`Could not find contract item to retrieve config.`);
            return;
        }

        const eventCreatePayload = {
            item_id: accountItem.item_id,
            network_id: accountItem.networkId
        };

        return createEventSettingsValidItemButAlreadyExists(eventCreatePayload, `account`);
    });

    it('Testnet | Account | Create Contract Settings with a valid payload but already existing should NOT create a Events settings item', async function () {
        // Arrange.
        const settings = await arkhiaApiHandler.getItemSettings();
        const contractItem = settings.data?.response.find((item) => item.type_id == eventConfig.type.contract && item.enabled == true);

        if (contractItem === null || contractItem === undefined) {
            console.info(`Could not find contract item to retrieve config.`);
            return;
        }

        const eventCreatePayload = {
            item_id: contractItem.item_id,
            network_id: contractItem.network_id
        };
        return createEventSettingsValidItemButAlreadyExists(eventCreatePayload, `contract`);
    });

    it('Testnet | Account | Create Event Settings with valid payload and not existing should create an Events settings item', async function () {
        // Arrange.
        const accounts = await restApiHandler.getAccounts(false); 
        const getRandomItem = Math.floor(Math.random() * 100);
        const latestAccountId = accounts.data.accounts[getRandomItem];
        const eventCreatePayload = {
            item_id: latestAccountId.account,
            network_id: eventConfig.testnet.networkId,
        };

        console.log(`Creating Account ${eventCreatePayload.item_id} (${eventCreatePayload.network_id})`);      
        return createEventSettingsItem(eventCreatePayload, `account`, eventConfig.type.account);
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
        const settings = await arkhiaApiHandler.getItemSettings();
        const accountItem = settings.data?.response.find((item) => item.type_id == eventConfig.type.account && item.enabled == true);

        if (accountItem === null || accountItem === undefined) {
            console.info(`Could not find account item to retrieve config.`);
            return;
        }
        // Act.
        const eventCreatePayload = {
            item_id: accountItem.item_id,
            network_id: accountItem.networkId
        };
        return createEventSettingsValidItemButAlreadyExists(eventCreatePayload, `account`);
    });
  
    it('Mainnet | Account | Create Event Settings with valid payload and not existing should create an Events settings item', async function () {
        // Arrange.
        const accounts = await restApiHandler.getAccounts(true);
        const getRandomItem = Math.floor(Math.random() * 100);
        const latestAccountId = accounts.data.accounts[getRandomItem];
        const eventCreatePayload = {
            item_id: latestAccountId.account,
            network_id: eventConfig.mainnet.networkId
        };
        return createEventSettingsItem(eventCreatePayload, `account`, eventConfig.type.account );
    });
});

describe("Test to validate Create Event Settings | Contract ", () => {

    beforeAll(() => {

    });

    it('Testnet | Account | Create Event Settings with an invalid item should NOT create event settings', async function () {
        // Arrange.
        const eventCreatePayload = {
            item_id: `0.0.0000`,
            network_id: eventConfig.testnet.networkId,
        };
        return createEventSettingsInvalidItem(eventCreatePayload, `contract`);
    });

    it('Testnet | Account | Create Event Settings with a invalid arguments should return message', async function () {
        // Arrange.
        const eventIncompleteCreatePayload = {
            network_id: eventConfig.testnet.networkId,
        };
        return createEventSettingsInvalidArguments(eventIncompleteCreatePayload, `contract`);
    });

    it('Testnet | Contract | Create Event Settings with valid payload and not existing should create a Events settings item', async function () {
        // Arrange.
        const response = await restApiHandler.getContracts(false);
        const getRandomItem = Math.floor(Math.random() * 100);
        const latestContract = response.data.contracts[getRandomItem];
        const eventCreatePayload = {
            item_id: latestContract.contract_id,
            network_id: eventConfig.testnet.networkId
        };
        return createEventSettingsItem(eventCreatePayload, `contract`,  eventConfig.type.contract);
    }); 

    it('Mainnet | Contract | Create Event Settings with valid payload and not existing should create a Events settings item', async function () {
        // Arrange.
        const response = await restApiHandler.getContracts(true);
        const getRandomItem = Math.floor(Math.random() * 100);
        const latestContract = response.data.contracts[getRandomItem];
        const eventCreatePayload = {
            item_id: latestContract.contract_id,
            network_id: eventConfig.mainnet.networkId
        };
        return createEventSettingsItem(eventCreatePayload, `contract`,  eventConfig.type.contract);
    });

});


describe("Test to validate Create Event Settings | EthTopic ", () => {

    beforeAll(() => {

    });

    it('Mainnet | EthTopic | Create Event Settings with valid payload and not existing should create a Events settings item', async function () {
        // Arrange.
        const getRandomItem = Math.floor(Math.random() * 20);
        const eventCreatePayload = {
            item_id: eventConfig.randomEthTopics[getRandomItem],
            network_id: eventConfig.mainnet.networkId
        };
        return createEventSettingsItem(eventCreatePayload, `ethtopic`,  eventConfig.type.ethTopic);
    });

    it('Testnet | EthTopic | Create Event Settings with valid payload and not existing should create a Events settings item', async function () {
        // Arrange.
        const getRandomItem = Math.floor(Math.random() * 20);
        const eventCreatePayload = {
            item_id: eventConfig.randomEthTopics[getRandomItem],
            network_id: eventConfig.testnet.networkId
        };
        return createEventSettingsItem(eventCreatePayload, `ethtopic`,  eventConfig.type.ethTopic);
    });

});
