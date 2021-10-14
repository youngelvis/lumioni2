
import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
function StockGraph(props) {
  const [stockChartXValues, SetstockChartXValues] = useState([]);
  const [stockChartYValues, SetstockChartyValues] = useState([]);
  const [stockSymbol, SetstockSymbol] = useState("aapl");
  useEffect(() => {
    function fetchStock() {
      //we create a const to hold the api key
      const API_KEY = "Q2PNLH1LZ1QRDE86";
      SetstockSymbol(props.selectedTicker);

      // we save the api address
      // if you want 20 years of historical data change outputsize in the link from compact to full
      let API_call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stockSymbol}&outputsize=compact&apikey=${API_KEY}`;

      let stockChartXValuesFunction = [];
      let stockChartYValuesFunction = [];

      // we make the api call
      fetch(API_call)
        //get the response in json fomat
        .then(function (response) {
          return response.json();
        })
        //get the data
        .then(function (data) {
          console.log(data);

          //the name of the data base we are using is time series(daily)
          // the keys are the dates

          for (var key in data["Time Series (Daily)"]) {
            // console.log(key);
            //we push in the date
            stockChartXValuesFunction.push(key);

            //we access the open price for that date
            stockChartYValuesFunction.push(
              data["Time Series (Daily)"][key]["1. open"]
            );
          }
          // we set the values of values in the state above to the ones gotten here
          SetstockChartXValues(stockChartXValuesFunction);
          SetstockChartyValues(stockChartYValuesFunction);
        });
    }
    fetchStock();
  }, [stockSymbol, props.selectedTicker]);

  return (
    
    <div>
      <h1>Stock Market</h1>
     
      <div>
          <Plot
            data={[
              {
                x: stockChartXValues,
                y: stockChartYValues,
                type: "scatter",
                mode: "lines+markers",
                marker: { color: "red" },
              },
            ]}
            layout={{ autosize: true, title: stockSymbol }}
          />
       
      

      </div>
    </div>

  );
}

export default StockGraph;
