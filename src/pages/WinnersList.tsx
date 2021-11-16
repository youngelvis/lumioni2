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
  constructor(props) {
    super(props);
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
    var loopPromise = new Promise<void>((resolve, reject) => {
      this.state.stockTicker.forEach((a, index, array) => {
        let portfolioInformation = StockApiService.getInformationForSorting(a);
        // let percentageChange = StockApiService.getChangePercentage(a);

        portfolioInformation
          .then((informationForportfolio) => {
            // array item has to enter this state
            if (informationForportfolio.changePercentage > 0) {
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
      this.work();
    });
  }

  // console.log(data1[1].companyName, "des");
  work = () => {
    setTimeout(() => {
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
                      <p> {stocks.ticker}</p>
                      <p>{stocks.companyName}</p>
                    </IonLabel>
                    <span style={{ paddingLeft: "40px" }}>
                      {" "}
                      <IonLabel>
                        <p style={{ color: "green" }}>
                          {" "}
                          {stocks.changePercentage}
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
