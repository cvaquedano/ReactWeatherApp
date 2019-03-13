import React, { Component } from 'react';
import "./style.scss";
export default class TopSection extends Component{
    constructor(props){
        super(props);
        this.state={};
    }
    render(){
        return <div className="top-container">
        <div className="title">Weather Up</div>
        </div>
    }
}