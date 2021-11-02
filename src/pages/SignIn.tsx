import {} from "@ionic/react";
import { Component } from "react";
import { Redirect } from "react-router";
import { auth } from "../firebaseConfog";
import './login.css'
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
    this.setState({
      [id]: value,
    });
  };
  componentDidMount = () => {
  };
  handleSignin = () => {
    var email = this.state.emailSignin;
    var password = this.state.passwordSignin;
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        console.log("successfullty signed in");
        return <Redirect to="/list" />;
        // ...
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
      });
  };
  render() {
    return (
      <>
      <strong> <h3>Log IN</h3></strong>
      <form>
        
        <br />
        <br />
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
      </form>
      </>
    );
  }
}
export default SignIn;
