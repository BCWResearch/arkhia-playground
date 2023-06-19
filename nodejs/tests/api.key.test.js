require("dotenv").config();
console.clear();

const axios = require("axios");
const urlHandler = require("../handlers/url.handler");

// Arkhia config
const apiKey = process.env.ARKHIA_API_KEY;
const headers = { "x-api-key": apiKey };

describe("Test to validate API key", () => {
  test("The API key is available and has correct length", () => {
    expect(apiKey).toBeDefined();
    expect(apiKey.length).toEqual(32);
  });

  test("The API Key is authorized", async () => {
    try {
      const balancesUrl = `${urlHandler.getApiUrl()}/balances`;
      const response = await axios.get(balancesUrl, { headers });
    } catch (error) {
      expect(error.response.data).toHaveProperty("status", false);
      expect(error.response.data.response).toContain("Unauthorized");
      console.error(error.response.data.response);
    }
  });

  test("The API Key is valid for its tier", async () => {
    try {
      const balancesUrl = `${urlHandler.getApiUrl()}/balances`;
      const response = await axios.get(balancesUrl, { headers });
    } catch (error) {
      expect(error.response.data).toHaveProperty("status", false);
      expect(error.response.data.response).toContain(
        "You have upgraded your account to a paid tier. Please use the upgraded URL for an enhanced experience"
      );
      console.error(error.response.data.response);
    }
  });
});
