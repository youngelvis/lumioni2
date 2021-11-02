import { IonPage } from "@ionic/react";
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
      formSwitcher: false,
    };
  }
  componentDidMount = () => {
    
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
  formSwitcher = (action) => {
    this.setState({
      formSwitcher: action === "register" ? true : false,
    });
  };
  render() {
    if (this.props.appState.loggedIn == null) {
      return <div> loading </div>;
    } else if (this.props.appState.loggedIn === true) {
      return <Redirect to="/list"></Redirect>;
    } else {
      const form = !this.state.formSwitcher ? (
        <SignIn />
      ) : (
        <SignUP onSavesignUpData={this.saveSignUpData} />
      );
      return (
        <IonPage className= 'bgForLoginAndReg'>
          <div className="mainBlock">
            {form}
            <br></br>
            {!this.state.formSwitcher ? (
              <span className="underline">
                Not Registered?{" "}
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
