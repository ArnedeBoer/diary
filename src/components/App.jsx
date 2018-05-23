import React from 'react';
import { Route, Switch, Redirect, BrowserRouter as Router } from 'react-router-dom';

import Main from './diary/Main.jsx';
import NotFound from './NotFound.jsx';
import { pageFields, supportFields, pages, pageNames } from './../defaults.js';

class App extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" render={() => (<Redirect to="/pages" />)} />
                    {
                        pages.map((page, index) =>
                            <Route
                                exact
                                key={index}
                                path={`/${page.name}`}
                                render={ () => {
                                        return <Main
                                            pageNames={pageNames}
                                            pageName={page.name}
                                            filters={page.filters}
                                            fields={page.fields}
                                        />
                                    }
                                }
                            />
                        )
                    }
                    <Route component={NotFound} />
                </Switch>
            </Router>
        )
    }
}

export default App;
