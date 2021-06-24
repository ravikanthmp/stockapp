import React from "react";
import {DisplayTicker} from "./displayTicker";
import {TickerInput} from "./tickerInput";
import '../../css/showStuff.css'

export class ShowStuff extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            tickerName: "SPY"
        }
        this.updateTickerName = this.updateTickerName.bind(this);
    }

    updateTickerName(name) {
        if (name !== this.state.tickerName){
            this.setState({
                tickerName: name
            })
        }

    }

    render() {
        return (<div className="showStuff">
            <TickerInput handleSubmission={(tickerName) => this.updateTickerName(tickerName) }/>
            <DisplayTicker tickerName={this.state.tickerName} style={{width: "700px"}}/>
        </div>)
    }
}