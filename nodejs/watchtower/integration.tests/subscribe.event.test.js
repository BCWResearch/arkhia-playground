console.clear();

require('dotenv').config({ path: '.env' });
const urlHandler = require('../../handlers/url.handler');
const watchtowerHandler = require('../../handlers/watchtower.handler');
const ERC20 = require('./abis/erc20.abi.json');
const io = require('socket.io-client');
const { ethers } = require("ethers");
let socket;

let provider;
let signer;
let contract;
let subscribeEventPayload;

const arkhiaJsonRpcRelayTestnet = urlHandler.getJsonRpcTestnet();

const privateKey = process.env.TESTNET_OPERATOR_PRIVATE_EVM_KEY;

let timeout = 100000;
let hasBalance = false;

const verifySubscriptionResponse = (msg) => {
    expect(msg.listeners).toBeDefined();
    expect(msg.listeners.data).toBeDefined();
    expect(msg.listeners.error).toBeDefined();
    expect(msg.listeners.end).toBeDefined();
    expect(msg.listeners.status).toBeDefined();
    expect(msg.meta.subscribe).toBeDefined();
    expect(msg.meta.body).toBeDefined();
}

const verifyPayload = (payload) => {
    expect(payload).toBeDefined();
    expect(payload).toHaveProperty('subscribe');
    expect(payload.subscribe).toEqual('/jsonRpc/event');
    expect(payload).toHaveProperty('body');
    expect(payload.body).toHaveProperty('address');
    expect(payload.body).toHaveProperty('topics');
}

describe('Subscribe to jsonRpc/event [Watchtower] on Testnet', () => {

    beforeAll((done) => {
        // Create a provider and signer using the private key and provider URL
        provider = new ethers.providers.JsonRpcProvider(arkhiaJsonRpcRelayTestnet);
        signer = new ethers.Wallet(privateKey, provider);
        const publicAddress = signer.address;

        const setupContract = async () => {
            let balance = await provider.getBalance(publicAddress);
            balance = +ethers.utils.formatEther(balance);
            hasBalance = balance > 1;
            if (!hasBalance)
                return;
            const factory = new ethers.ContractFactory(ERC20.abi, ERC20.bytecode, signer);
            contract = await factory.deploy();
            await contract.deployed();
        }

        setupContract().then(() => {
            socket = io(urlHandler.getWatchtowerUrlTestnet());
            socket.on('connect', function () {
                done();
            })
        }).catch((err) => {
            console.log("Error: ", err);
            done();
        });

        messageCount = 0;

    });

    it('Should have correct subscription payload', () => {
        if (!hasBalance)
            return;
        subscribeEventPayload = watchtowerHandler.getSubscribeEventPayload(
            contract.address,
            'Transfer(address,address,uint256)'
        );
        verifyPayload(subscribeEventPayload);
    });

    it('Subscribe to Contract Event [Watchtower] on Testnet', (done) => {
        if (!hasBalance) {
            done();
            return;
        }
        socket.emit(`subscribe`, subscribeEventPayload, (msg) => {
            verifySubscriptionResponse(msg);
            socket.on(msg.listeners.data, function (message) {
                expect(message).toBeDefined();
                expect(message.error).toBeDefined();
                expect(message.error).toEqual(false);
                expect(message.data).toBeDefined();
                expect(message.data).toHaveProperty('blockNumber');
                expect(message.data).toHaveProperty('blockHash');
                expect(message.data).toHaveProperty('transactionIndex');
                expect(message.data).toHaveProperty('removed');
                expect(message.data).toHaveProperty('address');
                expect(message.data.address.toLowerCase()).toEqual(contract.address.toLowerCase());
                expect(message.data).toHaveProperty('data');
                expect(message.data).toHaveProperty('topics');
                expect(message.data).toHaveProperty('transactionHash');
                expect(message.data).toHaveProperty('logIndex');

                socket.emit('unsubscribe', msg.uid, (msg) => {
                    expect(msg).toEqual(true);
                    done();
                });
            });
            contract.mint('50000000');
        });
    }, timeout);


    it('Subscribe to Contract Event-Formatted [Watchtower] on Testnet', (done) => {
        if (!hasBalance) {
            done();
            return;
        }
        const subscribeEventPayloadWithInputs = watchtowerHandler.getSubscribeEventPayload(
            contract.address,
            'Transfer(address,address,uint256)',
            [
                {
                    indexed: true,
                    internalType: 'address',
                    name: 'from',
                    type: 'address',
                },
                {
                    indexed: true,
                    internalType: 'address',
                    name: 'to',
                    type: 'address',
                },
                {
                    indexed: false,
                    internalType: 'uint256',
                    name: 'value',
                    type: 'uint256',
                },
            ],
        );
        socket.emit(`subscribe`, subscribeEventPayloadWithInputs, (msg) => {
            verifySubscriptionResponse(msg);
            socket.on(msg.listeners.data, function (message) {
                expect(message).toBeDefined();
                expect(message.error).toBeDefined();
                expect(message.error).toEqual(false);
                expect(message.data).toBeDefined();
                expect(message.data).toHaveProperty('blockNumber');
                expect(message.data).toHaveProperty('blockHash');
                expect(message.data).toHaveProperty('transactionIndex');
                expect(message.data).toHaveProperty('removed');
                expect(message.data).toHaveProperty('address');
                expect(message.data.address.toLowerCase()).toEqual(contract.address.toLowerCase());
                expect(message.data).toHaveProperty('data');
                expect(message.data).toHaveProperty('topics');
                expect(message.data).toHaveProperty('transactionHash');
                expect(message.data).toHaveProperty('logIndex');

                expect(message.data.from).toBeDefined();
                expect(message.data.from).toEqual('0x0000000000000000000000000000000000000000000000000000000000000000');
                expect(message.data.to).toBeDefined();
                expect(message.data.value).toBeDefined();
                expect(+message.data.value.hex).toEqual(50000000);

                socket.emit('unsubscribe', msg.uid, (msg) => {
                    expect(msg).toEqual(true);
                    done();
                });
            });
            contract.mint('50000000');
        });
    }, timeout);

    afterAll(() => {
        socket?.close();
    });
});