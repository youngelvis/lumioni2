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
    const { match, location } = this.props
    console.log(this.props, "Bemi")
    return (
      <IonPage>
        <IonToolbar>
          <IonTitle>portfolio details PAGE</IonTitle>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/list" />
          </IonButtons>
        </IonToolbar>
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
              <div></div>
            </div>
            StockGraph
                <StockGraph selectedTicker= {match.params.ticker} />
                portfolio info
                <StockRow stockInfo= {location.state.selectedTicker} />
                business news
                <News selectedTicker= {match.params.ticker}/>
            </div>
            </IonContent>

      </IonPage>
    );
  }
}
export default PortfolioDetails;
