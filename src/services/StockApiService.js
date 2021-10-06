
import { iex } from "../config/iex";

class StockApiService {

  static async getChangePercentage(ticker) {
    let info ='';
    let url2 = `${iex.base_url}/stock/${ticker}/batch?types=quote,news,chart&range=1m&last=10&token=${iex.api_token}`;

    // fetch the data from the api
    const changePercentage = fetch(url2)
    .then((response) => response.json())
    .then((data) => {
      info = data.quote.changePercent;
      return info;
    });

 

  const result = await changePercentage;

  return result;
  }
  static async getLatestPrice(ticker) {
    let info ='';
    let url2 = `${iex.base_url}/stock/${ticker}/batch?types=quote,news,chart&range=1m&last=10&token=${iex.api_token}`;

    // fetch the data from the api
    const latestPrice = fetch(url2)
    .then((response) => response.json())
    .then((data) => {
      info = data.quote.latestPrice;
      return info;
    });

 

  const result = await latestPrice;

  return result;
  }
  static async getCompanyName(ticker) {
    let info = "";
    let url2 = `${iex.base_url}/stock/${ticker}/batch?types=quote,news,chart&range=1m&last=10&token=${iex.api_token}`;

    // fetch the data from the api
    const companyName = fetch(url2)
      .then((response) => response.json())
      .then((data) => {
        info = data.quote.companyName;
        return info;
      });

    

    const result = await companyName;

    return result;
  }
  // trying to make this return an object of news data
  static async getNewsInformation(ticker) {
    let info = [];
    
    let url2 = `${iex.base_url}/stock/${ticker}/batch?types=quote,news,chart&range=1m&last=10&token=${iex.api_token}`;

    // fetch the data from the api
    const newsInformation = fetch(url2)
      .then((response) => response.json())
      .then((data) => {
        // eslint-disable-next-line array-callback-return
        data.news.map((news) => {
          let newsData ={
            newsHeadlines: news.headline,
            newsSummary: news.summary,
            newsSource: news.source,
            newsUrl: news.url,
            newsImage : news.image
          }
         
          info.push(newsData);
          
          
        });
        return info
      });

    const getNews = async () => {
      const InformationForNews = await newsInformation;
      return InformationForNews;
    }
      const result = await getNews()
      return result;
  }
  // api call for news summary
  // static async getNewsSummary(ticker) {
  //   let info = [];
  //   let url2 = `${iex.base_url}/stock/${ticker}/batch?types=quote,news,chart&range=1m&last=10&token=${iex.api_token}`;

  //   // fetch the data from the api
  //   const newsSummary = fetch(url2)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       data.news.map((news) => info.push(news.summary));
  //       return info;
  //     });

  //   const getSummary = async () => {
  //     const summaryOfNews = await newsSummary;
  //     return summaryOfNews;
  //   }
  //     const result = await getSummary()
  //     return result;


  // //   let url2 = `${iex.base_url}/stock/${ticker}/batch?types=quote,news,chart&range=1m&last=10&token=${iex.api_token}`;

  // //   // fetch the data from the api
  // //   fetch(url2)
  // //     // get the response in json format
  // //     .then((response) => response.json())
  // //     .then((data) => data.news.map((news) => console.log(news.summary)));
  // }

  // static async getNewsHeadLines(ticker) {

  //   let info = [];
  //   let url2 = `${iex.base_url}/stock/${ticker}/batch?types=quote,news,chart&range=1m&last=10&token=${iex.api_token}`;

  //   // fetch the data from the api
  //   const newsHeadlines = fetch(url2)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       data.news.map((news) => info.push(news.headline));
  //       return info;
  //     });

  //   const getHeadLines = async () => {
  //     const headlinesOfNews = await newsHeadlines;
  //     return headlinesOfNews;
  //   }
  //     const result = await getHeadLines()
  //     return result;
  // }
  // information that will be displayed in the portfolio list 
  static async getInformationForPortfolio(ticker) {

    
   
    let url2 = `${iex.base_url}/stock/${ticker}/batch?types=quote,news,chart&range=1m&last=10&token=${iex.api_token}`;

    // fetch the data from the api
    const informationForPortolio = fetch(url2)
      .then((response) => response.json())
      .then((data) => {
        
          let PortfolioData ={
            companyName:  data.quote.companyName,
            changePrice: data.quote.change,
            currency: data.quote.currency,
            latestPrice: data.quote.latestPrice,
            openPrice: data.quote.iexOpen,
            isMarketOpen: data.quote.isUSMarketOpen,
            latestTime: data.quote.latestTime,
            changePercentage: data.quote.changePercent
          }
          
          
          return PortfolioData
        });
        
      ;

  const getPortfolioInformation = async () => {
    const priceClose = await informationForPortolio;
    return priceClose;
  };

  const result = await getPortfolioInformation();

  return result;
    // let url2 = `${iex.base_url}/stock/${ticker}/batch?types=quote,news,chart&range=1m&last=10&token=${iex.api_token}`;

    // // fetch the data from the api
    // fetch(url2)
    //   // get the response in json format
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data.quote.close);
    //   });
  }
}

export default StockApiService;
