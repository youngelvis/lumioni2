import { Redirect, Route } from "react-router-dom";
import { Component } from "react";

import {
  IonApp,
  IonContent,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

import Home from "./pages/Home";
import List from "./pages/List";

import { auth, db } from "./firebaseConfog";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import SignIn from "./pages/SignIn";
import SignUP from "./pages/SignUp";
import ExplorePage from "./pages/ExplorePage";
import PerformancePage from "./pages/PerformancePage";
import WinnersList from "./pages/WinnersList";
import LosersList from "./pages/LosersList";
import PortfolioDetails from "./pages/PortfolioDetails";

class App extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      loggedIn: null,
      userData: {},
      firebaseUser: {},
      signUpData: null,
    };
  }
  componentDidMount = () => {
    // this checks if the user is logged in or not
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("user logged in");
        // console.log(user)
        db.collection("userData")
          .doc(user.uid)
          .get()
          .then((snapshot) => {
            const document = snapshot.data();
            this.setState({
              userData: document,
            });
            // do something with document
          });
        this.setState(
          {
            firebaseUser: user,
            loggedIn: true,
          }
          // this.finishedSignUpSignIn
        );
      } else {
        // User is signed out
        console.log("user notlogged in");
        this.setState({
          firebaseUser: {},
          loggedIn: false,
        });
      }
    });
  };
  // collect sign up information
  saveSignUpData = (data: any) => {
    this.setState(
      {
        userData: data,
      },
      () => {
        console.log(this.state.signUpData);
      }
    );
  };
  finishedSignUpSignIn = () => {
    this.connectCurrentUser();
    if (this.state.signUpData !== null) {
      var uid = this.state.firebaseUser.uid;
      // to create a new document for new users
      db.collection("userData")
        .doc(uid)
        .set({
          firstName: this.state.signUpData.firstName,
          lastName: this.state.signUpData.lastName,
          portfolio: [],
        })
        .then(() => {
          console.log("userData added to database");
          this.setState({
            SignUpData: null,
          });
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    }
  };
  connectCurrentUser = () => {
    var uid = this.state.firebaseUser.uid;

    var connectionFunction = db
      .collection("userData")
      .doc(uid)
      .onSnapshot((doc) => {
        console.log("Current data: ", doc.data());
        this.setState({
          userData: doc.data(),
          connectionFunction: connectionFunction,
        });
      });
  };
  render() {
    return (
      <IonApp>
        <IonContent>
          <IonReactRouter>
            <IonTabs>
              <IonRouterOutlet>
                <Route exact path="/home">
                  <Home
                    onSavesignUpData={this.saveSignUpData}
                    appState={this.state}
                  />
                </Route>
                <Route exact path="/list" component={List}>
                  <List appState={this.state} />
                </Route>
                <Route exact path="/signin">
                  <SignIn />
                </Route>
                <Route
                  exact
                  path="/performancePage"
                  component={PerformancePage}
                >
                  <PerformancePage appState={this.state} />
                </Route>
                <Route exact path="/signUp">
                  <SignUP />
                </Route>
                <Route exact path="/explorePage">
                  <ExplorePage appState={this.state} />
                </Route>
                <Route exact path="/winnerPage">
                  <WinnersList />
                </Route>
                <Route
                  exact
                  path="/portfolioDetails/:ticker"
                  component={PortfolioDetails}
                />
                <Route exact path="/losersPage">
                  <LosersList />
                </Route>
                <Route exact path="/">
                  <Redirect to="/explorePage" />
                </Route>
              </IonRouterOutlet>

              <IonTabBar slot="bottom">
              <IonTabButton tab="explore page" href="/explorePage">
                  <IonLabel>Explore page</IonLabel>
                </IonTabButton>
                
                <IonTabButton tab="performance page" href="/performancePage">
                  <IonLabel>Performance page</IonLabel>
                </IonTabButton>

                <IonTabButton tab="list" href="/list">
                  <IonLabel>Portfolio</IonLabel>
                </IonTabButton>
                
                
              </IonTabBar>
            </IonTabs>
          </IonReactRouter>
        </IonContent>
      </IonApp>
    );
  }
}

export default App;
