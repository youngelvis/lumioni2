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
  // creating a constructor
  constructor(props) {
    super(props);
    // create a state variable named Newscontainer thats an array
    this.state = {
      NewsContainer: [],
    };
  }

  componentDidMount() {
    // creating a promise to get the information
    var loopPromise = new Promise<void>((resolve, reject) => {
      // getting the data from the api
      let portfolioInformation = StockApiService.getNewsInformation(
        this.props.selectedTicker
      );

      // changing from promise to real value
      portfolioInformation
        .then((informationForportfolio) => {
          //looping the array from the api
          // eslint-disable-next-line array-callback-return
          informationForportfolio.map((items) => {
            //copying the array from the api to the state array
            this.setState((prevState) => ({
              NewsContainer: [...prevState.NewsContainer, items],
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
      //
    });
  }

  // console.log(data1[1].companyName, "des");

  render() {
    return (
      <div>
        {/* looping through the state array named news container */}
        {this.state.NewsContainer.map((stocks, indexNum) => (
          // link to  News url
          <Link
            to={{ pathname: stocks.newsUrl }}
            target="_blank"
            key={indexNum}
            style={{ textDecoration: "none" }}
          >
            <IonCard key={indexNum} color="light">
              <IonImg src={stocks.newsImage} />
              <IonCardHeader>
                <IonCardSubtitle>{stocks.newsSource}</IonCardSubtitle>
                <IonCardTitle>
                  <h3>{stocks.newsHeadlines}</h3>
                </IonCardTitle>
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
