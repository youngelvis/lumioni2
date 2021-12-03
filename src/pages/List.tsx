import {
  IonButton,
  IonCard,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import { Component } from "react";

import "./all.css";
import { auth, db } from "../firebaseConfog";
import { Redirect } from "react-router";
import ListFiller from "../components/ListFiller";

import ListItem from "../components/ListItems";

import PortfolioSummary from "../components/PortfolioSummary";
import { arrowUp, refreshCircleSharp, addCircle } from "ionicons/icons";

// import StockGraph from "../components/StockGraph";

class List extends Component<any, any> {
  // create a constructor
  constructor(props: any) {
    super(props);
    // create state variables
    this.state = {
      dataFromForm: "",
      tempData: "",
      portfolio: [],
      visible: false,
    };
  }
  // function to get item from ListFiller component
  getInformationFromForm = (data) => {
    // set state varible dataFromForm to data gotten from listfiller component
    this.setState(
      {
        dataFromForm: data,
      },
      //c all handle add function
      () => {
        this.handleAdd();
      }
    );
    // calling this function
  };

  // function to remove data from database

  handleDelete = (indexNum) => {
    // console.log(indexNum)

    // removing item from the database

    // currentStocks.splice(indexNum, 1);
    this.props.appState.userData.portfolio.splice(indexNum, 1);

    //get the user Id
    var uid = this.props.appState.firebaseUser.uid;
    // access the document in the database
    var docRef = db.collection("userData").doc(uid);

    // updating the database
    docRef
      .update({
        portfolio: this.props.appState.userData.portfolio,
      })
      .then(() => {
        console.log("current stock successfully deleted!");
      })
      .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
    // to force the application to reload

    setTimeout(() => {
      window.location.reload();
    }, 500);
  };
  // function to add item from the state
  handleAdd = () => {
    // adding new items to the new array
    this.props.appState.userData.portfolio.push(this.state.dataFromForm);

    //get the user Id
    var uid = this.props.appState.firebaseUser.uid;
    // access the document in the database
    var docRef = db.collection("userData").doc(uid);

    // updating the database
    docRef
      .update({
        portfolio: this.props.appState.userData.portfolio,
      })
      .then(() => {
        alert("current stock successfully added!");
      })
      .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });

    // to force the application to render again
    // this.forceUpdate()
    // reload poage
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        // Sign-out successful.
        console.log("signout");
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };
  componentDidMount = () => {
   
  };

  render() {
    const buttonText = this.state.visible ? `${arrowUp}` : `${addCircle}`;
    if (this.props.appState.loggedIn == null) {
      return <div> loading </div>;
    } else if (this.props.appState.loggedIn === false) {
      return <Redirect to="/home"></Redirect>;
    } else {
      return (
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonTitle style={{ textAlign: "center" }}>
                {this.props.appState.userData.firstName}'s portfolio page
              </IonTitle>
            </IonToolbar>
          </IonHeader>
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
              <div style={{ textAlign: "right" }}>
                <IonIcon
                  icon={refreshCircleSharp}
                  color="success"
                  onClick={() => window.location.reload()}
                ></IonIcon>
              </div>

              <div style={{ textAlign: "center" }}>
                <div>
                  <PortfolioSummary
                    portfolioItems={this.props.appState.userData.portfolio}
                  />
                  <IonCard>
                    <IonCardTitle>
                      <h2 style={{ textAlign: "left", paddingLeft: "10px" }}>
                        {" "}
                        Portfolio List
                      </h2>
                    </IonCardTitle>

                    <IonList>
                      {/* loop through item in database */}
                      {this.props.appState.userData.portfolio
                        ? this.props.appState.userData.portfolio.map(
                            (item, indexNum) => (
                              <div key={indexNum}>
                                <ListItem
                                  key={indexNum}
                                  items={item}
                                  indexNum={indexNum}
                                  handleDelete={this.handleDelete}
                                />
                              </div>
                            )
                          )
                        : "there are no items in the list"}
                    </IonList>
                    {/* switch between having form display or not */}
                    {this.state.visible ? (
                      // if form is displayed collect data from Listfiler component
                      <ListFiller collectData={this.getInformationFromForm} />
                    ) : (
                      ""
                    )}
                  {/* switch between two icon depending on if the form is shown or not */}
                    <IonIcon
                      icon={buttonText}
                      color="primary"
                      size="large"
                      onClick={() => {
                        this.setState({ visible: !this.state.visible });
                      }}
                    ></IonIcon>
                  </IonCard>
                </div>

                <br />
                <br />
                {/* click to sign out */}
                <IonButton onClick={this.handleSignOut}
                size='small'
                color='light'>sign out</IonButton>
              </div>
            </div>
          </IonContent>
        </IonPage>
      );
    }
  }
}

export default List;
