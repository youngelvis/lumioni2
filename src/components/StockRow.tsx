import { IonCard, IonCardContent, IonCardHeader } from "@ionic/react";
import React from "react";

import StockApiService from "../services/StockApiService";

class StockRow extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      portfolioData: {},
      calculation: {},
    };
  }

  componentDidMount() {
    var loopPromise = new Promise<void>((resolve, reject) => {
      let portfolioInformation = StockApiService.getInformationForPortfolio(
        this.props.stockInfo.stockInfo.selectedTicker
      );

      portfolioInformation
        .then((informationForportfolio) => {
          // object item has to enter this state
          this.setState((prevState) => ({
            portfolioData: informationForportfolio,
          }));
        })
        .finally(() => {
          this.addingStockInfoToCalculationsObject();
        });
    });

    loopPromise.then(() => {});
  }

  addingStockInfoToCalculationsObject = () => {
    const cost = Number(this.props.stockInfo.stockInfo.enteredAmount);
    const shares = Number(this.props.stockInfo.stockInfo.enteredShare);
    const latestPrice = Number(this.state.portfolioData.latestPrice);
    let totalCost = cost * shares;
    let totalValue =( Number(latestPrice * shares)).toFixed(2);
    let diffenceInValue = (Number(totalValue) - totalCost).toFixed(2);
    let percentageChange = (
      ((Number(totalValue) - totalCost) / totalCost) *
      100
    ).toFixed(2);
    let calculation = {
      totalCost,
      diffenceInValue,
      percentageChange,
      totalValue,
    };
    // pushing this to the stockInfo in the state
    this.setState({
      calculation: calculation,
    });
  };

  render() {
    var stocks = this.state.portfolioData;
    var calculation = this.state.calculation;
    return (
      <IonCard>
        <IonCardHeader>
          <p>Last updated: {stocks.latestTime} </p>
          <h1>{stocks.companyName}</h1>
        </IonCardHeader>
        <IonCardContent>
          <table style={{ width: "100%" }}>
            <tbody>
            <tr>
              <td>Investment</td>
              <td>{calculation.totalCost}</td>
            </tr>
            <tr>
              <td>current value</td>
              <td>{calculation.totalValue}</td>
            </tr>
            <tr>
              <td>Gains</td>
              <td>{calculation.diffenceInValue}</td>
            </tr>
            <tr>
              <td>%Gains</td>
              <td>{calculation.percentageChange} %</td>
            </tr>
            </tbody>
          </table>
        </IonCardContent>
      </IonCard>
    );
  }
}
export default StockRow;
