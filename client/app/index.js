import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component{

    render() {
        return <React.Fragment>
            Hi there!
        </React.Fragment>
    }

}

ReactDOM.render(<App/>, document.getElementById('app'))