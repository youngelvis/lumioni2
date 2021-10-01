import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Component } from "react";
import SignIn from "./SignIn";
import SignUP from "./SignUp";
import "./all.css";

import { Redirect } from "react-router";


class Home extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      signUpData: {},
    };
  }
  componentDidMount = () => {
    console.log("i was mounted - home page");
  };

  saveSignUpData = (data: any) => {
    this.setState(
      {
        signUpData: data,
      },
      () => {
        this.props.onSavesignUpData(this.state.signUpData);
      }
    );
  };
  render() {
    if (this.props.appState.loggedIn == null) {
      return <div> loading </div>;
    } else if (this.props.appState.loggedIn === true) {
      return <Redirect to="/list"></Redirect>;
    } else {
      return (
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonTitle>LANDING PAGE</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent color="primary">
            <SignUP onSavesignUpData={this.saveSignUpData} />
            <SignIn />
          </IonContent>
        </IonPage>
      );
    }
  }
}

export default Home;
