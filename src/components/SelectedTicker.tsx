const SelectedTicker = (props) => {
  // creating an array of stock tickers
  const stockTicker = [
    "aapl",
    "nflx",
    "googl",
    "goog",
    "TSLA",
    "msft",
    "nvda",
    "FB",
    "pltr",
    "spce",
    "gme",
    "baba",
    "spy",
    "wmt",
    "twtr",
    "shop",
    "adbe",
    "arkk",
    "zm",
  ];
  // to handle inputs from users
  const handleChange = (e) => {
    e.preventDefault();
    // transfering data to ListFiller components
    props.onTakeTicker(e.target.value);
  };
  return (
    <div>
      <label>Stock ticker</label>
      <br />
      <input
        onChange={handleChange}
        value={props.selectedTicker}
        list="stockTicker"
        type="text"
        autoFocus
      />

      <datalist id="stockTicker">
        {stockTicker.map((item, indexNum) => (
          <option key={indexNum}>{item}</option>
        ))}
      </datalist>
    </div>
  );
};
export default SelectedTicker;
