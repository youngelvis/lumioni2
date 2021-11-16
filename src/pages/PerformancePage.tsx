import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Component } from "react";
import { arrowForwardSharp, arrowBackCircleSharp, refreshCircleSharp } from "ionicons/icons";

import "./all.css";
import WinnersList from "./WinnersList";
import LosersList from "./LosersList";

class PerformancePage extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      change: false,
    };
  }

  render() {
    const buttonText = !this.state.change ?'Loser list ' : 'winners list ';
    const iconText = !this.state.change ?`${arrowForwardSharp}` : ` ${arrowBackCircleSharp}`;
    const colour = !this.state.change ?'danger' : 'success';
    return (
      <IonPage >
        <IonHeader>
          <IonToolbar>
            <IonTitle>Performance PAGE</IonTitle>
          </IonToolbar>
        </IonHeader >
       
        <IonContent color='dark'>

          <div
          className= 'bgForLoginAndReg'
            style={{
              padding: "16px",
          
              margin: "12px",
              color: "black",
              borderRadius: "6px",
              fontSize: "16pt",
            }}
          >
            <span style={{ textAlign: "right" }}>
                <h2>
                  <IonIcon
                    icon={refreshCircleSharp}
                    color= 'success'
                    onClick={() => window.location.reload()}
                  ></IonIcon>
                </h2>
              </span>
            <div style={{textAlign: 'center'}}>
              <IonButton
              color={colour} 
              onClick={() => {
                this.setState({ change: !this.state.change});
              }}>{buttonText}
              <IonIcon
              icon={iconText}></IonIcon></IonButton>
              {!this.state.change ? (
                <WinnersList />
              ):(
                <LosersList />
              )}

            </div>
          </div>
        </IonContent>
     
      </IonPage>
    );
  }
}
export default PerformancePage;
