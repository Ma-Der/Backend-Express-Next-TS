import axios from 'axios';
import * as cheerio from 'cheerio';

type Transaction = {
    from: string
    to: string
    gasPrice: string
    tax: string
}

type MainDataCrawlResponse = {
    etherPrice: string
    marketCap: string
    difficulty: string
    medGasPrice: string
}

const crawlURL = async (url: string): Promise<cheerio.CheerioAPI> => {
    const response = await axios(url);
    const result = response.data;
    const $ = cheerio.load(result);
    return $;
}

const crawlForTransactionsLinks = async (url: string, numberOfTransactions: number): Promise<string[]> => {
    const $ = await crawlURL(url);
    let arrResult: string[] = [];
    $("#paywall_mask .table tbody tr").each((i, el) => {
        $(el).find('td').each((i, tdEl) => {
            const link = $(tdEl).find(".myFnExpandBox_searchVal").text();
            if(link !== "") {
                if(arrResult.length < numberOfTransactions) arrResult.push(`https://etherscan.io/tx/${link}`);
            }
        })
    });
    return arrResult;
}

const crawlArrayOfTransactions = async (url: string[]) => {
    const arr = url.map(async (url) => {
        const $ = await crawlURL(url);
        
        let from: string = "";
        let to: string = "";
        let gasPrice: string = "";
        let tax: string = "";

        $("#ContentPlaceHolder1_maintable .row").each((i, el) => {
            const fromText = $(el).find("a#addressCopy.mr-1").text();
            const toText = $(el).find("a#contractCopy.wordwrap.mr-1").text();
            const gasPriceText = $(el).find("span#ContentPlaceHolder1_spanGasPrice").text();
            const taxText = $(el).find("#ContentPlaceHolder1_spanTxFee").text();

            if(fromText !== "" || toText !== "" || gasPriceText !== "" || taxText !== "") {
                if(fromText !== "") from = fromText
                if(toText !== "") to = toText
                if(gasPriceText !== "") gasPrice = gasPriceText.slice(1);
                if(taxText !== "") tax = taxText;
            }            
        });
        return {from, to, gasPrice, tax};
        
    })
    const result = (await Promise.all(arr)).flat();
    
   return result;
}

const transactionCrawl = async (url: string, numbberOfTransactions: number): Promise<Transaction[]> => {
    const links = await crawlForTransactionsLinks(url, numbberOfTransactions);
    const transactionsData = await crawlArrayOfTransactions(links);

    return transactionsData;
}

const mainDataCrawl = async (url: string, path: string): Promise<MainDataCrawlResponse> => {
    const $ = await crawlURL(url);
    let arrResult: string[] = [];
    let secondArr: string[] = [];

    $(`${path} .media-body`).each((i, el) => {
        const text = $(el).find('.text-link').text();
        arrResult.push(text)
    });

    $(`${path}`).each((i, el) => {
        const text = $(el).find('.text-right').text();
        arrResult.push(text)
    });

    const arrRed = arrResult.reduce((outputArr: string[][], element) => {
        const cleanEl = element.split("\n");
        const cleared = cleanEl.filter(el => el.length !== 0);
        outputArr.push(cleared.flat())
        return outputArr;
    }, []);

    const resultArray = arrRed.flat();

    const resultObject: MainDataCrawlResponse = {
        etherPrice: resultArray[0],
        marketCap: resultArray[1],
        difficulty: resultArray[3],
        medGasPrice: resultArray[5]
    }
    return resultObject;
}

mainDataCrawl("https://etherscan.io", "#ContentPlaceHolder1_mainboxes .media").then(res => console.log(res))

transactionCrawl("https://etherscan.io/txs", 5).then(res => console.log(res));

export default { mainDataCrawl, transactionCrawl };