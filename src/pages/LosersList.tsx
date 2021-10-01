import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonBackButton,
  IonButtons,
} from "@ionic/react";
import React from "react";
import StockApiService from "../services/StockApiService";

class LosersList extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      datalosers: [],
      stockTicker: ["aapl", "fb", "TSLA", "msft"],
    };
  }
  a;
  componentDidMount() {
    var loopPromise = new Promise<void>((resolve, reject) => {
      this.state.stockTicker.forEach((a, index, array) => {
        let portfolioInformation =
          StockApiService.getInformationForPortfolio(a);
        // let percentageChange = StockApiService.getChangePercentage(a);

        portfolioInformation
          .then((informationForportfolio) => {
            // array item has to enter this state
            this.setState((prevState) => ({
              datalosers: [
                ...prevState.datalosers,
                informationForportfolio,
              ]
            }
            
            ),()=>{
                console.log(this.state.datalosers)
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
      this.state.datalosers.sort((a, b) =>
        a.changePercentage > b.changePercentage ? 1 : -1
      );
      
    });
    console.log(this.state.datalosers, "After sort");
  }

  // console.log(data1[1].companyName, "des");

  render() {
    
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>losers PAGE</IonTitle>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/performancePage" />
            </IonButtons>
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
                {this.state.datalosers.map((stocks) => (
                  <li key={stocks.companyName}>{stocks.ticker} {stocks.companyName} {stocks.changePercentage}</li>
                ))}
              </div>
            </div>
          </div>
        </IonContent>
      </IonPage>
    );
  }
}
export default LosersList;
