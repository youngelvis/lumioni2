import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
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
    const time = (ms) => {
      return new Promise((resolve, reject) => {
        if (!this.state.isloading) {
          setTimeout(resolve, ms);
        } else {
          reject(console.log("shop is closed"));
        }
      });
    };

    var winnerList = async () => {
      try {
       await time(1000);
        
        this.state.stockTicker.forEach((a) => {
          let portfolioInformation =
            StockApiService.getInformationForPortfolio(a);
          // let percentageChange = StockApiService.getChangePercentage(a);

          portfolioInformation.then((informationForportfolio) => {
            // array item has to enter this state
            this.setState(
              (prevState) => ({
                dataWinners: [
                  ...prevState.dataWinners,
                  informationForportfolio,
                ],
              }),
              () => console.log(this.state.dataWinners)
            );
          });
        });

        await time(2000);

        this.state.dataWinners.sort((a, b) =>
          a.changePercentage < b.changePercentage ? 1 : -1
        );
        console.log(this.state.dataWinners);
      } catch (error) {
        console.log(error);
      } finally {
      }
    }

    winnerList();
  }

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
                {this.state.dataWinners.map((stocks) => (
                  <li key={stocks.companyName}>
                    {stocks.ticker} {stocks.companyName}{" "}
                    {stocks.changePercentage}
                  </li>
                ))}
              </div>
            </div>
          </div>
        </IonContent>
      </IonPage>
    );
  }
}
export default WinnersList;
