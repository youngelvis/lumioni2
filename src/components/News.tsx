import React from "react";

import StockApiService from "../services/StockApiService";

class News extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      dataWinners: [],
      stockTicker: ["aapl", "fb"],
    };
  }
  

  componentDidMount() {
      
    var loopPromise = new Promise<void>((resolve, reject) => {
      
        let portfolioInformation = StockApiService.getNewsInformation(this.props.selectedTicker);
        // let percentageChange = StockApiService.getChangePercentage(a);
        
        portfolioInformation
          .then((informationForportfolio) => {
            
            // eslint-disable-next-line array-callback-return
            informationForportfolio.map((items)=>{
              this.setState((prevState) => ({
                dataWinners: [...prevState.dataWinners, items],
              }));
            })
             
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
          <div key={indexNum}>
             {stocks.newsHeadlines}
          </div>
        ))}

        
      </div>
    );
  }
}
export default News;
