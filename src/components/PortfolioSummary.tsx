import { IonCard, IonCardContent, IonCardHeader } from "@ionic/react";
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
        this.calculations(totalValue,totalCost)
      });
    });


   
  
  };
  calculations= (totalCost,totalValue)=>{
    setTimeout(() => {
      console.log(totalCost)
      let PercentageChange = ((( totalValue - totalCost)/totalCost) * 100).toFixed(2);
      let TV = totalValue.toFixed(2);
      let TC = totalCost.toFixed(2);
   
      this.setState({
        portfolioCost: TC,
        portfolioValue: TV,
        portfolioPercentageChange: PercentageChange,
      });
    }, 1000);
  }
  render() {
    return (
      <IonCard>
        <IonCardHeader> <h1>Portfolio Summary</h1></IonCardHeader>
        <IonCardContent>
          <p >Investment: <span style={{paddingLeft: '90px'}}>${this.state.portfolioCost}</span></p>
          <p > current Value:<span style={{paddingLeft: '81px'}}> ${this.state.portfolioValue}</span></p>
          <p>Gains :<span style={{paddingLeft: '132px'}}> {this.state.portfolioPercentageChange}%</span></p>
        </IonCardContent>
      </IonCard>
    );
  }
}
export default PortfolioSummary;
