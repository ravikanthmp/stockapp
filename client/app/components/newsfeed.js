import React from 'react';
import {Article} from "./article";
import './../../css/newsfeed.css';

export default class Newsfeed extends React.Component{

    constructor(props, context) {
        super(props, context);
        this.state = {
            status : null,
            totalResults : null,
            articles : []
        }
    }

    componentDidMount() {
        this.fetchAllNews()
            .then(data => {
                this.setState({
                    status : data.status,
                    totalResults : data.totalResults,
                    articles : data.articles
                })
            })
            .catch(err => {
                this.setState({
                    status : "error",
                    totalResults : 0,
                    articles :  []
                })
            })
    }

    render() {
        const {status, totalResults, articles} = this.state;
        if (status === "error"){
            return (<div>
                <h3>Error!</h3>
            </div>)
        }else {
            return <div id="feed" className="feed">
                {articles.map( (article, index) => <Article content={article} key={index}/>)}
            </div>
        }
    }

    async fetchAllNews() {
        const res = fetch('http://localhost:8000/news/allfinance')
            .then(response => response.json())
            .then(data => data)
            .catch(err => {
                throw new Error(err)
            });

        const data = await res;
        return data;
    }
}