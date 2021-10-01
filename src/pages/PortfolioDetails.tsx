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
    constructor (props){
        super(props)
        this.state ={
            
        }
        
    }
    componentDidMount(){
      console.log(this.props.location)
    }
     
  render() {
   
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
                <StockGraph />
                portfolio info
                <StockRow selectedTicker= 'aapl' />
                business news
                <News selectedTicker= 'aapl'/>
            </div>
            </IonContent>

      </IonPage>
    );
  }
}
export default PortfolioDetails;
