import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Match, Miss } from 'react-router';

import './styles/css/style.css';
import Menu from './components/Menu';
import Pages from './components/pages/Pages';
import People from './components/people/People';
import Locations from './components/locations/Locations';
import NotFound from './components/NotFound';

const Root = () => {
    return (
        <BrowserRouter>
            <div>
                <Menu />
                <Match exactly pattern="/" component={Pages} />
                <Match exactly pattern="/people" component={People} />
                <Match exactly pattern="/locations" component={Locations} />
                <Miss component={NotFound} />
            </div>
        </BrowserRouter>
    )
}

render(<Root/>, document.querySelector('#main'));
