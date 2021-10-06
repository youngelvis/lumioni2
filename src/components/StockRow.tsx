import React from "react";

import StockApiService from "../services/StockApiService";

class StockRow extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      portfolioData: [],
      stockInfo: [],
    };
  }

  componentDidMount() {
    var loopPromise = new Promise<void>((resolve, reject) => {
      let portfolioInformation = StockApiService.getInformationForPortfolio(
        this.props.stockInfo.selectedTicker
      );

      portfolioInformation
        .then((informationForportfolio) => {
          // array item has to enter this state
          this.setState((prevState) => ({
            portfolioData: [
              ...prevState.portfolioData,
              informationForportfolio,
            ],
          }));
        })
        .finally(() => {
          this.addingStockInfoToPortfolioData();
        });
    });

    loopPromise.then(() => {});
  }

  addingStockInfoToPortfolioData = () => {
    const cost = Number(this.props.stockInfo.enteredAmount);
    const shares = Number(this.props.stockInfo.enteredShare);
    const latestPrice = Number(this.state.portfolioData[0].latestPrice);
    let totalCost = cost * shares;
    let totalValue = latestPrice * shares;
    let portfolioValue = totalValue - totalCost;
    let percentageChange = (totalCost / totalValue) * 100;
    let calculation = {
      totalCost,
      portfolioValue,
      percentageChange,
      totalValue,
    };
    // pushing this to the stockInfo in the state
    this.setState((prevState) => ({
      stockInfo: [
        ...prevState.stockInfo,
        calculation
      ],
    }));
    console.log(this.state.stockInfo)
  };

  render() {
    return (
      <div>
        {this.state.portfolioData.map((stocks) => (
          <div key={stocks.companyName}>
            {stocks.companyName} {stocks.latestTime}
          </div>
        ))}
      </div>
    );
  }
}
export default StockRow;
