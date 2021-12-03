import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonItem,
  IonLabel,
} from "@ionic/react";
import React from "react";
import StockApiService from "../services/StockApiService";

class WinnersList extends React.Component<any, any> {
  // create a constructor
  constructor(props) {
    super(props);
    // create state variables
    this.state = {
      dataWinners: [],
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
      isLoading: false,
    };
  }

  componentDidMount() {
    // create a promise
    var loopPromise = new Promise<void>((resolve, reject) => {
      //loop throught the state variable named stockTicker
      this.state.stockTicker.forEach((a, index, array) => {
        let portfolioInformation = StockApiService.getInformationForSorting(a);
        // turn promise to real data
        portfolioInformation
          .then((informationForportfolio) => {
            // if data from api is more than zero
            if (informationForportfolio.changePercentage > 0) {
              // push data to state
              this.setState((prevState) => ({
                dataWinners: [
                  ...prevState.dataWinners,
                  informationForportfolio,
                ],
              }));
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
      // call this function
      this.work();
    });
  }

  // create function
  work = () => {
    // set timeout to allow application get needed data
    setTimeout(() => {
      // sort in decending order
      this.state.dataWinners.sort((a, b) =>
        a.changePercentage < b.changePercentage ? 1 : -1
      );

      this.forceUpdate();
    }, 2000);
  };

  render() {
    return (
      <div>
        <div style={{ textAlign: "center" }}>
          <IonCard>
            <IonCardHeader>
              <h5>Top winners of the day</h5>
            </IonCardHeader>
            <IonCardContent>
              {this.state.dataWinners.map((stocks) => (
                <IonCard key={stocks.companyName}>
                  <IonItem>
                    <IonLabel>
                      <h2>{stocks.companyName}</h2>
                      <h3> {stocks.ticker}</h3>
                    </IonLabel>
                    <span style={{ paddingLeft: "40px" }}>
                      {" "}
                      <IonLabel>
                        <p style={{ color: "green" }}>
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
export default WinnersList;
