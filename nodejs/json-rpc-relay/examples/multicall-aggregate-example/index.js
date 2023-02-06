const multiCallAggregate = require('./multicallAggregate');
// Arkhia
// const providerUrl = "https://hedera.testnet.arkhia.io/json-rpc/v1/<YOUR_API_KEY>"
// const providerUrl = "https://hedera.mainnet.arkhia.io/json-rpc/v1/<YOUR_API_KEY>"

// Hashio
// const providerUrl = "https://mainnet.hashio.io/api";
const providerUrl = "https://testnet.hashio.io/api";

const main = async () => {
    // Arkhia
    const getMultiCallData = multiCallAggregate.getMultiCallData;    
    const tx = await getMultiCallData(providerUrl);
    console.log('tx', tx);
}

main();
