import React from "react";
import '../../css/tickerInput.css'

export class TickerInput extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            tickerName: "SPY"
        }
        this.handleChange = this.handleChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.handleSubmission(this.state.tickerName);
    }

    render() {
        return <form onSubmit={this.onSubmit}>
            <input value={this.state.tickerName}
                   onChange={this.handleChange}
                    style={{width:'60%'}}/>
            <button type='submit' className='searchButton'>🔍</button>
        </form>;
    }

    handleChange(e) {
        this.setState({
            tickerName: e.target.value
        })
    }
}