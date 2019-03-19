import React, { Component } from 'react';
import "./style.scss"
import Forcastday from './forcastdat';
export default class BottomSection extends Component{
    constructor(props){
        super(props);
        this.state={};
    }
    render(){
        const {forecastdays} = this.props;
        return <div className="bottom-container">
        
        <div className="inner-container">
        {forecastdays && forecastdays.map((day,idx)=>{
                return <Forcastday day={day.day} key={idx}/>;
            })
        }
        </div>
        
        
        </div>
    }
}