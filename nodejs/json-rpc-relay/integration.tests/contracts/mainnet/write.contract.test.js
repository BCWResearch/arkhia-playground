console.clear();

require('dotenv').config({path: '.env'});
const Web3 = require('web3');
const { ethers } = require("ethers");
const urlHandler = require('../../../../handlers/url.handler');
const fs = require('fs');
const path = require('path');

const mainnetContractConfig = {
    id: `0.0.3746836`,
    sol_id: `0000000000000000000000000000000000392bf8`
}
const privateECDSAAccount = process.env.MAINNET_ECDSA_PRIVATE_KEY;

describe('[Ethers] Signed RawTransaction', () => {

    test('Mainnet | Should make raw transaction into Contract', async () => {
        // Arrange

        const provider = new ethers.providers.JsonRpcProvider(urlHandler.getJsonRpcTestnet());
        const signer = new ethers.Wallet(privateECDSAAccount, provider);
        const contractPath = path.join(__dirname, '/');

        const contractJson = fs.readFileSync(`${contractPath}/artifact/lookUpContract_sol_LookupContract.abi`);
        const ABI = JSON.parse(contractJson);
        const sampleContract = new ethers.Contract(mainnetContractConfig.sol_id, ABI, signer)
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




