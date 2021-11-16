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
  IonIcon,
  IonAvatar,
  IonImg,
} from "@ionic/react";
import { refreshCircleSharp } from "ionicons/icons";
import React from "react";

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
            let avatar = StockApiService.getLogo(a);
            avatar.then((pic) => {
              let info = {
                a: pic,
                b: informationForportfolio,
              };
              this.setState((prevState) => ({
                exploreList: [...prevState.exploreList, info],
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

    loopPromise.then(() => {});
  }
  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Lumioni Stock Tracker</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonCard>
            <IonCardHeader>
              <span style={{ textAlign: "right" }}>
                <h2>
                  <IonIcon
                    icon={refreshCircleSharp}
                    color="primary"
                    onClick={() => window.location.reload()}
                  ></IonIcon>
                </h2>
              </span>
              <h2>Popular Stocks </h2>
            </IonCardHeader>

            <IonCardContent>
              <IonList>
                {this.state.exploreList.map((item, indexNum) => (
                  <IonCard key={indexNum}>
                    <IonItem>
                      <IonAvatar>
                        <IonImg src={item.a} />
                      </IonAvatar>
                      <IonLabel class="ion-text-justify" >
                        <h3>{item.b.ticker}</h3>
                        <h2>{item.b.companyName}</h2>
                      </IonLabel>
                      <IonLabel
                        class="ion-text-wrap ion-text-justify"
                        slot="end"
                      >
                        <h5>${item.b.latestPrice}</h5>
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

export default ExplorePage;
