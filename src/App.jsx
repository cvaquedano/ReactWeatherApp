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
    forcastDays:5,
    temp_c:0,
    isDay:false,
    text:"",
    iconURL:"",
    isloading:true,

  }
}

componentDidMount(){
  const{cityName,forcastDays}= this.state;

  const URL =`https://api.apixu.com/v1/forecast.json?key=${Weather_Key}&q=${cityName}&days=${forcastDays}`;
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
      isloading:false })

    })
  .catch(err=>{
    if(err) console.error("Cannot fetch weather data from api, ", err);
  });
}

  render() {

    const{isloading,cityName,temp_c,isDay,text,iconURL}= this.state;



    return <div className='app-container'>
    <div className="main-container">
    {isloading && <h3>Loading Weather...</h3>}
    {!isloading && (<div className="top-section"><TopSection location={cityName} temp_c={temp_c} isDay={isDay}text={text} iconURL={iconURL} /></div>)}
    <div className="bottom-section"><BottomSection/></div>

    </div>

    </div>
  }
}

export default App;
