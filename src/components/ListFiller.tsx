import { Component } from "react";
import SelectedTicker from "./SelectedTicker";

import StockApiService from "../services/StockApiService";
import { IonCard, IonCardContent, IonCardTitle } from "@ionic/react";

class ListFiller extends Component<any, any> {
  constructor(props) {
    super(props);

    this.state = {
      selectedTicker: "",
      enteredShare: "",
      enteredAmount: "",
      enteredDate: "",
      companyName: "",
      totalCost: "",
      totalValue: "",
      percentageChange: ""
    };
  }
  
  // collecting the value from the html form
  handleChange = (e) => {
    var value = e.target.value;
    var id = e.target.id;
    this.setState(
      {
        [id]: value,
      }
    
    );
  };
  // collecting data for selected ticker
  collectStockTicker =(data)=>{
    this.setState(
        {
            selectedTicker : data
        }
    )

  }
  // used to collect the data stored in the state
  handleAdd = (e) => {
    // this.props.onListState(this.state);

  
    const companyName = StockApiService.getCompanyName(
      this.state.selectedTicker
    );

    companyName.then((companyName)=>{
        this.setState({companyName: companyName});
        this.setState({totalCost: this.state.enteredShare * this.state.enteredAmount})
        this.props.collectData(this.state)
    })
    

  };
  
  render() {
    return (
      <IonCard>
        <IonCardTitle> Enter Stock details</IonCardTitle>
       <IonCardContent>
        <SelectedTicker onTakeTicker ={this.collectStockTicker} />
        <div>
          <label>no of shares</label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            onChange={this.handleChange}
            id="enteredShare"
            
          />
        </div>
        <div>
          <label>amount per share</label>
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
