import crawlers from "../src/crawler/crawler";
import { PrismaClient } from "@prisma/client";

const mainDataUrl = "https://etherscan.io";
const mainDataPath = "#ContentPlaceHolder1_mainboxes .media";
const transactionUrl = "https://etherscan.io/txs";
const client = new PrismaClient();

export const seedDatabase = async () => {
    const mainData = await crawlers.mainDataCrawl(mainDataUrl, mainDataPath);
    const transactionsData = await crawlers.transactionCrawl(transactionUrl, 5);

    await client.etherscan.create({
        data: {
            etherPrice: mainData.etherPrice,
            marketCap: mainData.marketCap,
            difficulty: mainData.difficulty,
            medGasPrice: mainData.medGasPrice,
            transaction: {
                create: [{
                    from: transactionsData[0].from,
                    to: transactionsData[0].to,
                    gasPriceInTransaction: transactionsData[0].gasPrice,
                    tax: transactionsData[0].tax
                },
                {
                    from: transactionsData[1].from,
                    to: transactionsData[1].to,
                    gasPriceInTransaction: transactionsData[1].gasPrice,
                    tax: transactionsData[1].tax
                },
                {
                    from: transactionsData[2].from,
                    to: transactionsData[2].to,
                    gasPriceInTransaction: transactionsData[2].gasPrice,
                    tax: transactionsData[2].tax
                },
                {
                    from: transactionsData[3].from,
                    to: transactionsData[3].to,
                    gasPriceInTransaction: transactionsData[3].gasPrice,
                    tax: transactionsData[3].tax
                },
                {
                    from: transactionsData[4].from,
                    to: transactionsData[4].to,
                    gasPriceInTransaction: transactionsData[4].gasPrice,
                    tax: transactionsData[4].tax
                },]

            }
        }
    })
}

seedDatabase().then(()=> {})