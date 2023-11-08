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

const updateSettingsItemIncorrectAbi = async(updateSettingsPayload, itemType, configType) => {
    const response = await arkhiaApiHandler.updateItemsCategoryConfig(updateSettingsPayload, itemType, configType);
    expect(response.data).toHaveProperty('status', false);

    const configItem = response.data.message;
    expect(configItem).toBeDefined();
    expect(configItem[0]).toBeDefined();
    expect(configItem[0]).toHaveProperty('message', 'must be array')
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
       return updateSettingsItemIncorrectAbi(updateSettingsPayload, 'contract', 'abi');
    });

    it('Should save an ABI item if its a valid Abi file', async function () {
        const config = await getEventsItem(eventConfig.type.contract, 'contract');
        const contractAbi = [{"inputs":[{"internalType":"string","name":"_creatorName","type":"string"},{"internalType":"string","name":"_tokenSymbol","type":"string"},{"internalType":"string","name":"_tokenName","type":"string"},{"internalType":"uint256","name":"_tokenSupply","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"},{"indexed":false,"internalType":"string","name":"name","type":"string"},{"indexed":false,"internalType":"string","name":"message","type":"string"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"FairTradeEvent","type":"event"},{"stateMutability":"payable","type":"fallback"},{"inputs":[],"name":"getContractBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getContractMetadata","outputs":[{"components":[{"internalType":"string","name":"creatorName","type":"string"},{"internalType":"string","name":"tokenSymbol","type":"string"},{"internalType":"string","name":"tokenName","type":"string"},{"internalType":"uint256","name":"tokenSupply","type":"uint256"},{"internalType":"address","name":"tokenAddress","type":"address"}],"internalType":"struct FairTradeCoffee.FairTradeMetadata","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getFairTradeBuyerNumbers","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getFairTradeBuyers","outputs":[{"components":[{"internalType":"address","name":"from","type":"address"},{"internalType":"uint256","name":"timestamp","type":"uint256"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"message","type":"string"},{"internalType":"uint256","name":"amount","type":"uint256"}],"internalType":"struct FairTradeCoffee.FairTradeBuyer[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTokenRemainingBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_message","type":"string"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"makeDonationHbars","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"mintFungibleToken","outputs":[{"internalType":"address","name":"createdTokenAddress","type":"address"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"withdrawDonations","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}];

        const updateSettingsPayload = {
            item_id: config.item_id,
            network_id: config.network_id,
            config_type: config.config_type,
            config_object: contractAbi,
        };

       return updateSettingsItem(updateSettingsPayload, 'contract', 'abi');
    });

});
