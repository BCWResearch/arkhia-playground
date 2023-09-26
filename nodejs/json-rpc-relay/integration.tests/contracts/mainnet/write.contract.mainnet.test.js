console.clear();

require('dotenv').config({path: '.env'});
const { ethers } = require("ethers");
const urlHandler = require('../../../../handlers/url.handler');
const fs = require('fs');
const path = require('path');
const privateECDSAAccount = process.env.MAINNET_OPERATOR_PRIVATE_KEY;

const mainnetContractConfig = {
    id: ``,
    sol_id: ``
}

describe('[Ethers] Signed RawTransaction', () => {

    test('Mainnet | Should make raw transaction into Contract', async () => {
        // Arrange
        const provider = new ethers.providers.JsonRpcProvider(urlHandler.getJsonRpcMainnet());
        const signer = new ethers.Wallet(privateECDSAAccount, provider);
        const contractPath = path.join(__dirname, '/');

        const contractJson = fs.readFileSync(`${contractPath}/../artifact/example.contract.json`);
        const ABI = JSON.parse(contractJson);
        const sampleContract = new ethers.Contract(mainnetContractConfig.sol_id, ABI, signer)
        const newCreator = `ARKHIA ${new Date().toDateString()}`;

        // Act
        const changeCreator = await sampleContract.setCreator(newCreator);
        await changeCreator.wait();
        const metadata = await sampleContract.getContractMetadata();

        // Assert
        console.log(``);
        expect(changeCreator).toHaveProperty('data');
        expect(metadata).toBeDefined();
        expect(metadata.creatorName).toEqual(newCreator);
    });

});
