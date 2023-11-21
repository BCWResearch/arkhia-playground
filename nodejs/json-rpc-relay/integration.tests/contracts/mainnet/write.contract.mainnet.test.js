console.clear();

require('dotenv').config({path: '.env'});
const { ethers } = require("ethers");
const urlHandler = require('../../../../handlers/url.handler');
const fs = require('fs');
const path = require('path');
const privateECDSAAccount = process.env.MAINNET_ECDSA_PRIVATE_KEY;

const mainnetContractConfig = {
    id: `0.0.3746808`,
    sol_id: `0000000000000000000000000000000000392bf8`
}

describe('[Ethers] Signed RawTransaction', () => {

    test('Mainnet | Should make raw transaction into Contract', async () => {
        // Arrange
        const provider = new ethers.providers.JsonRpcProvider(urlHandler.getJsonRpcMainnet());
        const signer = new ethers.Wallet(privateECDSAAccount, provider);
        const contractPath = path.join(__dirname, '/');

        const contractJson = fs.readFileSync(`${contractPath}/../artifact/lookUpContract_sol_LookupContract.abi`);
        const ABI = JSON.parse(contractJson);
        const sampleContract = new ethers.Contract(mainnetContractConfig.sol_id, ABI, signer)
        const mobileNumber = 'Arkhia';
        const uintValue = 2222;



        // Act
        const transaction =  await sampleContract.setMobileNumber(mobileNumber, uintValue,{
            gasLimit: 100000,
        });

        const receipt = await transaction.wait();
        const metadata = await sampleContract.getContractMetadata();

        // Assert
        console.log(receipt);
        expect(receipt).toHaveProperty('data');
        expect(metadata).toBeDefined();
        expect(metadata.mobileNumber).toEqual(mobileNumber);
    });

});
