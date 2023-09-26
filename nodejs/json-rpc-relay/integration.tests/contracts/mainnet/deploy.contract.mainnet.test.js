console.clear();

require('dotenv').config({path: '.env'});
const fs = require('fs');
const path = require('path');
const { ethers } = require("ethers");
const urlHandler = require('../../../../handlers/url.handler');
const privateECDSAAccount = process.env.MAINNET_OPERATOR_PRIVATE_KEY;


describe('[Ethers] Deploy Contract ', () => {

    test('Mainnet | Should have valid private Key to Deploy Contract', async () => {
        // Arrange
        const privateECDSAAccount = process.env.MAINNET_OPERATOR_PRIVATE_KEY;

        // Assert
        expect(privateECDSAAccount).toBeDefined();
        expect(privateECDSAAccount.length).toBeGreaterThan(2);
    });

    test('Mainnet | Should able to Deploy Contract', async () => {

        // Arrange
        const provider = new ethers.providers.JsonRpcProvider(urlHandler.getJsonRpcMainnet());
        const contractPath = path.join(__dirname, '/');
        const signer = new ethers.Wallet(privateECDSAAccount, provider);
        const bytecode = fs.readFileSync(`${contractPath}/../artifact/example.contract.bin`).toString();
        const contractJson = fs.readFileSync(`${contractPath}/../artifact/example.contract.json`);
        const ABI = JSON.parse(contractJson);
        const myContract = new ethers.ContractFactory(ABI, bytecode, signer);

        // Act
        const contract = await myContract.deploy("Arkhia", "ARKH", "Token", 100000);

        // Assert
        expect(contract).toBeDefined();
        expect(contract.address).toBeDefined();
        console.log(`Contract deployed successfully : ${contract}`);
    });

});
