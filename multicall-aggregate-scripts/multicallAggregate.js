const { ethers } = require("ethers");
const ABI = require('./abi');
const data = require('./data');
require("dotenv").config();


module.exports = {
    getMultiCallData: async function(providerUrl) {

        const provider = new ethers.providers.JsonRpcProvider(providerUrl);
        const contractAddress = "0x00000000000000000000000000000000001a89ac";
        const privateKey = "6d3ecf59765d194ca6da047d605d6a1062b0a00e190b83cecb2158d5a510b8dd";

        const signer = new ethers.Wallet(privateKey, provider)
        const contract = new ethers.Contract(contractAddress, ABI, signer);

        const tx = await contract.aggregate(
            data.map((item) => ([item.address, item.callData]))
        );
        return tx;
    }
}