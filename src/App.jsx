import React, { Component } from 'react';
import './App.css';
import "./sass/app.scss"
import TopSection from "./components/top/index"
import BottomSection from "./components/bottom/index"
import axios from "axios"

const Weather_Key="6ebf59f60b3842c597b170323191803"

class App extends Component {

constructor(props){
  super(props) ;
  this.state={
    cityName:"San Pedro Sula",
    numForecastDays:4,
    temp_c:0,
    isDay:false,
    text:"",
    iconURL:"",
    isloading:true,

  }
}

updateWeather(){
  const{cityName,numForecastDays}= this.state;
  const URL =`https://api.apixu.com/v1/forecast.json?key=${Weather_Key}&q=${cityName}&days=${numForecastDays}`;
  axios
  .get(URL)
  .then(res=>{
   return res.data;
  })
    .then( (data)=>{
      this.setState({temp_c:data.current.temp_c,
        isDay:data.current.is_day,
        text:data.current.condition.text,
        iconURL:data.current.condition.icon,
        isloading:false,
        forecastdays:data.forecast.forecastday
       })

    })
  .catch(err=>{
    if(err) console.error("Cannot fetch weather data from api, ", err);
  });

}

componentDidMount(){
 
  const {eventEmitter}= this.props;
  this.updateWeather();



  eventEmitter.on("updateWeather",(data)=>{
    this.setState({cityName:data}, ()=> this.updateWeather());
    
    console.log("LocationName", data);
  });



}

  render() {

    const{isloading,cityName,temp_c,isDay,text,iconURL,forecastdays}= this.state;



    return <div className='app-container'>
    <div className="main-container">
    {isloading && <h3>Loading Weather...</h3>}
    {!isloading && 
      (
      <div className="top-section">
        <TopSection 
          location={cityName} 
          temp_c={temp_c} 
          isDay={isDay}
          text={text} 
          iconURL={iconURL}
          eventEmitter={this.props.eventEmitter} />
      </div>
      )
    }
    <div className="bottom-section"><BottomSection forecastdays={forecastdays}/></div>

    </div>

    </div>
  }
}

export default App;
