import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import './styles/css/style.css';
import App from './components/App';

const Root = () => {
    return (
        <Router>
            <App />
        </Router>
    )
}

render(<Root/>, document.querySelector('#main'));
