import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import React from "react";
import News from "../components/News";
import StockGraph from "../components/StockGraph";
import StockRow from "../components/StockRow";

class PortfolioDetails extends React.Component<any, any> {
  render() {
    const { match, location } = this.props;
    // console.log(this.props, "elvis");
    return (
      <IonPage>
        <IonToolbar>
          <IonTitle>stock details</IonTitle>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/list" />
          </IonButtons>
        </IonToolbar>
        <IonContent>
          <div
            style={{
              padding: "16px",
              margin: "12px",
              color: "black",
              borderRadius: "6px",
              fontSize: "16pt",
            }}
          >
            <StockGraph selectedTicker={match.params.ticker} />
            <StockRow stockInfo={location.state} />
            business news
            <News selectedTicker={match.params.ticker} />
          </div>
        </IonContent>
      </IonPage>
    );
  }
}
export default PortfolioDetails;
