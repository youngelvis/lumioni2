import { Component } from "react";
import SelectedTicker from "./SelectedTicker";

import StockApiService from "../services/StockApiService";
import { IonCard, IonCardContent, IonCardTitle } from "@ionic/react";

class ListFiller extends Component<any, any> {
  // creating a constructor
  constructor(props) {
    super(props);
    // creating state variables to hold values from form

    this.state = {
      selectedTicker: "",
      enteredShare: "",
      enteredAmount: "",
      enteredDate: "",
      companyName: "",
      totalCost: "",
      totalValue: "",
      percentageChange: "",
    };
  }

  // collecting the value from the html form
  handleChange = (e) => {
    // value from form
    var value = e.target.value;
    // the name of the input id
    var id = e.target.id;
    this.setState(
      // setting the state variable with the value of the input id with the same name
      // eg selectedTicker : selectedTicker <---(id name)
      {
        [id]: value,
      }
    );
  };
  // collecting data for selected ticker from an external component named selectedTicker
  collectStockTicker = (data) => {
    // setting the state variable named selectedTicker to data obtained from external component
    this.setState({
      selectedTicker: data,
    });
  };
  // created a function used to tell the code what to do when users submit a form
  handleAdd = (e) => {
    // get the name of the company from the api
    const companyName = StockApiService.getCompanyName(
      this.state.selectedTicker
    );
      // change the promise to a real value
    companyName.then((companyName) => {
      // set the state variable named company name to the name of the company
      this.setState({ companyName: companyName });
      // set the state variable named total cost to the multiplication result of entered shares and entered amount
      this.setState({
        totalCost: this.state.enteredShare * this.state.enteredAmount,
      });
      // send the state to the List component 
      this.props.collectData(this.state);
    });

    // reset the input field after 2 and half seconds after the code has done 
    //the needful with the data gotten from users
    setTimeout(() => {
      this.setState({
        selectedTicker: "",
        enteredShare: "",
        enteredAmount: "",
        enteredDate: "",
        companyName: "",
      });
    }, 2500);
  };

  render() {
    return (
      <IonCard>
        <IonCardTitle> Enter Stock details</IonCardTitle>
        <IonCardContent>
          <SelectedTicker
            onTakeTicker={this.collectStockTicker}
            selectedTicker={this.state.selectedTicker}
          />
          <div>
            <label>no of shares</label>
            <br />
            <input
              type="number"
              min="0.01"
              step="0.01"
              onChange={this.handleChange}
              id="enteredShare"
              value={this.state.enteredShare}
            />
          </div>
          <div>
            <label>amount per share</label>
            <br />
            <input
              type="number"
              min="0.01"
              step="0.01"
              id="enteredAmount"
              onChange={this.handleChange}
              value={this.state.enteredAmount}
            />
          </div>
          <div>
            <label>Transaction Date</label>
            <br />
            <input
              type="date"
              min="2000-01-01"
              max="2021-12-12"
              id="enteredDate"
              onChange={this.handleChange}
              value={this.state.enteredDate}
            />
          </div>
          <div>
            <br />
            <button onClick={this.handleAdd}> add </button>
          </div>
        </IonCardContent>
      </IonCard>
    );
  }
}
export default ListFiller;
