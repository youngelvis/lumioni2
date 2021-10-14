import { IonIcon } from "@ionic/react";
import { trash } from "ionicons/icons";

import { Component } from "react";
import { Link } from "react-router-dom";

class ListItem extends Component<any, any> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(props: any) {
    super(props);
    this.state = {
    
    };
  }
  // refresh=()=>{
  //   this.forceUpdate()
  // }
  componentDidMount = () => {
   
    // const companyName = StockApiService.getCompanyName(
    //   this.props.items.selectedTicker
    // );
    // companyName.then((companyName)=>{
    //     this.setState({
    //         companyName: companyName,
    //       });
    // })
    
    
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
          {this.props.items.selectedTicker} {this.props.items.companyName}       
        </Link>
        <IonIcon
          onClick={() => {
            this.props.handleDelete(this.props.indexNum)
            // this.refresh()
          }}
          icon={trash}
        ></IonIcon>
        <br></br>
        Total Cost: ${this.props.items.totalCost}
      </div>
    );
  }
}
export default ListItem;
