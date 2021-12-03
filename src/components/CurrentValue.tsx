import React from "react";
import StockApiService from "../services/StockApiService";

class CurrentValue extends React.Component<any, any> {
  // creating as constructor
  constructor(props) {
    super(props);
    // creating a state variable
    this.state = {
      stockInfo: "",
    };
  }
  componentDidMount = () => {
    // getting the lastest price from the stock api
    const latestPrice = StockApiService.getLatestPrice(
      //using stock ticker as parameter
      this.props.items.selectedTicker
    );
    // changinng latest price from promise to a real value
    latestPrice.then((latestP) => {
      //setting the value of latest price to latestP
      let latestprice = Number(latestP);
      // calling a business logic function amd setting latest price as its parameter
      this.businessLogic(latestprice);
    });
  };
  // creating the business logic function
  businessLogic = (number) => {
    // setting the value entered amount to the cost variable
    const cost = Number(this.props.items.enteredAmount);
    // setting the value entered shares to the shares variable
    const shares = Number(this.props.items.enteredShare);

    // setting the result of multiplying cost and shares to the totalcost variable
    let totalCost = cost * shares;
    // setting the result of multiplying latestprice and shares to the totalvalue variable
    let totalValue = number * shares;

    // setting the difference between totalvalue and shares to the totalcost variable
    let difference = Number(totalValue) - Number(totalCost);

    // percentage difference between total value and cost
    let percentageChange = (
      ((totalValue - totalCost) / totalCost) *
      100
    ).toFixed(2);
    // creating a set of variable to hold the results above in two decimal places
    let TC = totalCost.toFixed(2);
    let TV = totalValue.toFixed(2);
    let D = difference.toFixed(2);
    let PC = Number(percentageChange).toFixed(2);
    // creating an object to hold the above information
    let calculation = {
      totalCost: TC,
      difference: D,
      percentageChange: PC,
      totalValue: TV,
    };
    // setting the stockinfo variable in the state to calculation object
    this.setState({
      stockInfo: calculation,
    });
  };

  render() {
    return (
      // creating div to hold the tableƒ
      <div style={{ width: "100%" }}>
        <table style={{ width: "100%" }}>
          <tbody>
          <tr >
            <td> Investment</td>
            <td style={{textAlign:"right"}}> $ {this.state.stockInfo.totalCost}</td>
          </tr>
          <tr >
            <td> current value</td>
            <td style={{textAlign:"right"}}> $ {this.state.stockInfo.totalValue}</td>
          </tr>
          <tr >
            <td> Gains</td>
            <td style={{textAlign:"right"}}> $ {this.state.stockInfo.difference}</td>
          </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
export default CurrentValue;
