console.clear();

require('dotenv').config({path: '.env'});
const { Hbar } = require('@hashgraph/sdk');
const restApiHandler = require('../handlers/rest.api.handler');
const fs = require('fs');
const urlHandler = require('../../handlers/url.handler');
const link = `https://hashscan.io/mainnet/transaction/`;

const printRelevantTransactionData = (csvData, initialBalance, historicTransactions, accountID) => {

    historicTransactions.forEach((element) => {
        const elementAccountBalance = element.transfers.find((item) => item.account === accountID);

        if (elementAccountBalance) {
           let date = new Date(element.consensus_timestamp * 1000).toString().substring(0,25);
           const tinyHbars = elementAccountBalance.amount;
           const previousBalance = initialBalance;
           initialBalance += elementAccountBalance.amount;
           const memo = atob(element.memo_base64);
           csvData.push([ `${link}${element.consensus_timestamp}`, element.transaction_id, date, previousBalance, tinyHbars, initialBalance, memo, JSON.stringify(element.transfers)]);
           console.log(`Adding ${date}`);
        }

    });
    return csvData;
}

const assertTransactionsByAccountId = async (isMainnet) => {
    const accountID = urlHandler.getAccountKeyMainnet();
    const accountFile = `${accountID}_history.csv`;
    let csvContent = "";
    let csvData = [['Link','TransactionID', 'Date', `Previous Balance`, `(+/-)hbars`, `Current Balance`, `Memo`, `Transfer history`]];
    const accountInfo = await restApiHandler.getAccountById(accountID, isMainnet);
    const transactionInfo = await restApiHandler.getTransactionByAccountId(accountID, isMainnet, 'desc');
    const historicTransactions = transactionInfo.data.transactions;
    let initialBalance = accountInfo.data.balance.balance;

    console.log(`Account ${accountID} starts at ${Hbar.fromTinybars(accountInfo.data.balance.balance)}`);
    csvData = printRelevantTransactionData(csvData, initialBalance, historicTransactions, accountID);
    csvData.forEach(function(rowArray) {
        let row = rowArray.join(",");
        csvContent += row + "\r\n";
    });
    fs.writeFile(accountFile, csvContent, 'utf-8', err => {
        if (err) {
          throw err;
        }
    });

    const timeStampStop = 1689081368.457144003;
    let next = transactionInfo.data.links.next;
    while (next !== null) {
        console.log(`Fetching now ${next}`);
        const transactionInfo = await restApiHandler.getCustomQueryMainnet(next, isMainnet);
        if (transactionInfo.data.transactions[0].consensus_timestamp < timeStampStop) break;
        next = transactionInfo.data.links.next;
        csvData = printRelevantTransactionData(csvData, initialBalance, transactionInfo.data.transactions, accountID);
    }

    csvData.forEach(function(rowArray) {
        let row = rowArray.join(",");
        csvContent += row + "\r\n";
    });

    fs.appendFile(accountFile, csvContent, 'utf-8', err => {
        if (err) {
          throw err;
        }
    });

}

assertTransactionsByAccountId(true);

