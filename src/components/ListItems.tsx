import {
  IonAccordion,
  IonAccordionGroup,
  IonCard,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonLabel,
  IonList,
} from "@ionic/react";
import { trash } from "ionicons/icons";

import { Component } from "react";
import { Link } from "react-router-dom";
import CurrentValue from "./CurrentValue";
import "../pages/all.css";

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
        <IonAccordionGroup>
          <IonAccordion>
            <IonItem slot="header">
              <IonLabel slot="start">
                
                  <h2>{this.props.items.selectedTicker} </h2>
                  <h3>{this.props.items.companyName}</h3>
                
              </IonLabel>
            </IonItem>
            <IonList slot="content">
              <IonItem>
                <CurrentValue items={this.props.items} />
              </IonItem>
              <IonItem>
              <Link
                  to={{
                    pathname: `/portfolioDetails/${this.props.items.selectedTicker}`,
                    state: { stockInfo: this.props.items },
                  }}
                  style={{ color: "blue", textDecoration: "none" }}
                > <p>More info</p></Link>
              </IonItem>
              <IonItem>
                <IonIcon icon={trash} onClick={this.deleteItem}></IonIcon>
              </IonItem>
              
            </IonList>
            <IonItemOptions side="end">
              <IonItemOption></IonItemOption>
            </IonItemOptions>

            <br></br>
          </IonAccordion>
        </IonAccordionGroup>
      </IonCard>
    );
  }
}
export default ListItem;
