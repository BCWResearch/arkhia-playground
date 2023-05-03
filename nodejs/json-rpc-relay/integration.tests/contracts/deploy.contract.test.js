console.clear();

require('dotenv').config({path: '.env'});
const fs = require('fs');
const path = require('path');
const { ethers } = require("ethers");
const urlHandler = require('../../../handlers/url.handler');
const privateECDSAAccount = `0x8eaecc9af6db21e7bc66032d9891563e68e2930ac2a09da6c5872a92a3790203`;


describe('[Ethers] Deploy Contract ', () => {

    test('Testnet | Should able to Deploy Contract', async () => {

        // Arrange
        const provider = new ethers.providers.JsonRpcProvider(urlHandler.getJsonRpcTestnet());
        const contractPath = path.join(__dirname, '/');
        const signer = new ethers.Wallet(privateECDSAAccount, provider);
        const bytecode = fs.readFileSync(`${contractPath}/artifact/example.contract.bin`).toString();
        const contractJson = fs.readFileSync(`${contractPath}/artifact/example.contract.json`);
        const ABI = JSON.parse(contractJson);
        const myContract = new ethers.ContractFactory(ABI, bytecode, signer);

        // Act
        const contract = await myContract.deploy("Arkhia", "ARKH", "Token", 100000);

        // Assert
        expect(contract).toBeDefined();
        expect(contract.address).toBeDefined();
        console.log(`Contract deployed successfully : ${contract.address}`);
    
    });

});
