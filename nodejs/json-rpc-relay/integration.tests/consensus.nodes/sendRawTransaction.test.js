console.clear();

const { Client, Hbar, ContractId } = require('@hashgraph/sdk');

require('dotenv').config({path: '.env'});
// const { Provider } = require('@hashgraph/sdk/lib/Provider');
// const { ethers } = require("ethers");

const { ethers } = require("hardhat");

// import { Greeter } from '../typechain-types';

const operatorId = process.env.OPERATOR_ACCOUNT_ID;
const operatorPrivateKey = process.env.OPERATOR_PRIVATE_KEY;
const communityHashioTestnet = process.env.COMMUNITY_TESTNET_URL;
const arkhiaJsonRpcRelayTestnet  = `${process.env.ARKHIA_TESTNET_URL}/${process.env.ARKHIA_API_KEY}`;

const client = Client.forTestnet().setOperator(operatorId, operatorPrivateKey).setDefaultMaxTransactionFee(new Hbar(10));

describe('RPC', () => {
  const init_message = 'initial_msg';
  let contractAddress;
  let wallet;
  let provider;
  let greeter;
  let contractID;

  beforeAll(async () => { 
    provider = new ethers.providers.JsonRpcProvider(communityHashioTestnet);
    console.log('yo1')
    wallet = new ethers.Wallet(process.env.OPERATOR_PRIVATE_KEY, provider);
    console.log('yo2')
    const Greeter = await ethers.getContractFactory('Greeter', wallet);
    console.log('yo3')
    greeter = await Greeter.deploy('initial_msg');
    console.log('yo4')
    const receipt = await greeter.deployTransaction.wait();
    console.log('yo5')
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
    // wait for consensus
    // TODO: might remove
    // await new Promise((resolve) => setTimeout(resolve, 10000));

    // const resMirrorNode = await axios.get(`contracts/results/${tx}`);

    // console.log('resMirrorNode.data', resMirrorNode.data.call_result)
  });
});