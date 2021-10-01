import {} from "@ionic/react";
import { Component } from "react";
import { Redirect } from "react-router";
import { auth} from "../firebaseConfog";
class SignIn extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      emailSignin: "",
      passwordSignin: "",
    };
  }
  handleChange = (e) => {
    var value = e.target.value;
    var id = e.target.id;
    this.setState(
      {
        [id]: value,
      })
  };
  componentDidMount = () => {
    console.log("i was mounted- sigin");
  };
  handleSignin = () => {
    var email = this.state.emailSignin;
    var password = this.state.passwordSignin;
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
       console.log("successfullty signed in")
       return <Redirect to="/list"/>
        // ...
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
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
        <strong> Sign IN</strong>
        <br />
        <br />
        Email:
        <br />
        <input
          type="email"
          id="emailSignin"
          value={this.state.emailSignin}
          onChange={this.handleChange}
        />
        <br />
        Password:
        <br />
        <input
          type="password"
          id="passwordSignin"
          value={this.state.passwordSignin}
          onChange={this.handleChange}
        />
        <br />
        <br />
        <button onClick={this.handleSignin}>sign in</button>
      </div>
    );
  }
}
export default SignIn;
