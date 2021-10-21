import { IonCard } from "@ionic/react";
import React from "react";
import StockApiService from "../services/StockApiService";

class PortfolioSummary extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      portfolioCost: 0,
      portfolioValue: 0,
      portfolioPercentageChange: 0,
    };
  }
  componentDidMount = () => {
    setTimeout(() => {
      this.totalValueForPortfolio();
    }, 1000);
  };
  totalValueForPortfolio = () => {
    let totalValue = 0;
    let totalCost = 0;
    // eslint-disable-next-line array-callback-return
    this.props.portfolioItems.map((items) => {
      const latestPrice = StockApiService.getLatestPrice(items.selectedTicker);
      latestPrice.then((latestP) => {
        let latestprice = Number(latestP);

        let cost = Number(items.enteredShare) * Number(items.enteredAmount);
        totalCost += cost;

        let value = Number(items.enteredShare) * latestprice;
        totalValue += Number(value);
      });
    });

    setTimeout(() => {
      let PercentageChange = ((totalCost / totalValue) * 100).toFixed(2);
      let TV = totalValue.toFixed(2);
      let TC = totalCost.toFixed(2);
      this.setState({
        portfolioCost: TC,
        portfolioValue: TV,
        portfolioPercentageChange: PercentageChange,
      });
    }, 1000);
  };
  render() {
    return (
      <IonCard>
        <p>{this.state.portfolioCost}</p>
        <p>{this.state.portfolioValue}</p>
        <p>{this.state.portfolioPercentageChange}</p>
      </IonCard>
    );
  }
}
export default PortfolioSummary;
