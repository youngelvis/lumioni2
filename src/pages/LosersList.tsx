import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonBackButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonItem,
  IonLabel,
  IonCardHeader,
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

  componentDidMount() {
    var loopPromise = new Promise<void>((resolve, reject) => {
      this.state.stockTicker.forEach((a, index, array) => {
        let portfolioInformation = StockApiService.getInformationForSorting(a);
        // let percentageChange = StockApiService.getChangePercentage(a);

        portfolioInformation
          .then((informationForportfolio) => {
            // array item has to enter this state
            this.setState(
              (prevState) => ({
                datalosers: [...prevState.datalosers, informationForportfolio],
              }),
              () => {
                console.log(this.state.datalosers);
              }
            );
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
      this.state.datalosers.sort((a, b) =>
        a.changePercentage > b.changePercentage ? 1 : -1
      );

      this.forceUpdate();
    }, 2000);
    console.log(this.state.datalosers, "After sort");
  };
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
          <div style={{ textAlign: "center" }}>
            <IonCard>
            <IonCardHeader><h1>Top losers of the day</h1></IonCardHeader>
              <IonCardContent>
                {this.state.datalosers.map((stocks) => (
                  <IonCard key={stocks.companyName}>
                    <IonItem >
                      <IonLabel>
                        <h2> {stocks.ticker}</h2> <h1>{stocks.companyName}</h1>{" "}
                      </IonLabel>
                      <IonLabel>
                        <h1> {stocks.changePercentage}</h1>
                      </IonLabel>
                    </IonItem>
                  </IonCard>
                ))}
              </IonCardContent>
            </IonCard>
          </div>
        </IonContent>
      </IonPage>
    );
  }
}
export default LosersList;
