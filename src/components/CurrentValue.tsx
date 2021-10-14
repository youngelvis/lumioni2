import React from "react";

import StockApiService from "../services/StockApiService";

class CurrentValue extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      latestPrice: "",
      stockInfo: "",
    };
  }
  componentDidMount = () => {
    const latestPrice = StockApiService.getLatestPrice(
      this.props.items.selectedTicker
    );
    latestPrice.then((latestP) => {
      let latestprice = Number(latestP)
      this.setState({
        latestPrice: latestprice
      });
      this.businessLogic(latestprice);
    });
    
    
  };
  businessLogic = (number) => {
    const cost = Number(this.props.items.enteredAmount);
    const shares = Number(this.props.items.enteredShare);

    let totalCost = cost * shares;
    let totalValue = Number(this.state.latestPrice) * shares;
    let difference =   totalValue - totalCost ;
    let percentageChange = (totalCost / totalValue) * 100;
    let calculation = {
      totalCost,
      difference,
      percentageChange,
      totalValue,
    };

    console.log(totalValue)
    this.setState({
      stockInfo: calculation,
    });
  };

  render() {
    return (
      <div>
        total cost: {this.state.stockInfo.totalCost} 
        current value: {this.state.stockInfo.totalValue}
        cost difference: {this.state.stockInfo.difference}
      </div>
    );
  }
}
export default CurrentValue;
