import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Match, Miss } from 'react-router';

import './styles/css/style.css';
import Menu from './components/Menu';
import Diary from './components/Diary';
import AddPage from './components/AddPage';
import NotFound from './components/NotFound';

const Root = () => {
    return (
        <BrowserRouter>
            <div>
                <Menu />
                <Match exactly pattern="/" component={Diary} />
                <Match exactly pattern="/addPage" component={AddPage} />
                <Miss component={NotFound} />
            </div>
        </BrowserRouter>
    )
}

render(<Root/>, document.querySelector('#main'));
