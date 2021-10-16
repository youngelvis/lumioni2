const SelectedTicker = (props) => {
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
  const handleChange = (e) => {
    e.preventDefault();

    props.onTakeTicker(e.target.value);
  };
  return (
    <div>
      
        <label>Stock ticker :</label>

        <input onChange={handleChange} list="stockTicker" type="text" />
      

      <datalist id= "stockTicker">
        {stockTicker.map((item, indexNum) => (
          <option key={indexNum}>{item}</option>
        ))}
      </datalist>
    </div>
  );
};
export default SelectedTicker;
