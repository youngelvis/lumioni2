import {
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
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
import CurrentValue from "../components/CurrentValue";
import PortfolioSummary from "../components/PortfolioSummary";


// import StockGraph from "../components/StockGraph";

class List extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      dataFromForm: "",
      tempData: "",
      portfolio: [],
      visible:true,
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
    // to force the application to render again
    
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
        console.log("current stock successfully added!");
      })
      .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });

    // to force the application to render again
    // this.forceUpdate()
    
    setTimeout(() => {
      window.location.reload();
    }, 500);
    
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
    const buttonText = this.state.visible ? "hide form" :"Click here"
    if (this.props.appState.loggedIn == null) {
      return <div> loading </div>;
    } else if (this.props.appState.loggedIn === false) {
      return <Redirect to="/home"></Redirect>;
    } else {

      return (
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonTitle>portfolio page</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent >
            <div
              style={{
                padding: "16px",
              
                margin: "12px",
                color: "black",
                borderRadius: "6px",
                fontSize: "16pt",
              }}
            >
              <div style={{ textAlign: "center" }}>
                <div>
                  {this.state.visible ? <ListFiller collectData={this.getInformationFromForm} /> :'Add stock to portfolio'}
                  <br></br>
                  <IonButton color='primary' onClick={()=>{
                    this.setState({visible:!this.state.visible})
                  }}>{buttonText} </IonButton>
                  
                 <PortfolioSummary portfolioItems = {this.props.appState.userData.portfolio}/>
                  <IonCard>
                    <IonCardHeader>
                      <IonCardTitle><h2> Portfolio List</h2></IonCardTitle>
                    </IonCardHeader>
                    <IonList>
                     
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
                                <CurrentValue items={item} />
                              </div>
                            )
                          )
                        : "there are no items in the list"}
                        
                    </IonList>
                  </IonCard>
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
