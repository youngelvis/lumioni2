import {
  IonCard,
  IonCardContent,
  IonItem,
  IonLabel,
  IonCardHeader,
} from "@ionic/react";
import React from "react";
import StockApiService from "../services/StockApiService";

class LosersList extends React.Component<any, any> {
  // create a constructor
  constructor(props) {
    super(props);
    // create state variables
    this.state = {
      datalosers: [],
      stockTicker: [
        "aapl",
        "nflx",
        "googl",
        "goog",
        "TSLA",
        "msft",
        "nvda",
        "FB",
        "pltr",
        "spce",
        "gme",
        "baba",
        "spy",
        "wmt",
        "twtr",
        "shop",
        "adbe",
        "arkk",
        "zm",
      ],
    };
  }

  componentDidMount() {
    // create a promise
    var loopPromise = new Promise<void>((resolve, reject) => {
      //loop through state variable named stock ticker
      this.state.stockTicker.forEach((a, index, array) => {
        // get data from api
        let portfolioInformation = StockApiService.getInformationForSorting(a);
        
        // turn promise to real value
        portfolioInformation
          .then((informationForportfolio) => {
            // check if the value is less than zero
            if (informationForportfolio.changePercentage < 0) {
              // push data to array
              this.setState(
                (prevState) => ({
                  datalosers: [
                    ...prevState.datalosers,
                    informationForportfolio,
                  ],
                })
              );
            }
          })
          .finally(() => {
            if (index === array.length - 1) {
              resolve();
            }
          });
      });
    });
    loopPromise.then(() => {
      // call this fucntion
      this.work();
    });
  }

  // create this function
  work = () => {
    // create a timeout to make the app get the necessary data
    setTimeout(() => {
      //sort the information ascending order
      this.state.datalosers.sort((a, b) =>
        a.changePercentage > b.changePercentage ? 1 : -1
      );
      // render again
      this.forceUpdate();
    }, 2000);
    
  };
  render() {
    return (
      <div>
        <div style={{ textAlign: "center" }}>
          <IonCard>
            <IonCardHeader>
              <h5> worst losers of the day</h5>
            </IonCardHeader>
            <IonCardContent>
              {this.state.datalosers.map((stocks) => (
                <IonCard key={stocks.companyName}>
                  <IonItem>
                    <IonLabel>
                      <p>{stocks.companyName}</p>
                      <p> {stocks.ticker}</p>{" "}
                    </IonLabel>
                    <span style={{ paddingLeft: "40px" }}>
                      {" "}
                      <IonLabel>
                        <p></p>
                        <p style={{ color: "red" }}>
                          {" "}
                          {stocks.changePercentage} %
                        </p>
                      </IonLabel>
                    </span>
                  </IonItem>
                </IonCard>
              ))}
            </IonCardContent>
          </IonCard>
        </div>
      </div>
    );
  }
}
export default LosersList;
