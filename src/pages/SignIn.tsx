import {} from "@ionic/react";
import { Component } from "react";
import { Redirect } from "react-router";
import { auth } from "../firebaseConfog";
import "./login.css";
class SignIn extends Component<any, any> {
  // create a constructor
  constructor(props: any) {
    super(props);
    // create state variables
    this.state = {
      emailSignin: "",
      passwordSignin: "",
    };
  }
  // create function to handle form input
  handleChange = (e) => {
    // value of input
    var value = e.target.value;
    // id of input
    var id = e.target.id;
    // set state variables with value of input id with the same name
    this.setState({
      [id]: value,
    });
  };
  componentDidMount = () => {};
  // this funnction works once signin button is clicked
  handleSignin = () => {
    // variable to hold user email
    var email = this.state.emailSignin;
    // variable to hold user password
    var password = this.state.passwordSignin;
    // checking authenticate of data
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        alert("successfullty signed in");
        return setTimeout(() => {
          <Redirect to="/list" />;
        }, 500);
        // ...
      })
      .catch((error) => {
        console.log(error.code);
        alert(error.message);
      });
  };
  render() {
    return (
      <>
        <strong>
          {" "}
          <h3>Log IN</h3>
        </strong>
        Email:
        <br />
        <input
          className="regField"
          type="email"
          id="emailSignin"
          value={this.state.emailSignin}
          onChange={this.handleChange}
        />
        <br />
        Password:
        <br />
        <input
          className="regField"
          type="password"
          id="passwordSignin"
          value={this.state.passwordSignin}
          onChange={this.handleChange}
        />
        <br />
        <br />
        <button onClick={this.handleSignin} className="submit-btn">
          sign in
        </button>
      </>
    );
  }
}
export default SignIn;
