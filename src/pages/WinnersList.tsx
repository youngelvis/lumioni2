import {
  IonBackButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import StockApiService from "../services/StockApiService";

class WinnersList extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      dataWinners: [],
      stockTicker: ["aapl", "fb", "TSLA", "msft"],
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
            this.setState(
              (prevState) => ({
                dataWinners: [
                  ...prevState.dataWinners,
                  informationForportfolio,
                ],
              }),
              () => {
                console.log(this.state.dataWinners);
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
      this.state.dataWinners.sort((a, b) =>
        a.changePercentage < b.changePercentage ? 1 : -1
      );

      this.forceUpdate();
    }, 2000);
    console.log(this.state.dataWinners, "After sort");
  };

  render() {
    return (
      <IonPage>
        <IonHeader></IonHeader>
        <IonContent color="primary">
          <IonToolbar>
            <IonTitle>Winners PAGE</IonTitle>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/performancePage" />
            </IonButtons>
          </IonToolbar>

          <div style={{ textAlign: "center" }}>
            <IonCard>
              <IonCardHeader><h1>Top winners of the day</h1></IonCardHeader>
              <IonCardContent>
                {this.state.dataWinners.map((stocks) => (
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
export default WinnersList;
