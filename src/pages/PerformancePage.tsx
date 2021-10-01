import {

    IonButton,
    IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Component } from "react";

import "./all.css";

import { Redirect } from "react-router";
import WinnersList from "./WinnersList";


class PerformancePage extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      
    };
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
              <IonTitle>Performance PAGE</IonTitle>
            </IonToolbar>
          </IonHeader>
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
                <div><IonButton color='success' routerLink= "/winnerPage"></IonButton></div>
                <div><IonButton color='danger' routerLink= "/losersPage">losers List</IonButton></div>
            </div>

          </IonContent>
        </IonPage>
      );
    }
  }
}
export default PerformancePage;
