/* eslint-disable jsx-a11y/alt-text */
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonImg,
} from "@ionic/react";
import React from "react";
import { Link } from "react-router-dom";

import StockApiService from "../services/StockApiService";

class News extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      dataWinners: [],
    };
  }

  componentDidMount() {
    var loopPromise = new Promise<void>((resolve, reject) => {
      let portfolioInformation = StockApiService.getNewsInformation(
        this.props.selectedTicker
      );
      

      portfolioInformation
        .then((informationForportfolio) => {
          // eslint-disable-next-line array-callback-return
          informationForportfolio.map((items) => {
            this.setState((prevState) => ({
              dataWinners: [...prevState.dataWinners, items],
            }));
          });

          // array item has to enter this state
        })
        .finally(() => {
          // if (index === array.length - 1) {
          //   resolve();
          // }
        });
    });

    loopPromise.then(() => {
      console.log(this.state.dataWinners, "After sort");
    });
  }

  // console.log(data1[1].companyName, "des");

  render() {
    return (
      <div>
        {this.state.dataWinners.map((stocks, indexNum) => (
          <Link to={{pathname:stocks.newsUrl}} target ="_blank"key={indexNum} style ={{textDecoration: 'none'}}>
          <IonCard key={indexNum} color='light'>
            
            <IonImg src={stocks.newsImage} />
            <IonCardHeader>
              <IonCardSubtitle>{stocks.newsSource}</IonCardSubtitle>
              <IonCardTitle><h3>{stocks.newsHeadlines}</h3></IonCardTitle>
            </IonCardHeader>

            <IonCardContent>{stocks.newsSummary}</IonCardContent>
          
          </IonCard>
          </Link>
        ))}
      </div>
    );
  }
}
export default News;
