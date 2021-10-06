import React from "react";

import StockApiService from "../services/StockApiService";

class CurrentValue extends React.Component<any, any> {
  constructor(props){
    super(props);
    this.state ={
      latestPrice :'',
      stockInfo: ''
    }
  }
  componentDidMount=()=>{
    const latestPrice = StockApiService.getLatestPrice(
      this.props.items.selectedTicker
    );
    latestPrice.then((latestPrice)=>{
      this.setState({
        latestPrice:latestPrice
      })
    })
    this.businessLogic();
  }
   businessLogic = () => {
    const cost = Number(this.props.items.enteredAmount);
    const shares = Number(this.props.items.enteredShare);
   
    let totalCost = cost * shares;
    let totalValue = Number(this.state.latestPrice) * shares;
    let portfolioValue = totalValue - totalCost;
    let percentageChange = (totalCost / totalValue) * 100;
    let calculation = {
      totalCost,
      portfolioValue,
      percentageChange,
      totalValue,
    };
    this.setState({
      stockInfo:calculation
    })
    
  };
  
  
  render(){
    return <div>
      {this.state.stockInfo.totalCost}
    </div>;
  }
  
};
export default CurrentValue;
