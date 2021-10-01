
const SelectedTicker = (props) =>{
   
    const stockTicker =[
        'aapl',
        'nflx',
        'googl',
        'goog',
        'TSLA',
        'msft',
        'nvda',
        'FB',
        'pltr',
        'spce',
        'gme',
        'baba',
        'spy',
        'wmt',
        'twtr',
        'shop',
        'adbe',
        'arkk',
        'zm'
      ];
     const handleChange =(e)=>{
        e.preventDefault();
        
         props.onTakeTicker(e.target.value)
         
         
     }
    return (
        <div>
          <label>title</label>
          <select
            onChange={handleChange}
           
          >
             {stockTicker.map((item, indexNum) => <option  key={indexNum} value={item}>{item}</option>)}
            
          </select>
        </div>
    )
}
export default SelectedTicker;