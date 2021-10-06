import {
  IonContent,
  IonHeader,
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
import CurrentValue from "../components/CurrentValue";

// import StockGraph from "../components/StockGraph";

class List extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      dataFromForm: "",
    };
  }
  // function to get item from ListFiller component
  getInformationFromForm = (data) => {
    this.setState(
      {
        dataFromForm: data,
      },
      () => {
        this.handleAdd();
      }
    );
    // calling this function
  };

  // function to remove data from database

  handleDelete = (indexNum) => {
    // console.log(indexNum)

    // the current snapshot of the database
    var currentStocks = this.props.appState.userData.portfolio;

    // removing item from the database

    currentStocks.splice(indexNum, 1);

    //get the user Id
    var uid = this.props.appState.firebaseUser.uid;
    // access the document in the database
    var docRef = db.collection("userData").doc(uid);

    // updating the database
    docRef
      .update({
        portfolio: currentStocks,
      })
      .then(() => {
        console.log("current stock successfully deleted!");
      })
      .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
    // to force the application to render again
    this.forceUpdate();
  };
  // function to add item from the state
  handleAdd = () => {
    // the current snapshot of the database
    var currentStocks = this.props.appState.userData.portfolio;

    // adding new items to the new array
    currentStocks.push(this.state.dataFromForm);

    //get the user Id
    var uid = this.props.appState.firebaseUser.uid;
    // access the document in the database
    var docRef = db.collection("userData").doc(uid);

    // updating the database
    docRef
      .update({
        portfolio: currentStocks,
      })
      .then(() => {
        console.log("current stock successfully added!");
      })
      .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });

    // to force the application to render again
    this.forceUpdate();
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
  componentDidMount = () => {};

  render() {
    if (this.props.appState.loggedIn == null) {
      return <div> loading </div>;
    } else if (this.props.appState.loggedIn === false) {
      return <Redirect to="/home"></Redirect>;
    } else {
      var items = this.props.appState.userData.portfolio;
      //   console.log(items)
      return (
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonTitle>portfolio page</IonTitle>
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
              <div style={{ textAlign: "center" }}>
                <div>
                  <ListFiller collectData={this.getInformationFromForm} />

                  {items
                    ? items.map((item, indexNum) => (
                        <div key={indexNum}>
                          <ListItem
                            key={indexNum}
                            items={item}
                            indexNum={indexNum}
                            handleDelete={this.handleDelete}
                          />
                          <CurrentValue
                            collectData={this.getInformationFromForm}
                            items={item}
                          />
                        </div>
                      ))
                    : "there are no items in the list"}
                </div>

                <br />
                <br />
                <button onClick={this.handleSignOut}>sign out</button>
              </div>
            </div>
          </IonContent>
        </IonPage>
      );
    }
  }
}

export default List;
