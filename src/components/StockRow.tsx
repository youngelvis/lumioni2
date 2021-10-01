import React from "react";
import { IonIcon } from "@ionic/react";
import {trash} from "ionicons/icons"

import StockApiService from "../services/StockApiService";

class StockRow extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      portfolioData: [],
    };
  }

  componentDidMount() {
    var loopPromise = new Promise<void>((resolve, reject) => {
      let portfolioInformation = StockApiService.getInformationForPortfolio(
        this.props.selectedTicker
      );
      // let percentageChange = StockApiService.getChangePercentage(a);

      portfolioInformation
        .then((informationForportfolio) => {
          // array item has to enter this state
          this.setState((prevState) => ({
            portfolioData: [...prevState.portfolioData, informationForportfolio],
          }));
        })
        .finally(() => {
          // if (index === array.length - 1) {
          //   resolve();
          // }
        });
    });

    loopPromise.then(() => {
      
      
      
    });
  }

  // console.log(data1[1].companyName, "des");

  render() {
    return (
      <div>
        {this.state.portfolioData.map((stocks) => (
          <div key={stocks.companyName}>
            {stocks.companyName} {stocks.latestTime}
            <IonIcon onClick={()=>this.props.handleDelete(this.props.indexNum)} icon={trash}></IonIcon>
          </div>
        ))}
      </div>
    );
  }
}
export default StockRow;
