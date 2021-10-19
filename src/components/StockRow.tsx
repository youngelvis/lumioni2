import React from "react";

import StockApiService from "../services/StockApiService";

class StockRow extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      portfolioData: {},
      calculation: {}
    };
  }

  componentDidMount() {
    var loopPromise = new Promise<void>((resolve, reject) => {
      let portfolioInformation = StockApiService.getInformationForPortfolio(
        this.props.stockInfo.stockInfo.selectedTicker
      );

      portfolioInformation
        .then((informationForportfolio) => {
          // array item has to enter this state
          this.setState((prevState) => ({
            portfolioData: informationForportfolio,
          }));
        })
        .finally(() => {
          this.addingStockInfoToPortfolioData();
        });
    });

    loopPromise.then(() => {});
  }

  addingStockInfoToPortfolioData = () => {
    const cost = Number(this.props.stockInfo.stockInfo.enteredAmount);
    const shares = Number(this.props.stockInfo.stockInfo.enteredShare);
    const latestPrice = Number(this.state.portfolioData.latestPrice);
    console.log(latestPrice)
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
      calculation:calculation,
    }));
  };

  render() {
    var stocks = this.state.portfolioData
    var calculation = this.state.calculation
    return (
      <div>
        
          <div >
            {stocks.companyName} {stocks.latestTime}
            {calculation.totalCost}
          </div>
       
      </div>
    );
  }
}
export default StockRow;
