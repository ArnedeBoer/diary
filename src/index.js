import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import './styles/css/style.css';
import App from './components/App';

class Root extends React.Component {
    constructor() {
        super();

        this.state = {
            session: false
        };
    }

    componentDidMount() {
        return fetch('/api/sessions/verify', {
            method: "POST",
            body: JSON.stringify({hash: localStorage.getItem('hash')}),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(results => {
            if (results.status === 201) {
                this.setState({session: true})
            }
        });
    }

    render() {
        return (
            <Router>
                <App session={this.state.session}/>
            </Router>
        )
    }
}

render(<Root/>, document.querySelector('#main'));
