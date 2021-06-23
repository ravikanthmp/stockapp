import React from "react";
import {Line} from 'react-chartjs-2'
import moment from 'moment'
import {fetchStock} from '../utils/apiHelper'

export class DisplayTicker extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            tickerData : null
        }
    }

    componentDidMount() {
        const tickerName = this.props.tickerName;
        if (tickerName == null){
            this.setState({
                tickerData : null
            })
        }else {

            fetchStock(tickerName)
                .then(resp => resp.json())
                .then(tickerData => {
                    // labels
                    let labels = tickerData.map(dayData =>  moment(dayData.day).format('MM-DD-YY'))
                    let data = tickerData.map(dayData =>  dayData.close)
                    this.setState({
                        tickerData : {
                            labels,
                            data
                        }
                    })
                })
                .catch(err => {
                    console.log(`error ${err}`);
                    this.setState({
                        tickerData : null
                    })
                })
        }
    }



    // const data1 = {
    //     labels: ['1', '2', '3', '4', '5', '6'],
    //     datasets: [
    //         {
    //             label: '# of Votes',
    //             data: [12, 19, 3, 5, 2, 3],
    //             fill: false,
    //             backgroundColor: 'rgb(255, 99, 132)',
    //             borderColor: 'rgba(255, 99, 132, 0.2)',
    //         },
    //     ],
    // };

    render() {

        const options = this.options();

        const data = this.state.tickerData;

        if (data == null){
            return <div>No data found 🤡</div>
        }else {
            const d = {
                labels: data.labels,
                datasets: [
                    {
                        label: 'Price',
                        data: data.data,
                        fill: false,
                        backgroundColor: 'rgb(177,255,99)',
                        borderColor: 'rgb(122,255,99)',
                    },
                ],
            };
            return (<Line data={d} options={options}/>)
        }

    }

    options() {
        const options = {
            options: {
                plugins: {
                    legend: {
                        display: true,
                        labels: {
                            color: 'rgb(255, 99, 132)'
                        }
                    }
                },
                tooltips: {
                    callbacks: {
                        label: function (tooltipItem) {
                            console.log(tooltipItem)
                            return tooltipItem.yLabel;
                        }
                    }
                }
            }

        };
        return options;
    }
}