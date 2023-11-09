const arkhiaApiHandler = require("../../arkhia.api.handler");

require("dotenv").config();
console.clear();

const eventConfig = {
    type : {
        account: 1,
        contract: 2,
        ethTopic: 5,
    },
};

const updateSettingsItemIncorrectAbi = async(updateSettingsPayload, itemType, configType, errorMessage) => {
    const response = await arkhiaApiHandler.updateItemsCategoryConfig(updateSettingsPayload, itemType, configType);
    expect(response.data).toHaveProperty('status', false);

    const configItem = response.data.message;
    expect(configItem).toBeDefined();
    expect(configItem[0]).toBeDefined();
    console.log(configItem);
    expect(configItem[0]).toHaveProperty('message', errorMessage)
    return response;
}

const updateSettingsItem = async (updateSettingsPayload, itemType = 'contract', configType = 'events') => {
    const response = await arkhiaApiHandler.updateItemsCategoryConfig(updateSettingsPayload, itemType , configType);

    expect(response.data).toHaveProperty('status', true);
    const configItem = response.data.response;
    expect(configItem).toBeDefined();
    expect(configItem).toHaveProperty('item_id');
    expect(configItem).toHaveProperty('network_id');
    expect(configItem).toHaveProperty('item_type',itemType);
    expect(configItem).toHaveProperty('config_type', configType);
    expect(configItem).toHaveProperty('config_object', updateSettingsPayload.config_object);
    return response;
}

const getEventsItem = async(typeId, typeTag) => { 
   // Get a list of all our available contracts
   const settings = await arkhiaApiHandler.getItemSettings();
   const eventItem = settings.data?.response.find((item) => item.type_id == typeId);

   if (eventItem === null || eventItem  === undefined) {
       console.info(`Could not find event item to retrieve config.`);
       return;
   }

   // Get one payload and load the events config
   const settingsPayload = {
       item_id: eventItem.item_id,
       network_id: eventItem.network_id,
   };
   const response = await arkhiaApiHandler.getItemsCategoryConfig(settingsPayload, typeTag, `abi`);
   
   expect(response.data.response).toHaveProperty("config_type", 'abi');
   const config = response.data.response;
   return config;
}

describe("Test to validate Update ABI Item", () => {

    it('Should not save an ABI item if its not a valid abi file', async function () {
        const config = await getEventsItem(eventConfig.type.contract, 'contract');
        const contractAbi = 'randomstring';
        const updateSettingsPayload = {
            item_id: config.item_id,
            network_id: config.network_id,
            config_type: config.config_type,
            config_object: contractAbi,
        };
       return updateSettingsItemIncorrectAbi(updateSettingsPayload, 'contract', 'abi', 'must be array');
    });

    it('Should not save an ABI item if it does not have events as an ABI file', async function () {
        const config = await getEventsItem(eventConfig.type.contract, 'contract');
        const contractAbi = [{key: 'random'}];
        const updateSettingsPayload = {
            item_id: config.item_id,
            network_id: config.network_id,
            config_type: config.config_type,
            config_object: contractAbi,
        };

       return updateSettingsItemIncorrectAbi(updateSettingsPayload, 'contract', 'abi', 'No valid events detected in the ABI file.');
    });


    it('Should save an ABI item if its a valid Abi file', async function () {
        const config = await getEventsItem(eventConfig.type.contract, 'contract');
        const contractAbi = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}];
        const updateSettingsPayload = {
            item_id: config.item_id,
            network_id: config.network_id,
            config_type: config.config_type,
            config_object: contractAbi,
        };

       return updateSettingsItem(updateSettingsPayload, 'contract', 'abi');
    });

});
