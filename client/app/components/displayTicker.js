import React from "react";
import {Line} from 'react-chartjs-2'
import moment from 'moment'
import {fetchStock} from '../utils/apiHelper'

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

   React.useEffect(() => {
       console.log(`DisplayTicker: useEffect`);
         console.log({tickerName})
       if (tickerName == null){
           setTickerData(null);
       }else {
           fetchStock(tickerName)
               .then(resp => resp.json())
               .then(tickerData => {
                   console.log({tickerData})
                   // labels
                   let labels = tickerData.map(dayData =>  moment(dayData.day).format('MM-DD-YY'))
                   let data = tickerData.map(dayData =>  dayData.close)
                   setTickerData({
                       labels,
                       data
                   })})
               .catch(err => {
                   console.log(`error ${err}`);
                   setTickerData(null);
               })

   }}, [tickerName]);

    console.log(`DisplayTicker: reRender`);
    if (tickerData == null){
        return <div>No data found 🤡</div>
    }else {
        const d = {
            labels: tickerData.labels,
            datasets: [
                {
                    label: 'Price',
                    data: tickerData.data,
                    fill: false,
                    backgroundColor: 'rgb(177,255,99)',
                    borderColor: 'rgb(122,255,99)',
                },
            ],
        };
        return (<Line data={d} options={options}/>)
    }

}