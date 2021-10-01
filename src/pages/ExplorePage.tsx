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
        let companyName = StockApiService.getCompanyName(a);

        // let percentageChange = StockApiService.getChangePercentage(a);
        companyName
          .then((nameOfCompany) => {
            let percentageChange = StockApiService.getChangePercentage(a);

            percentageChange.then((changePercentage) => {
              // var realDataArray = [];
              const realData = {
                companyName: nameOfCompany,
                changePercentage: changePercentage,
                ticker: a,
              };
              // realDataArray.push(realData)

              this.setState((prevState) => ({
                exploreList: [...prevState.exploreList, realData],
              }));
            });
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
