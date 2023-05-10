console.clear();

require('dotenv').config({path: '.env'});
const Web3 = require('web3');
const { ethers } = require("ethers");
const urlHandler = require('../../../../handlers/url.handler');
const fs = require('fs');
const path = require('path');

const testnetContractConfig = {
    id: `0.0.4636994`,
    sol_id: `0x144C635a33C21d8225ea7764FcE5C205915cBe2f`
}


describe('[Ethers] Signed RawTransaction', () => {

    test('Testnet | Should make raw transaction into Contract', async () => {
        // Arrange
        const privateECDSAAccount = `0x8eaecc9af6db21e7bc66032d9891563e68e2930ac2a09da6c5872a92a3790203`;
        const provider = new ethers.providers.JsonRpcProvider(urlHandler.getJsonRpcTestnet());
        const signer = new ethers.Wallet(privateECDSAAccount, provider);
        const contractPath = path.join(__dirname, '/');

        const contractJson = fs.readFileSync(`${contractPath}/artifact/example.contract.json`);
        const ABI = JSON.parse(contractJson);
        const sampleContract = new ethers.Contract(testnetContractConfig.sol_id, ABI, signer)
        const newCreator = `ARKHIA ${new Date().toDateString()}`;

        // Act
        const changeCreator = await sampleContract.setCreator(newCreator);
        const metadata = await sampleContract.getContractMetadata();

        // Assert
        expect(changeCreator).toHaveProperty('data');
        expect(metadata).toBeDefined();
        expect(metadata.creatorName).toEqual(newCreator);
    });

});




