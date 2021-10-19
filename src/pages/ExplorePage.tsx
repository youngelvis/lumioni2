import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonCard,
  IonCardContent,
  IonCardHeader,
} from "@ionic/react";
import React from "react";
import { Redirect } from "react-router";
import StockApiService from "../services/StockApiService";
class ExplorePage extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      exploreList: [],
      stockTicker: ["aapl", "fb", "googl"],
    };
  }

  componentDidMount() {
    var loopPromise = new Promise<void>((resolve, reject) => {
      this.state.stockTicker.forEach((a, index, array) => {
        let portfolioInformation = StockApiService.getInformationForExplore(a);
        // let percentageChange = StockApiService.getChangePercentage(a);

        portfolioInformation
          .then((informationForportfolio) => {
            // array item has to enter this state
            this.setState((prevState) => ({
              exploreList: [...prevState.exploreList, informationForportfolio],
            }));
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
          <IonContent>
            <IonCard>
              <IonCardHeader>
                {" "}
                <h2>Popular Stocks</h2>
              </IonCardHeader>
              <IonCardContent>
                <IonList>
                  {this.state.exploreList.map((item, indexNum) => (
                    <IonCard key={indexNum}>
                    <IonItem >
                      <IonLabel class="ion-text-justify" slot="start">
                        <h3>{item.ticker}</h3>
                        <h2>{item.companyName}</h2>
                      </IonLabel>
                      <IonLabel class="ion-text-wrap ion-text-justify" slot="end">
                        <h5>${item.latestPrice}</h5>
                      </IonLabel>
                    </IonItem>
                    </IonCard>
                  ))}
                </IonList>
              </IonCardContent>
            </IonCard>
          </IonContent>
        </IonPage>
      );
    }
  }
}

export default ExplorePage;
