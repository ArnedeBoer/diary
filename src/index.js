import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Match, Miss } from 'react-router';

import './styles/css/style.css';
import Diary from './components/Diary';
import NotFound from './components/NotFound';
import AddPage from './components/AddPage';
import Menu from './components/Menu';

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
