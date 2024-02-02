console.clear();

require('dotenv').config({path: '.env'});
const Web3 = require('web3');
const { ethers } = require("ethers");
const urlHandler = require('../../../../handlers/url.handler');
const fs = require('fs');
const path = require('path');

const testnetContractConfig = {
    id: `0.0.1194516`,
    sol_id: `0x943eE4fe771C01388a78717C173080e173cf70c4`
}


describe('[Ethers] Signed RawTransaction', () => {

    test('Testnet | Should make raw transaction into Contract', async () => {
        // Arrange
        const privateECDSAAccount = `a7d04198bd49b444525e17f657619b331360ff48929f4b3aac1d3c6e5ebacb0b`;
        const provider = new ethers.providers.JsonRpcProvider(urlHandler.getJsonRpcTestnet());
        const signer = new ethers.Wallet(privateECDSAAccount, provider);
        const contractPath = path.join(__dirname, '/');

        const contractJson = fs.readFileSync(`${contractPath}/../artifact/example.contract.json`);
        const ABI = JSON.parse(contractJson);
        const sampleContract = new ethers.Contract(testnetContractConfig.sol_id, ABI, signer)
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




