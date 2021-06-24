import React from "react";
import {Line} from 'react-chartjs-2'
import moment from 'moment'
import {fetchStock} from '../utils/apiHelper'
import '../../css/displayTicker.css'

export function DisplayTicker({tickerName}) {

    const [tickerData, setTickerData] = React.useState(null);

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

    const d = {
        labels: tickerData?.labels,
        datasets: [
            {
                label: 'Price',
                data: tickerData?.data,
                fill: false,
                backgroundColor: 'rgb(177,255,99)',
                borderColor: 'rgb(122,255,99)',
            },
        ],
    };

    React.useEffect(() => {
        console.log(`DisplayTicker: useEffect ${tickerName}`);
        console.log({tickerName})
        if (tickerName == null) {
            setTickerData(null);
        } else {
            fetchStock(tickerName)
                .then(resp => resp.json())
                .then(tickerData => {
                    console.log({tickerData})
                    // labels
                    let labels = tickerData.map(dayData => moment(dayData.day).format('MM-DD-YY'))
                    let data = tickerData.map(dayData => dayData.close)
                    setTickerData({
                        labels,
                        data
                    })
                })
                .catch(err => {
                    console.log(`error ${err}`);
                    setTickerData(null);
                })

        }

        return () => setTickerData(null);
    }, [tickerName]);

    const onTimeSelect = (e) => {
        if (e.target.nodeName === 'BUTTON') {
            console.log(`Timerange selected : ${e.target.innerHTML}`)
        }

    }

    console.log(`DisplayTicker: reRender ${tickerName}`);
    if (tickerData == null) {
        return <div className='container'>
            <div>🤡</div>
        </div>
    } else {
        return (<div className='container'>
            <Line data={d} options={options}/>
            <ul className='timerange-options-list no-style-list' onClick={onTimeSelect}>
                <li>🔴 Live</li>
                <li>
                    <button>1d</button>
                </li>
                <li>
                    <button>1w</button>
                </li>
                <li>
                    <button>1mo</button>
                </li>
                <li>
                    <button>3mo</button>
                </li>
                <li>
                    <button>6mo</button>
                </li>
                <li>
                    <button>1y</button>
                </li>

            </ul>
        </div>)
    }

}