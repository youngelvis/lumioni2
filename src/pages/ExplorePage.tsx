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
  // create a constructor
  constructor(props) {
    super(props);
    // create a state
    this.state = {
      exploreList: [],
      stockTicker: [
        "aapl",
        "fb",
        "googl",
        "baba",
        "spy",
        "wmt",
        "twtr",
        "shop",
        "adbe",
        "arkk",
        "zm",
      ],
    };
  }

  componentDidMount() {
    // create a promise
    var loopPromise = new Promise<void>((resolve, reject) => {
      // loop through the state variable named stockTicker
      this.state.stockTicker.forEach((a, index, array) => {
        // get data from api
        let portfolioInformation = StockApiService.getInformationForExplore(a);

        // change promise to real value
        portfolioInformation
          .then((informationForportfolio) => {
            // get data from api
            let avatar = StockApiService.getLogo(a);
            // change promise to real value
            avatar.then((pic) => {
              // create object to hold data of all the data gotten from api
              let info = {
                a: pic,
                b: informationForportfolio,
              };
              // copy object to array in the state
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
                      <IonLabel class="ion-text-justify">
                        <h2 style={{ paddingLeft: "10px" }}>
                          {item.b.companyName}
                        </h2>
                        <h3 style={{ paddingLeft: "10px" }}>{item.b.ticker}</h3>
                      </IonLabel>
                      <IonLabel
                        class="ion-text-wrap ion-text-justify"
                        slot="end"
                      >
                        <h5>$ {item.b.latestPrice}</h5>
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
