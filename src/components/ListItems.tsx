import { IonIcon } from "@ionic/react";
import { trash } from "ionicons/icons";

import { Component } from "react";
import { Link } from "react-router-dom";
import StockApiService from "../services/StockApiService";


class ListItem extends Component<any, any> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(props: any) {
    super(props);
    this.state = {
      companyName: "",
    };
  }
  refresh=()=>{
    this.forceUpdate()
  }
  componentDidMount = () => {
   
    const companyName = StockApiService.getCompanyName(
      this.props.items.selectedTicker
    );
    companyName.then((companyName)=>{
        this.setState({
            companyName: companyName,
          });
    })
    
    
  };


  render() {
    return (
      <div>
        <Link
          to={{
            pathname: `/portfolioDetails/${this.props.items.selectedTicker}`,
            state: { stockInfo: this.props.items },
          }}
        >
          {this.props.items.selectedTicker} {this.state.companyName}
          
        </Link>
        <IonIcon
          onClick={() => {
            this.props.handleDelete(this.props.indexNum)
            this.refresh()
          }}
          icon={trash}
        ></IonIcon>
      </div>
    );
  }
}
export default ListItem;
