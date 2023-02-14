console.clear();

const { ContractId } = require('@hashgraph/sdk');

require('dotenv').config({path: '.env'});

const { ethers } = require("hardhat");

const operatorPrivateKey = process.env.OPERATOR_PRIVATE_KEY;
const communityHashioTestnet = process.env.COMMUNITY_TESTNET_URL;
const arkhiaJsonRpcRelayTestnet  = `${process.env.ARKHIA_TESTNET_URL}/${process.env.ARKHIA_API_KEY}`;

describe('RPC', () => {
  const init_message = 'initial_msg';
  let contractAddress;
  let wallet;
  let provider;
  let greeter;
  let contractID;

  beforeAll(async () => { 
    provider = new ethers.providers.JsonRpcProvider(arkhiaJsonRpcRelayTestnet);
    wallet = new ethers.Wallet(operatorPrivateKey, provider);
    const Greeter = await ethers.getContractFactory('Greeter', wallet);
    greeter = await Greeter.deploy(init_message);
    const receipt = await greeter.deployTransaction.wait();
    console.log('receipt: ', receipt);
    contractAddress = receipt.contractAddress;
    contractID = ContractId.fromSolidityAddress(contractAddress);
    console.log(contractID, contractAddress);
  });

  test('should be able to deploy a contract', async () => {
    expect(contractAddress).toBeDefined();
  });

  test('should be able to call a contract', async () => {
    let partialTxParams = await greeter.populateTransaction.greet();
    partialTxParams.to = contractID.toSolidityAddress();
    
    const fullTxParams = await wallet.populateTransaction(partialTxParams);
    const signedTx = await wallet.signTransaction(fullTxParams);
    
    const tx = await ethers.provider.send('eth_sendRawTransaction', [signedTx]);
    console.log('tx: ', tx);
    expect(tx).toBeDefined();
  });
});