console.clear();

const { ContractId } = require('@hashgraph/sdk');

require('dotenv').config({path: '.env'});

const { ethers } = require("hardhat");
const urlHandler = require('../../../handlers/url.handler');

const operatorPrivateKey = urlHandler.getOperatorPrivateKey();
const jsonRpcRelayTestnet  = urlHandler.getJsonRpcTestnet();

describe('Deploy Contract and sendRawTransaction', () => {
  const init_message = 'initial_msg';
  let wallet;
  let provider;
  let greeter;
  let contractID;
  let receipt

  beforeAll(async () => { 
    provider = new ethers.providers.JsonRpcProvider(jsonRpcRelayTestnet);
    wallet = new ethers.Wallet(operatorPrivateKey, provider);
  });

  test('should be able to deploy a contract', async () => {
    // Arrange
    const Greeter = await ethers.getContractFactory('Greeter', wallet);

    // Act
    greeter = await Greeter.deploy(init_message);
    receipt = await greeter.deployTransaction.wait();

    // Assert
    expect(receipt).toBeDefined();
  });

  test('should be able to get contract Id', async () => {
    // Arrange
    const contractAddress = receipt.contractAddress;

    // Act
    contractID = ContractId.fromSolidityAddress(contractAddress);

    // Assert
    expect(contractAddress).toBeDefined();
    expect(contractID).toBeDefined();
  });

  test('should be able to sendRawTransaction', async () => {
    // Arrange
    let partialTxParams = await greeter.populateTransaction.greet();
    partialTxParams.to = contractID.toSolidityAddress();

    // Act
    const fullTxParams = await wallet.populateTransaction(partialTxParams);
    const signedTx = await wallet.signTransaction(fullTxParams);
    const tx = await ethers.provider.send('eth_sendRawTransaction', [signedTx]);

    // Assert
    expect(tx).toBeDefined();
  });
});
