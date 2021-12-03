import { Component } from "react";
import { auth, db } from "../firebaseConfog";
import "./login.css";
class SignUP extends Component<any, any> {
  // create a constructor
  constructor(props: any) {
    super(props);
    // create state variables
    this.state = {
      firstName: "",
      lastName: "",
      emailSignup: "",
      passwordSignup: "",
    };
  }
  // functions to deal with form input
  handleChange = (e) => {
    // value of input
    var value = e.target.value;
    // id of input
    var id = e.target.id;
    // setting state variable with value in input id with the same name
    this.setState({
      [id]: value,
    });
  };
  componentDidMount = () => {};
  // function to help create user document
  createDocumentForNewUser = (userCredential) => {
    this.connectCurrentUser(userCredential);

    var uid = userCredential.user.uid;
    // Add a new document in collection "cities"
    db.collection("userData")
      .doc(uid)
      .set({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        portfolio: [],
      })
      .then(() => {
        console.log("userData document added to database");
      })
      .catch((error) => {
        alert(`${error}`);
      });
  };

  connectCurrentUser = (userCredential) => {
    var uid = userCredential.user.uid;

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

  handleSignup = () => {
    // transfer data to app component
    this.props.onSavesignUpData(this.state);
    // variable to hold email
    var email = this.state.emailSignup;
    // variable to hold password
    var password = this.state.passwordSignup;
    // to create user
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log("succesfully registered");

        console.log("Creating Document");
        this.createDocumentForNewUser(userCredential);
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
        // ..
      });
  };
  render() {
    return (
      <div>
        <strong>
          {" "}
          <h2>Register</h2>
        </strong>
        <br />
        First Name:
        <input
          className="regField"
          type="text"
          id="firstName"
          value={this.state.firstName}
          onChange={this.handleChange}
        />
        <br />
        Last Name:
        <br />
        <input
          className="regField"
          type="text"
          id="lastName"
          value={this.state.lastName}
          onChange={this.handleChange}
        />
        <br />
        Email:
        <br />
        <input
          className="regField"
          type="email"
          id="emailSignup"
          value={this.state.emailSignup}
          onChange={this.handleChange}
        />
        <br />
        Password:
        <br />
        <input
          className="regField"
          type="password"
          id="passwordSignup"
          value={this.state.passwordSignup}
          onChange={this.handleChange}
        />
        <br />
        <br />
        <button onClick={this.handleSignup} className="submit-btn">
          Register
        </button>
      </div>
    );
  }
}
export default SignUP;
