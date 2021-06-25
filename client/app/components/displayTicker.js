import React from "react";
import {Line} from 'react-chartjs-2'
import moment from 'moment'
import {fetchStock} from '../utils/apiHelper'
import '../../css/displayTicker.css'
import {GiClown} from 'react-icons/all'

export function DisplayTicker({tickerName}) {

    const [tickerData, setTickerData] = React.useState(null);

    const [selectedTimeRange, setSelectedTimeRange] = React.useState(null);

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

    const timeFilter = (row, timeRangeSelected) => {

        const d = new Date(row.day);
        const today = new Date();
        today.setHours(0, 0, 0);
        let p;
        if (timeRangeSelected == null || timeRangeSelected === '1y'){
            p =  moment(today).subtract(1, 'y').toDate();
        }else if (timeRangeSelected === '1w') {
            p =  moment(today).subtract(1, 'w').toDate();
        }else if (timeRangeSelected === '1mo') {
            p =  moment(today).subtract(1, 'M').toDate();
        }else if (timeRangeSelected === '3mo') {
            p =  moment(today).subtract(3, 'M').toDate();
        }else if (timeRangeSelected === '6mo') {
            p =  moment(today).subtract(6, 'M').toDate();
        }else if (timeRangeSelected === '1d') {
            p =  moment(today).subtract(1, 'd').toDate();
        }
        return d >= p;
    }

    React.useEffect(() => {
        console.log(`DisplayTicker::useEffect ${tickerName}`)
        if (tickerName == null) {
            setTickerData(null);
        } else {
            fetchStock(tickerName)
                .then(resp => resp.json())
                .then(tickerData => {
                    setTickerData(tickerData)
                })
                .catch(err => {
                    console.log(`error ${err}`);
                    setTickerData(null);
                })

        }

        return () => setTickerData(null);
    }, [tickerName]);

    const constructChartData = (tickerData, selectedTimeRange) => {
        const filteredData = tickerData.filter(dayData => timeFilter(dayData, selectedTimeRange))
        // labels
        console.log({filteredData})

        let labels = [];
        let data = [];
        if (filteredData){
            labels = filteredData.map(dayData => moment(dayData.day).format('MM-DD-YY'))
            data = filteredData.map(dayData => dayData.close)
        }

        return {
            labels,
            datasets: [
                {
                    label: 'Price',
                    data,
                    fill: false,
                    backgroundColor: 'rgb(177,255,99)',
                    borderColor: 'rgb(122,255,99)',
                },
            ],
        };
    }

    const onTimeSelect = (e) => {
        if (e.target.nodeName === 'BUTTON') {
            console.log(`Timerange selected : ${e.target.innerHTML}`)
            const timeRangeSelected = e.target.id;
            setSelectedTimeRange(timeRangeSelected)
            setButtonStyles(timeRangeSelected)
        }
    }

    const setButtonStyles = (id) => {
        const list = document.getElementById('list')
        const btns = list.querySelectorAll('button')
        btns.forEach(function(el){
            if(el.classList.contains("selected-time-btn")){
                el.classList.remove("selected-time-btn")
                el.classList.add("unselected-time-btn")
            }
            if (el.id === id){
                el.classList.add("selected-time-btn")
                el.classList.remove("unselected-time-btn")
            }
        })
    }


    if (tickerData == null) {
        return <div className='container'>
            <div><GiClown size='200px'/></div>
        </div>
    } else {
        console.log(`DisplayTicker: reRender ${tickerName} timeRange ${selectedTimeRange}`);

        const x = constructChartData(tickerData, selectedTimeRange)
        console.log({x})

        return (<div className='container'>
            <Line data={constructChartData(tickerData, selectedTimeRange)} options={options}/>
            <ul id='list' className='timerange-options-list no-style-list' onClick={onTimeSelect}>
                <li id='LIVE'>🔴 Live</li>
                <li>
                    <button id='1d'>1d</button>
                </li>
                <li>
                    <button id='1w'>1w</button>
                </li>
                <li>
                    <button id='1mo'>1mo</button>
                </li>
                <li>
                    <button id='3mo'>3mo</button>
                </li>
                <li>
                    <button id='6mo'>6mo</button>
                </li>
                <li>
                    <button id='1y'>1y</button>
                </li>

            </ul>
        </div>)
    }

}