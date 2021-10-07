import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import { Redirect } from "react-router";
import StockApiService from "../services/StockApiService";
class ExplorePage extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      exploreList: [],
      stockTicker: ["aapl", "fb","googl"],
    };
  }

  componentDidMount() {
    var loopPromise = new Promise<void>((resolve, reject) => {
      this.state.stockTicker.forEach((a, index, array) => {
        let portfolioInformation =
        StockApiService.getInformationForSorting(a);
      // let percentageChange = StockApiService.getChangePercentage(a);

      portfolioInformation
        .then((informationForportfolio) => {
          // array item has to enter this state
          this.setState((prevState) => ({
            exploreList: [
              ...prevState.exploreList,
              informationForportfolio,
            ]
          }
          
          ));
        })
          .finally(() => {
            if (index === array.length - 1) {
              resolve();
            }
          });
      });
    });

    loopPromise.then(() => {
      console.log(this.state.exploreList, "After sort");
    });
  }
  render() {
    if (this.props.appState.loggedIn == null) {
      return <div> loading </div>;
    } else if (this.props.appState.loggedIn === false) {
      return <Redirect to="/home"></Redirect>;
    } else {
      return (
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Explore PAGE</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent color="primary">
            <div
              style={{
                padding: "16px",
                backgroundColor: "lightblue",
                margin: "12px",
                color: "black",
                borderRadius: "6px",
                fontSize: "16pt",
              }}
            >
              <div style={{ textAlign: "center" }}>
                <div>
                  {this.state.exploreList.map((stocks) => (
                    <div key={stocks.companyName}>{stocks.ticker} {stocks.companyName}</div>
                  ))}
                </div>
              </div>
            </div>
          </IonContent>
        </IonPage>
      );
    }
  }
}

export default ExplorePage;
