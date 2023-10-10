require("dotenv").config();
console.clear();

const getArkhiaApiStatus = async (isMainnet) => {
    try {
        const response = await arkhiaApiHandler.getArkhiaApiStatus(true);
        return response;
    } 
    catch (error) {
        expect(error.response.data).toHaveProperty("status", false);
        expect(error.response.data.response).toContain("Please send a valid API key");
    }
}

describe("Test to validate Status API", () => {

    it('Call Arkhia API with no APi Key should return false', async function () {

    });

    it('Call Arkhia API with a free API Key should return false', async function () {

    });

    it('Call Arkhia API with a paid API Key should return true and with a valid payload', async function () {

    });

});
