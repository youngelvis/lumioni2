import { IonCard, IonCardContent, IonCardHeader } from "@ionic/react";
import React from "react";

import StockApiService from "../services/StockApiService";

class StockRow extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      portfolioData: {},
      calculation: {}
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
    let totalValue = latestPrice * shares;
    let diffenceInValue = totalValue - totalCost;
    let percentageChange = ((( totalValue - totalCost)/totalCost) * 100).toFixed(2);
    let calculation = {
      totalCost,
      diffenceInValue,
      percentageChange,
      totalValue,
    };
    // pushing this to the stockInfo in the state
    this.setState(
      {
      calculation:calculation,
    }
    );
  };

  render() {
    var stocks = this.state.portfolioData
    var calculation = this.state.calculation
    return (
      <IonCard>
          <IonCardHeader>
            <p>Last updated: {stocks.latestTime} </p>
          <h1>{stocks.companyName}</h1>
          </IonCardHeader>
          <IonCardContent>
           <p> cost of holdings: <span style={{paddingLeft: '90px'}}>${calculation.totalCost}</span></p>
            <p>current value: <span style={{paddingLeft: '90px'}}>${calculation.totalValue}</span></p>
            <p>gains:<span style={{paddingLeft: '140px'}}> ${calculation.diffenceInValue}</span></p>
            <p>% gains: <span style={{paddingLeft: '120px'}}>{calculation.percentageChange}%</span></p>



          </IonCardContent>
             
            
          
          
       
      </IonCard>
    );
  }
}
export default StockRow;
