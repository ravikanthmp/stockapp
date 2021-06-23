import React from "react";
import {DisplayTicker} from "./displayTicker";


export class ShowStuff extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            tickerName : "SPY"
        }
        this.updateTickerName = this.updateTickerName.bind(this);
    }

    updateTickerName(e){
        this.setState({
            tickerName : e.target.value
        })
    }

    render() {
        // return (<div>Stuff 🍆</div>);
        return (<div className="showStuff">
            <input value={this.state.tickerName} on
                   onChange={this.updateTickerName}/>
            <DisplayTicker key={this.state.tickerName} tickerName={this.state.tickerName} style={{width : "700px"}}/>
        </div>)
    }
}