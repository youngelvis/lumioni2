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
      console.log(latestprice)
      this.businessLogic(latestprice);
      
    });
  };
  businessLogic = (number) => {
    const cost = Number(this.props.items.enteredAmount);
    const shares = Number(this.props.items.enteredShare);

    let totalCost = cost * shares;
    let totalValue = number * shares;
    let difference = Number(totalValue) - Number(totalCost);
    let percentageChange = 
    ((( totalValue - totalCost)/totalCost) * 100).toFixed(2)
    ;
    let TC = totalCost.toFixed(2);
    let TV = totalValue.toFixed(2);
    let D = difference.toFixed(2);
    let PC = Number(percentageChange).toFixed(2)
    let calculation = {
      totalCost: TC,
      difference:D,
      percentageChange:PC,
      totalValue:TV,
    };

    console.log(totalValue);
    this.setState({
      stockInfo: calculation,
    });
  };

  render() {
    return (
      <div>
        <p> cost of holdings: ${this.state.stockInfo.totalCost}</p>
        <p> current value: ${this.state.stockInfo.totalValue}</p>
        <p>total return: ${this.state.stockInfo.difference}</p>
      </div>
    );
  }
}
export default CurrentValue;
