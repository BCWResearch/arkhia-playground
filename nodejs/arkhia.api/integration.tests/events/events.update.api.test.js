const arkhiaApiHandler = require("../../arkhia.api.handler");

require("dotenv").config();
console.clear();

const eventConfig = {
    type : {
        account: 1,
        contract: 2
    },
};

const updateSettingsItemEventPropertyMissing = async(updateSettingsPayload, itemType, configType, expectedMessage) => {
    const response = await arkhiaApiHandler.updateItemsCategoryConfig(updateSettingsPayload, itemType, configType);
    expect(response.data).toHaveProperty('status', false);

    const configItem = response.data.message;
    expect(configItem).toBeDefined();
    expect(configItem[0]).toBeDefined();
    expect(configItem[0]).toHaveProperty('message', expectedMessage)
    return response;
}

const updateSettingsItem = async (updateSettingsPayload) => {
    const itemType = 'contract';
    const configType = 'events';
    const response = await arkhiaApiHandler.updateItemsCategoryConfig(updateSettingsPayload, 'contract', 'events');

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

const getContractItem = async() => { 
   // Get a list of all our available contracts
   const settings = await arkhiaApiHandler.getItemSettings();
   const contractItem = settings.data?.response.find((item) => item.type_id == eventConfig.type.contract && item.enabled == true);

   if (contractItem === null || contractItem === undefined) {
       console.info(`Could not find contract item to retrieve config.`);
       return;
   }

   // Get one payload and load the events config
   const settingsPayload = {
       item_id: contractItem.item_id,
       network_id: contractItem.network_id,
   };
   const response = await arkhiaApiHandler.getItemsCategoryConfig(settingsPayload, `contract`, `events`);
   
   expect(response.data.response).toHaveProperty("config_type", 'events');
   const config = response.data.response;
   return config;
}

describe("Test to validate Update Contract Event Settings", () => {

    it('Contract | Event | Should not add an Event without adding event name', async function () {
        const config = await getContractItem();
        const configObject = [ 
            { 
                eventId: `${config.item_id}_${config.network_id}_randomEvent`,
            }
        ];
        const updateSettingsPayload = {
            item_id: config.item_id,
            network_id: config.network_id,
            config_type: config.config_type,
            config_object: configObject,
        };
        return updateSettingsItemEventPropertyMissing(updateSettingsPayload, `contract`, `events`, "must have required property 'eventName'");
    });

    it('Contract | Event | Should not add an Event with invalid adding eventId', async function () {
        const config = await getContractItem();
        const eventName = "randomNewEvent";
        const configObject = [ 
            { 
                eventName:eventName
            }
        ];
        const updateSettingsPayload = {
            item_id: config.item_id,
            network_id: config.network_id,
            config_type: config.config_type,
            config_object: configObject,
        };
        return updateSettingsItemEventPropertyMissing(updateSettingsPayload, `contract`, `events`, "must have required property 'eventId'");
    });


    it('Contract | Event | Should be able to add an Event after getting the config', async function () {
        const config = await getContractItem();
        const eventName = "randomNewEvent";
        const configObject = [ 
            { 
                eventId: `${config.item_id}_${config.network_id}_${eventName}`,
                eventName: `${eventName}`
            }
        ];
        const updateSettingsPayload = {
            item_id: config.item_id,
            network_id: config.network_id,
            config_type: config.config_type,
            config_object: configObject,
        };
        return updateSettingsItem(updateSettingsPayload);
    });
});

describe("Test to validate Update Contract Event Rules Settings", () => {

    it('Contract | Event | Rule | Should not be able to add an invalid Event Rule missing polling_interval', async function () {
        const config = await getContractItem();
        const eventName = "randomNewEvent";
        const configObject = [ 
            { 
                eventId: `${config.item_id}_${config.network_id}_${eventName}`,
                eventName: `${eventName}`,
                eventRules: [
                    {
                        ruleId: "FairTradeEvent_rule0",
                        ruleName: "FairTradeEvent Rule0",
                        enabled: true,
                        email_notification: false,
                    }
                ]
            }
        ];
        const updateSettingsPayload = {
            item_id: config.item_id,
            network_id: config.network_id,
            config_type: config.config_type,
            config_object: configObject,
        };
        return updateSettingsItemEventPropertyMissing(updateSettingsPayload, `contract`, `events`, "must have required property 'polling_interval'");
    });

    it('Contract | Event | Rule | Should not be able to add an invalid Event Rule with an invalid email_notification type', async function () {
        const config = await getContractItem();
        const eventName = "randomNewEvent";
        const configObject = [ 
            { 
                eventId: `${config.item_id}_${config.network_id}_${eventName}`,
                eventName: `${eventName}`,
                eventRules: [
                    {
                        ruleId: "FairTradeEvent_rule0",
                        ruleName: "FairTradeEvent Rule0",
                        enabled: "something",
                        email_notification: false,
                        polling_interval: 1000,
                    }
                ]
            }
        ];
        const updateSettingsPayload = {
            item_id: config.item_id,
            network_id: config.network_id,
            config_type: config.config_type,
            config_object: configObject,
        };
        return updateSettingsItemEventPropertyMissing(updateSettingsPayload, `contract`, `events`, "must be boolean");
    });

    it('Contract | Event | Rule | Should be able to add a valid Event Rule and return the same object', async function () {
        const config = await getContractItem();
        const eventName = "randomNewEvent";
        const configObject = [ 
            { 
                eventId: `${config.item_id}_${config.network_id}_${eventName}`,
                eventName: `${eventName}`,
                eventRules: [
                    {
                        ruleId: "FairTradeEvent_rule0",
                        ruleName: "FairTradeEvent Rule0",
                        enabled: true,
                        email_notification: false,
                        polling_interval: 1000,
                    }
                ]
            }
        ];
        const updateSettingsPayload = {
            item_id: config.item_id,
            network_id: config.network_id,
            config_type: config.config_type,
            config_object: configObject,
        };
        return updateSettingsItem(updateSettingsPayload);
    });

});





describe("Test to validate Update Contract Event Rule [Parameters] Settings", () => {

    it('Contract | Event | Rule | Parameter | Should not be able to add an invalid Event Rule Parameter missing parameterName', async function () {
        const config = await getContractItem();
        const eventName = "randomNewEvent";
        const configObject = [ 
            { 
                eventId: `${config.item_id}_${config.network_id}_${eventName}`,
                eventName: `${eventName}`,
                eventRules: [
                    {
                        ruleId: "FairTradeEvent_rule0",
                        ruleName: "FairTradeEvent Rule0",
                        enabled: true,
                        email_notification: false,
                        polling_interval: 1000,
                        parameterCollection: [
                            {
                                enabled: true,
                                parameterId: "FairTradeEvent_rule0_from",
                                parameterType: "string",
                                parameterName: "ParameterName",
                                parameterRule: 1,
                                parameterRuleValue: "dummyvalue1",
                                webhooks: []
                            },
                            {
                                enabled: true,
                                parameterId: "FairTradeEvent_rule0_from",
                                parameterType: "string",
                                parameterRule: 1,
                                parameterRuleValue: "dummyvalue1",
                                webhooks: []
                            },
                        ]
                    }
                ]
            }
        ];
        const updateSettingsPayload = {
            item_id: config.item_id,
            network_id: config.network_id,
            config_type: config.config_type,
            config_object: configObject,
        };
        return updateSettingsItemEventPropertyMissing(updateSettingsPayload, `contract`, `events`, "must have required property 'parameterName'");
    });

    it('Contract | Event | Rule | Parameter | Should not be able to add an invalid Event Rule Parameter with invalid Parameter Rule', async function () {
        const config = await getContractItem();
        const eventName = "randomNewEvent";
        const configObject = [ 
            { 
                eventId: `${config.item_id}_${config.network_id}_${eventName}`,
                eventName: `${eventName}`,
                eventRules: [
                    {
                        ruleId: "FairTradeEvent_rule0",
                        ruleName: "FairTradeEvent Rule0",
                        enabled: true,
                        email_notification: false,
                        polling_interval: 1000,
                        parameterCollection: [
                            {
                                enabled: true,
                                parameterId: "FairTradeEvent_rule0_from",
                                parameterType: "string",
                                parameterName: "ParameterName",
                                parameterRule: 1,
                                parameterRuleValue: "dummyvalue1",
                                webhooks: []
                            },
                            {
                                enabled: true,
                                parameterId: "FairTradeEvent_rule0_from",
                                parameterType: "string",
                                parameterName: "ParameterName",
                                parameterRule: "myrule",
                                parameterRuleValue: "dummyvalue1",
                                webhooks: []
                            },
                        ]
                    }
                ]
            }
        ];
        const updateSettingsPayload = {
            item_id: config.item_id,
            network_id: config.network_id,
            config_type: config.config_type,
            config_object: configObject,
        };
        return updateSettingsItemEventPropertyMissing(updateSettingsPayload, `contract`, `events`, "must be number");
    });

    it('Contract | Event | Rule | Parameter | Should be able to add an valid Event Rule Parameter with a valid payload', async function () {
        const config = await getContractItem();
        const eventName = "randomNewEvent";
        const configObject = [ 
            { 
                eventId: `${config.item_id}_${config.network_id}_${eventName}`,
                eventName: `${eventName}`,
                eventRules: [
                    {
                        ruleId: "FairTradeEvent_rule0",
                        ruleName: "FairTradeEvent Rule0",
                        enabled: true,
                        email_notification: false,
                        polling_interval: 1000,
                        parameterCollection: [
                            {
                                enabled: true,
                                parameterId: "FairTradeEvent_rule0_from",
                                parameterType: "string",
                                parameterName: "ParameterName",
                                parameterRule: 1,
                                parameterRuleValue: "dummyvalue1",
                                webhooks: []
                            },
                            {
                                enabled: true,
                                parameterId: "FairTradeEvent_rule0_from",
                                parameterType: "string",
                                parameterName: "ParameterName",
                                parameterRule: 1,
                                parameterRuleValue: "dummyvalue1",
                                webhooks: []
                            },
                        ]
                    }
                ]
            }
        ];
        const updateSettingsPayload = {
            item_id: config.item_id,
            network_id: config.network_id,
            config_type: config.config_type,
            config_object: configObject,
        };
        console.log(`Updating item ${config.item_id} / ${config.network_id}`);
        return updateSettingsItem(updateSettingsPayload);
    });
});

describe("Test to validate Update Contract Event Rule [Webhooks] Settings", () => {

    it('Contract | Event | Rule | Webhooks| Should not be able to add an invalid Event Rule Webhook with missing value', async function () {
        const config = await getContractItem();
        const eventName = "randomNewEvent";
        const configObject = [ 
            { 
                eventId: `${config.item_id}_${config.network_id}_${eventName}`,
                eventName: `${eventName}`,
                eventRules: [
                    {
                        ruleId: "FairTradeEvent_rule0",
                        ruleName: "FairTradeEvent Rule0",
                        enabled: true,
                        email_notification: false,
                        polling_interval: 1000,
                        webhooks: [
                            {
                                tag: "api-micro",
                                key: "api-micro",
                                value: "https://www.mywebhook.com",
                                type: "get",
                                active: true
                            },
                            {
                                tag: "api-micro",
                                type: "get",
                                active: true
                            }
                        ]
                    }
                ]
            }
        ];
        const updateSettingsPayload = {
            item_id: config.item_id,
            network_id: config.network_id,
            config_type: config.config_type,
            config_object: configObject,
        };
        return updateSettingsItemEventPropertyMissing(updateSettingsPayload, `contract`, `events`, "must have required property 'key'");
    });

    it('Contract | Event | Rule | Webhooks| Should not be able to add an invalid Event Rule Webhook with invalid value', async function () {
        const config = await getContractItem();
        const eventName = "randomNewEvent";
        const configObject = [ 
            { 
                eventId: `${config.item_id}_${config.network_id}_${eventName}`,
                eventName: `${eventName}`,
                eventRules: [
                    {
                        ruleId: "FairTradeEvent_rule0",
                        ruleName: "FairTradeEvent Rule0",
                        enabled: true,
                        email_notification: false,
                        polling_interval: 1000,
                        webhooks: [
                            {
                                tag: "api-micro",
                                key: "api-micro",
                                value: "https://www.mywebhook.com",
                                type: "get",
                                active: true
                            },
                            {
                                tag: "api-micro",
                                key: "api-micro",
                                value: true,
                                type: "get",
                                active: true
                            }
                        ]
                    }
                ]
            }
        ];
        const updateSettingsPayload = {
            item_id: config.item_id,
            network_id: config.network_id,
            config_type: config.config_type,
            config_object: configObject,
        };
        return updateSettingsItemEventPropertyMissing(updateSettingsPayload, `contract`, `events`, "must be string");
    });

    it('Contract | Event | Rule | Webhooks| Should be able to add a valid Event Rule Webhook with valid payload', async function () {
        const config = await getContractItem();
        const eventName = "randomNewEvent";
        const configObject = [ 
            { 
                eventId: `${config.item_id}_${config.network_id}_${eventName}`,
                eventName: `${eventName}`,
                eventRules: [
                    {
                        ruleId: "FairTradeEvent_rule0",
                        ruleName: "FairTradeEvent Rule0",
                        enabled: true,
                        email_notification: false,
                        polling_interval: 1000,
                        webhooks: [
                            {
                                tag: "api-micro",
                                key: "api-micro",
                                value: "https://www.mywebhook.com",
                                type: "get",
                                active: true
                            },
                            {
                                tag: "api-micro",
                                key: "api-micro",
                                value: "https://www.mywebhook.com",
                                type: "get",
                                active: true
                            }
                        ]
                    }
                ]
            }
        ];
        const updateSettingsPayload = {
            item_id: config.item_id,
            network_id: config.network_id,
            config_type: config.config_type,
            config_object: configObject,
        };
        return updateSettingsItem(updateSettingsPayload);
    });

});