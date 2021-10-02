import { Component } from "react";
import { auth, db} from "../firebaseConfog";
class SignUP extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      emailSignup: "",
      passwordSignup: "",
    };
  }
  handleChange = (e) => {
      
    var value = e.target.value;
    var id = e.target.id;
    this.setState(
      {
        [id]: value,
      },
      
    );
  };
  componentDidMount = () => {
    console.log("i was mounted - signup");
  };

  createDocumentForNewUser = (userCredential) => {
    this.connectCurrentUser(userCredential); 
  
    var uid = userCredential.user.uid
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
        console.error("Error writing document: ", error);
      });
    
  };

  connectCurrentUser =(userCredential)=>{
    var uid = userCredential.user.uid

    var connectionFunction = db.collection("userData").doc(uid)
    .onSnapshot((doc) => {
        console.log("Current data: ", doc.data());
        this.setState({
          userData: doc.data(),
          connectionFunction: connectionFunction,
        })

    });
  }

  handleSignup = () => {

    this.props.onSavesignUpData(this.state)
    console.log(this.state)
      var email = this.state.emailSignup;
      var password = this.state.passwordSignup;
        auth
          .createUserWithEmailAndPassword(email, password)
          .then((userCredential) => {
            // Signed in
            // var user = userCredential.user;
            // // ...
            console.log('succesfully registered')

            console.log('Creating Document')
            this.createDocumentForNewUser(userCredential)
          })
          .catch((error) => {
            console.log(error.code)
            console.log(error.message);
            // ..
          });
  };
  render() {
    return (
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
        <strong> sign up</strong>
        <br />
        <br />
        First Name:
        <br />
        <input
          type="text"
          id="firstName"
          value={this.state.firstName}
          onChange={this.handleChange}
        />
        <br />
        Last Name:
        <br />
        <input
          type="text"
          id="lastName"
          value={this.state.lastName}
          onChange={this.handleChange}
        />
        <br />
        Email:
        <br />
        <input
          type="email"
          id="emailSignup"
          value={this.state.emailSignup}
          onChange={this.handleChange}
        />
        <br />
        Password:
        <br />
        <input
          type="password"
          id="passwordSignup"
          value={this.state.passwordSignup}
          onChange={this.handleChange}
        />
        <br />
        <br />
        <button onClick={this.handleSignup}>sign up</button>
      </div>
    );
  }
}
export default SignUP;