import {
  IonCard,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
} from "@ionic/react";
import { trash } from "ionicons/icons";

import { Component } from "react";
import { Link } from "react-router-dom";

class ListItem extends Component<any, any> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(props: any) {
    super(props);
    this.state = {};
  }
  // refresh=()=>{
  //   this.forceUpdate()
  // }
  componentDidMount = () => {};
  deleteItem = () => {
    this.props.handleDelete(this.props.indexNum);
  };

  render() {
    return (
      <IonCard>
        <IonItemSliding>
          <IonItem>
          
            <IonLabel slot="start">
            <Link
              to={{
                pathname: `/portfolioDetails/${this.props.items.selectedTicker}`,
                state: { stockInfo: this.props.items },
              }}
              style={{ color:'black', textDecoration: 'none'}}
            >
              <h2>{this.props.items.selectedTicker} </h2>
              <h3>{this.props.items.companyName}</h3>
              </Link>
            </IonLabel>
           

            <IonLabel slot="end"class="ion-text-wrap">
              ${this.props.items.totalCost}
            </IonLabel>
          </IonItem>
          <IonItemOptions side="end">
            <IonItemOption onClick={this.deleteItem}>
              <IonIcon icon={trash}></IonIcon>
            </IonItemOption>
          </IonItemOptions>
          
          <br></br>
        </IonItemSliding>
      </IonCard>
    );
  }
}
export default ListItem;
