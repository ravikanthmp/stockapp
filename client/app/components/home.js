import React from 'react';
import Newsfeed from "./newsfeed";
import {ShowStuff} from "./showStuff";
import {Watchlists} from "./watchlists";
import './../../css/home.css'

export default class Home extends React.Component {
    super(props, context){
        // this.state = {
        //     loggedUserId : null
        // }
    }

    render(){

        // const {loggedUserId : userId} = this.state;
        return (<div className="homePage">
            <div className="homePageLeft">
               <ShowStuff/>
               <Newsfeed/>
           </div>
            <div className="homePageRight">
                <Watchlists/>
            </div>
        </div>)

    }
}