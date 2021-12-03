import { IonCard, IonCardContent, IonCardTitle } from "@ionic/react";
import React from "react";
import StockApiService from "../services/StockApiService";

class PortfolioSummary extends React.Component<any, any> {
  // creating a constructor
  constructor(props) {
    super(props);
    // creating state variables
    this.state = {
      portfolioCost: 0,
      portfolioValue: 0,
      portfolioPercentageChange: 0,
    };
  }
  componentDidMount = () => {
    // creating a settimeout because of the time need for the application to get the needed data
    setTimeout(() => {
      //calling this function here because the function
      //calls its self more than once out side the componentdidmount
      this.totalValueForPortfolio();
    }, 1000);
  };
  // creating this function
  totalValueForPortfolio = () => {
    // creating two local variables for total value and total cost
    let totalValue = 0;
    let totalCost = 0;
    //looping through portfolio items gotten from List component
    // eslint-disable-next-line array-callback-return
    this.props.portfolioItems.map((items) => {
      //get latest price from api
      const latestPrice = StockApiService.getLatestPrice(items.selectedTicker);
      // change proomise to real value
      latestPrice.then((latestP) => {
        // set variable to realvalue
        let latestprice = Number(latestP);
        // set value to the original cost
        let cost = Number(items.enteredShare) * Number(items.enteredAmount);
        // add all the cost of the items in the portfolio
        totalCost += cost;
        // set value to current value
        let value = Number(items.enteredShare) * latestprice;
        // all current value of the items in portfolio
        totalValue += Number(value);
        // call this function and set current value of the portfolio and
        //original cost of the portfolio as parameter
        this.calculations(totalValue, totalCost);
      });
    });
  };
  // create a function that takes two parameters
  calculations = (totalCost, totalValue) => {
    // settime out to allow the code get the needed data
    setTimeout(() => {
      // percentage difference between the current value and original cost
      let PercentageChange = (
        ((totalValue - totalCost) / totalCost) *
        100
      ).toFixed(2);
      // variable to hold current value of portfolio
      let TV = totalValue.toFixed(2);
      // variable to hold original cost of portfolio
      let TC = totalCost.toFixed(2);

      // set state variables to results above
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
        <IonCardTitle>
          {" "}
          <h2 style={{ textAlign: "left", paddingLeft: "10px" }}>Summary</h2>
        </IonCardTitle>
        <IonCardContent>
          <table style={{ width: "100%" }}>
            <tbody>
              <tr>
                <td style={{ textAlign: "left" }}>Investment</td>
                <td style={{ textAlign: "right" }}>
                  $ {this.state.portfolioCost}
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "left" }}>current Value</td>
                <td style={{ textAlign: "right" }}>
                  $ {this.state.portfolioValue}
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "left" }}>%Gains</td>
                <td style={{ textAlign: "right" }}>
                  {this.state.portfolioPercentageChange} %
                </td>
              </tr>
            </tbody>
          </table>
        </IonCardContent>
      </IonCard>
    );
  }
}
export default PortfolioSummary;
