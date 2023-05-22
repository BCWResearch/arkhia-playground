console.clear();

require('dotenv').config({path: '.env'});
const Web3 = require('web3');
const { ethers } = require("ethers");
const urlHandler = require('../../../../handlers/url.handler');
const fs = require('fs');
const path = require('path');

const testnetContractConfig = {
    id: `0.0.13333712`,
    sol_id: `0x39AD67BaCe90AB651fC2D7615625F4bB4816BdeE`
}


describe('[Ethers] Signed RawTransaction', () => {

    test('Testnet | Should make raw transaction into Contract', async () => {
        // Arrange
        const privateECDSAAccount = `0xbc5daad36686fd629a93ae8bcd1a833d93df62eaaa307f5ffa69a592ff44b360`;
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
        console.log(``);
        expect(changeCreator).toHaveProperty('data');
        expect(metadata).toBeDefined();
        expect(metadata.creatorName).toEqual(newCreator);
    });

});




