import { IonPage } from "@ionic/react";
import { Component } from "react";
import SignIn from "./SignIn";
import SignUP from "./SignUp";
import "./all.css";

import { Redirect } from "react-router";

class Home extends Component<any, any> {
  // create constructor
  constructor(props: any) {
    super(props);
    // create state variables
    this.state = {
      signUpData: {},
      formSwitcher: false,
    };
  }
  componentDidMount = () => {};

  // create function to handle data from signup page
  saveSignUpData = (data: any) => {
    // set state to data gotten from sign up page
    this.setState(
      {
        signUpData: data,
      },
      // transfer data to App component
      () => {
        this.props.onSavesignUpData(this.state.signUpData);
      }
    );
  };
  // function that switches the login form and signup form
  formSwitcher = (action) => {
    this.setState({
      formSwitcher: action === "register" ? true : false,
    });
  };
  render() {
    // if user is logged in user should be redirected to List page
    if (this.props.appState.loggedIn == null) {
      return <div> loading </div>;
    } else if (this.props.appState.loggedIn === true) {
      return <Redirect to="/list"></Redirect>;
    } else {
      // it displays this on the dom if user is not logged in
      // it shows this if login form at first and changes when user clicks on a button
      const form = !this.state.formSwitcher ? (
        <SignIn />
      ) : (
        <SignUP onSavesignUpData={this.saveSignUpData} />
      );
      return (
        <IonPage className="bgForLoginAndReg">
          <div className="mainBlock">
            {form}
            <br></br>
            {!this.state.formSwitcher ? (
              <span className="underline">
                Not Registered?{" "}
                {/* if users clicks on this button it switches the form from login to signup */}
                <button
                  className="linkBtn"
                  onClick={() =>
                    this.formSwitcher(
                      !this.state.formSwitcher ? "register" : "login"
                    )
                  }
                >
                  {" "}
                  create an account{" "}
                </button>
              </span>
            ) : (
              <span className="underline">
                Have an Account?{" "}
                {/* if users clicks on this button it switches the form from signup to login*/}
                <button
                  className="linkBtn"
                  onClick={() =>
                    this.formSwitcher(
                      !this.state.formSwitcher ? "register" : "login"
                    )
                  }
                >
                  {" "}
                  Sign in here{" "}
                </button>
              </span>
            )}
          </div>
        </IonPage>
      );
    }
  }
}

export default Home;
