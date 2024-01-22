require("dotenv").config();
console.clear();
const arkhiaApiHandler = require("../../arkhia.api.handler");

const queryBalanceAccounts = {
    testnet: [
        '0.0.1',
        '0.0.2',
        '0.0.3',
        '0.0.4',
        '0.0.5',
    ],
    mainnet: [
        '0.0.92',
        '0.0.93',
        '0.0.94',
        '0.0.95',
        '0.0.96',
    ]
}
const networkTag = {
    mainnnet: `mainnet`,
    testnet: `testnet`
};

const getFromToDate = (days = 1) => {
    const date = new Date().setDate(new Date().getDate() - days);
    const from = new Date(date);
    const to = new Date(new Date(date).setDate(from.getDate() + Math.abs(days)));
    return {
        from: from.toISOString().split('T')[0],
        to: to.toISOString().split('T')[0]
    };
}

const callArkhiaAPIWithNoKey = async () => {
    try {
        const dates = getFromToDate();
        const response = await arkhiaApiHandler.getArkhiaApiNetworkAccounts(
            networkTag.testnet,
            dates.from,
            dates.to,
            undefined, // interval is optional
            ``
        );
        return response;
    }
    catch (error) {
        expect(error.response.data).toHaveProperty("status", false);
        expect(error.response.data.response).toContain("Please send a valid API key");
    }
}

const callArkhiaAPIWithInvalidKey = async () => {
    try {
        const dates = getFromToDate();
        const response = await arkhiaApiHandler.getArkhiaApiNetworkAccounts(
            networkTag.testnet,
            dates.from,
            dates.to,
            undefined, // interval is optional
            `invalidApiKey`
        );
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
        const dates = getFromToDate();
        const response = await arkhiaApiHandler.getArkhiaApiNetworkAccounts(
            networkTag.testnet,
            dates.from,
            dates.to,
            undefined, // interval is optional
            undefined, // use default api key
            `` // api secret is modified
        );
        return response;
    }
    catch (error) {
        expect(error.response.data).toHaveProperty("status", false);
        expect(error.response.data.response).toContain("You have enabled 2 layer security. Please send a valid API secret in the body");
    }
}

const callArkhiaAPIWithInvalidInterval = async () => {
    try {
        const dates = getFromToDate();
        const response = await arkhiaApiHandler.getArkhiaApiNetworkAccounts(
            networkTag.testnet,
            dates.from,
            dates.to,
            'invalidInterval',
        );
        return response;
    }
    catch (error) {
        console.log(error);
        expect(error.response.data).toHaveProperty("status", false);
        expect(error.response.data.response).toContain("Please send a valid granularity. The granularity that are currently supported are hour1, day1, week1, month1");
    }
}

const callArkhiaAPIWithInvalidDateFormat = async () => {
    try {
        const response = await arkhiaApiHandler.getArkhiaApiNetworkAccounts(
            networkTag.testnet,
            'invalidDate',
            'invalidDate'
        );
        return response;
    }
    catch (error) {
        console.log(error);
        expect(error.response.data).toHaveProperty("status", false);
        expect(error.response.data.response).toContain("Please send a date in the format yyyy-mm-dd");
    }
}

const callArkhiaAPIWithInvalidNetwork = async () => {
    try {
        const dates = getFromToDate();
        const response = await arkhiaApiHandler.getArkhiaApiNetworkAccounts(
            'invalidNetwork',
            dates.from,
            dates.to
        );
        return response;
    }
    catch (error) {
        console.log(error);
        expect(error.response.data).toHaveProperty("status", false);
        expect(error.response.data.response).toContain("Please send a valid network. The networks that are currently supported are mainnet, testnet");
    }
}

const callArkhiaAPIWithInvalidProtocol = async () => {
    try {
        const dates = getFromToDate();
        const response = await arkhiaApiHandler.getArkhiaApiNetworkAccounts(
            networkTag.testnet,
            dates.from,
            dates.to,
            undefined,
            undefined,
            undefined,
            {
                protocol: 'invalidProtocol'
            }

        );
        return response;
    }
    catch (error) {
        console.log(error);
        expect(error.response.data).toHaveProperty("status", false);
        expect(error.response.data.response).toContain("Please send a valid protocol. The protocols that are currently supported are hedera, polygon");
    }
}

describe("Test to validate Arkhia API authentication layer", () => {

    it('Call Analytics [Arkhia API] with an invalid ApiKey should return false', async function () {
        return callArkhiaAPIWithInvalidKey();
    });

    it('Call Analytics [Arkhia API] without ApiKey should be invalid should return false', async function () {
        return callArkhiaAPIWithNoKey();
    });

    it('Call Analytics [Arkhia API] without ApiSecret should return false', async function () {
        return callArkhiaAPIWithValidKeyButWithoutApiSecret();
    });
});

describe("Test to validate Analytics [Arkhia API] query validator", () => {

    it('Call Analytics [Arkhia API] with an invalid interval', async function () {
        return callArkhiaAPIWithInvalidInterval();
    });

    it('Call Analytics [Arkhia API] with an invalid date format yyyy-mm-dd', async function () {
        return callArkhiaAPIWithInvalidDateFormat();
    });

    it('Call Analytics [Arkhia API] with an invalid network', async function () {
        return callArkhiaAPIWithInvalidNetwork();
    });

    it('Call Analytics [Arkhia API] with an invalid protocol', async function () {
        return callArkhiaAPIWithInvalidProtocol();
    });
});

describe("Test to validate Analytics [Arkhia API] account response", () => {

    it('Call Analytics [Arkhia API] with an ahead date should return empty response', async function () {
        const dates = (getFromToDate(-1));
        const response = await arkhiaApiHandler.getArkhiaApiNetworkAccounts(
            networkTag.testnet,
            dates.from,
            dates.to
        );
        expect(response.data).toHaveProperty("status", true);
        expect(response.data.response).toHaveLength(0);
    });

    it('Call Analytics [Arkhia API] with a valid date should return response [network:testnet]', async function () {
        const dates = getFromToDate();
        await Promise.all(queryBalanceAccounts.testnet.map((account) =>
            arkhiaApiHandler.getNetworkAccountBalance(networkTag.testnet, account))
        );
        const response = await arkhiaApiHandler.getArkhiaApiNetworkAccounts(
            networkTag.testnet,
            dates.from,
            dates.to
        );
        expect(response.data).toHaveProperty("status", true);
        expect(response.data.response.length).toBeGreaterThan(0);
        expect(response.data.response[0]).toHaveProperty("accounts");
        expect(response.data.response[0].accounts.split(',')).toEqual(expect.arrayContaining(queryBalanceAccounts.testnet));
    });

    it('Call Analytics [Arkhia API] with a valid date should return response [network:mainnet]', async function () {
        const dates = getFromToDate();
        await Promise.all(queryBalanceAccounts.mainnet.map((account) =>
            arkhiaApiHandler.getNetworkAccountBalance(networkTag.mainnnet, account))
        );
        const response = await arkhiaApiHandler.getArkhiaApiNetworkAccounts(
            networkTag.mainnnet,
            dates.from,
            dates.to
        );
        expect(response.data).toHaveProperty("status", true);
        expect(response.data.response.length).toBeGreaterThan(0);
        expect(response.data.response[0]).toHaveProperty("accounts");
        expect(response.data.response[0].accounts.split(',')).toEqual(expect.arrayContaining(queryBalanceAccounts.mainnet));
    });

});