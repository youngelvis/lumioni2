import { IonCard, IonCardContent, IonCardHeader } from "@ionic/react";
import React from "react";

import StockApiService from "../services/StockApiService";

class StockRow extends React.Component<any, any> {
  // creating a constructor
  constructor(props) {
    super(props);
    // creating state variables
    this.state = {
      portfolioData: {},
      calculation: {},
    };
  }

  componentDidMount() {
    var loopPromise = new Promise<void>((resolve, reject) => {
      // getting data from api
      let portfolioInformation = StockApiService.getInformationForPortfolio(
        this.props.stockInfo.stockInfo.selectedTicker
      );
      // changing promise to real value 
      portfolioInformation
        .then((informationForportfolio) => {
          // setting the real value to portfolio data
          this.setState((prevState) => ({
            portfolioData: informationForportfolio,
          }));
        })
        .finally(() => {
          // call the function 
          this.addingStockInfoToCalculationsObject();
        });
    });

    loopPromise.then(() => {});
  }
  // create a function to handle all the calculations
  addingStockInfoToCalculationsObject = () => {
    // create a variable to hold entered amount from List component
    const cost = Number(this.props.stockInfo.stockInfo.enteredAmount);
    // create a variable to hold shares from List component
    const shares = Number(this.props.stockInfo.stockInfo.enteredShare);
    // create a variable to hold latest price from state
    const latestPrice = Number(this.state.portfolioData.latestPrice);
    // variable to hold original price of company stocks
    let totalCost = cost * shares;
    // variable to hold current value of company stocks
    let totalValue = Number(latestPrice * shares).toFixed(2);
    // variable to hold difference between current value and original cost of company stock
    let diffenceInValue = (Number(totalValue) - totalCost).toFixed(2);
    // variable to hold percentage difference between current value and original cost of company stock
    let percentageChange = (
      ((Number(totalValue) - totalCost) / totalCost) *
      100
    ).toFixed(2);
    // create an object to hold results above
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
    // variables to hold state variables
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
                <td style={{ textAlign: "right" }}>
                  $ {calculation.totalCost}
                </td>
              </tr>
              <tr>
                <td>current value</td>
                <td style={{ textAlign: "right" }}>
                  $ {calculation.totalValue}
                </td>
              </tr>
              <tr>
                <td>Gains</td>
                <td style={{ textAlign: "right" }}>
                  $ {calculation.diffenceInValue}
                </td>
              </tr>
              <tr>
                <td>%Gains</td>
                <td style={{ textAlign: "right" }}>
                  {calculation.percentageChange} %
                </td>
              </tr>
            </tbody>
          </table>
        </IonCardContent>
      </IonCard>
    );
  }
}
export default StockRow;
