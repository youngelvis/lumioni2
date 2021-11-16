import React from "react";
import StockApiService from "../services/StockApiService";

class CurrentValue extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      stockInfo: "",
    };
  }
  componentDidMount = () => {
    const latestPrice = StockApiService.getLatestPrice(
      this.props.items.selectedTicker
    );
    latestPrice.then((latestP) => {
      let latestprice = Number(latestP);
      this.businessLogic(latestprice);
    });
  };
  businessLogic = (number) => {
    const cost = Number(this.props.items.enteredAmount);
    const shares = Number(this.props.items.enteredShare);

    let totalCost = cost * shares;
    let totalValue = number * shares;
    let difference = Number(totalValue) - Number(totalCost);
    let percentageChange = (
      ((totalValue - totalCost) / totalCost) *
      100
    ).toFixed(2);
    let TC = totalCost.toFixed(2);
    let TV = totalValue.toFixed(2);
    let D = difference.toFixed(2);
    let PC = Number(percentageChange).toFixed(2);
    let calculation = {
      totalCost: TC,
      difference: D,
      percentageChange: PC,
      totalValue: TV,
    };
    this.setState({
      stockInfo: calculation,
    });
  };

  render() {
    return (
      <div style={{ width: "100%" }}>
        <table style={{ width: "100%" }}>
          <tbody>
          <tr>
            <td style={{ width: "70%" }}> Investment</td>
            <td> $ {this.state.stockInfo.totalCost}</td>
          </tr>
          <tr>
            <td> current value</td>
            <td> $ {this.state.stockInfo.totalValue}</td>
          </tr>
          <tr>
            <td> Gains</td>
            <td> $ {this.state.stockInfo.difference}</td>
          </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
export default CurrentValue;
