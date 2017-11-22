import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Match, Miss } from 'react-router';

import './styles/css/style.css';
import Menu from './components/Menu';
import Diary from './components/Diary';
import NotFound from './components/NotFound';

const Root = () => {
    return (
        <BrowserRouter>
            <div>
                <Menu />
                <Match pattern="/" component={Diary} />
                <Miss component={NotFound} />
            </div>
        </BrowserRouter>
    )
}

render(<Root/>, document.querySelector('#main'));
