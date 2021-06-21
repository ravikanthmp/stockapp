import React from "react";

export class Article extends React.Component {
    render() {
        const {content, key} = this.props;
        const {source, author, title, description, url, urlToImage, publishedAt} = content;
        const {name} = source;
        return (<div key={key} className="article">
            <h5>{name} {this.hoursSince(publishedAt)} hr</h5>
            <h3>{title}</h3>
            <h4>{description}</h4>
            <a href={url}>Link to article</a>
        </div>)
    }

    hoursSince(d1){
        const dt1 = new Date(d1);
        const dt2 = new Date();
       return this.diff_hours(dt1, dt2);
    }

    diff_hours(dt2, dt1)
    {

        var diff =(dt2.getTime() - dt1.getTime()) / 1000;
        diff /= (60 * 60);
        return Math.abs(Math.round(diff));

    }
}