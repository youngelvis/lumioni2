import {
  IonAccordion,
  IonAccordionGroup,
  IonAvatar,
  IonCard,
  IonIcon,
  IonImg,
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
import StockApiService from "../services/StockApiService";

class ListItem extends Component<any, any> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  // created a construtor
  constructor(props: any) {
    super(props);
    // created a state variable to hold logo
    this.state = {
      avatar: "",
    };
  }
  // refresh=()=>{
  //   this.forceUpdate()
  // }

  componentDidMount = () => {
    // getting the logo from the stock api
    const avatar = StockApiService.getLogo(this.props.items.selectedTicker);
    // change it from a promise to a real value
    avatar.then((pic) => {
      // setting the state variable to the logo
      this.setState({
        avatar: pic,
      });
    });
  };
  // function that assist in deleting an item
  deleteItem = () => {
    // sending the index number of the item to be deleted back to the List component
    this.props.handleDelete(this.props.indexNum);
  };

  render() {
    return (
      <IonCard>
        <IonAccordionGroup>
          <IonAccordion>
            <IonItem slot="header">
              <IonAvatar>
                <IonImg src={this.state.avatar} />
              </IonAvatar>

              <IonLabel>
                <h2 style={{ paddingLeft: "10px" }}>
                  {this.props.items.companyName}
                </h2>
                <h3 style={{ paddingLeft: "10px" }}>
                  {this.props.items.selectedTicker}{" "}
                </h3>
              </IonLabel>
            </IonItem>
            <IonList slot="content">
              <IonItem>
                <CurrentValue items={this.props.items} />
              </IonItem>
              <IonItem>
                {/* creating a link to the portfolio details page while also transferring the state */}
                <Link
                  to={{
                    pathname: `/portfolioDetails/${this.props.items.selectedTicker}`,
                    state: { stockInfo: this.props.items },
                  }}
                  style={{ color: "blue", textDecoration: "none" }}
                >
                  {" "}
                  <p>More info</p>
                </Link>
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
