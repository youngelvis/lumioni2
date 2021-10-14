import { iex } from "../config/iex";

class StockApiService {
  static async getChangePercentage(ticker) {
    let info = "";
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
    let info = "";
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
          let newsData = {
            newsHeadlines: news.headline,
            newsSummary: news.summary,
            newsSource: news.source,
            newsUrl: news.url,
            newsImage: news.image,
          };

          info.push(newsData);
        });
        return info;
      });

    const getNews = async () => {
      const InformationForNews = await newsInformation;
      return InformationForNews;
    };
    const result = await getNews();
    return result;
  }

  static async getInformationForPortfolio(ticker) {
    let url2 = `${iex.base_url}/stock/${ticker}/batch?types=quote,news,chart&range=1m&last=10&token=${iex.api_token}`;

    // fetch the data from the api
    const informationForPortolio = fetch(url2)
      .then((response) => response.json())
      .then((data) => {
        let PortfolioData = {
          companyName: data.quote.companyName,
          changePrice: data.quote.change,
          currency: data.quote.currency,
          latestPrice: data.quote.latestPrice,
          openPrice: data.quote.iexOpen,
          isMarketOpen: data.quote.isUSMarketOpen,
          latestTime: data.quote.latestTime,
          changePercentage: data.quote.changePercent,
        };

        return PortfolioData;
      });

    const getPortfolioInformation = async () => {
      const priceClose = await informationForPortolio;
      return priceClose;
    };

    const result = await getPortfolioInformation();

    return result;
  }
  // fetch the data from the api for explore page
  static async getInformationForExplore(ticker) {
    let url2 = `${iex.base_url}/stock/${ticker}/batch?types=quote,news,chart&range=1m&last=10&token=${iex.api_token}`;

    // fetch the data from the api
    const informationForExplore = fetch(url2)
      .then((response) => response.json())
      .then((data) => {
        let PortfolioData = {
          companyName: data.quote.companyName,
          currency: data.quote.currency,
          latestPrice: data.quote.latestPrice,
          ticker: ticker,
        };

        return PortfolioData;
      });

    const getPortfolioInformation = async () => {
      const priceClose = await informationForExplore;
      return priceClose;
    };

    const result = await getPortfolioInformation();

    return result;
  }
  // fetch the data from the APi for the winner and loser component
  static async getInformationForSorting(ticker) {
    let url2 = `${iex.base_url}/stock/${ticker}/batch?types=quote,news,chart&range=1m&last=10&token=${iex.api_token}`;

    // fetch the data from the APi
    const informationForSorting = fetch(url2)
      .then((response) => response.json())
      .then((data) => {
        let PortfolioData = {
          companyName: data.quote.companyName,
          changePercentage: data.quote.changePercent,
        };

        return PortfolioData;
      });

    const getPortfolioInformation = async () => {
      const priceClose = await informationForSorting;
      return priceClose;
    };

    const result = await getPortfolioInformation();

    return result;
  }
}

export default StockApiService;
