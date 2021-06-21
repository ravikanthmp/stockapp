import React from 'react';
import ReactDOM from 'react-dom';
import Newsfeed from "./components/newsfeed";
import Home from "./components/home";

class App extends React.Component{

    render() {
        return <React.Fragment>
         <Home/>
        </React.Fragment>
    }

}

ReactDOM.render(<App/>, document.getElementById('app'))