import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Main from './diary/Main.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';
import NotFound from './NotFound.jsx';
import { pageFields, supportFields, pages, pageNames } from './../defaults.js';

class App extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" render={() => (<Redirect to="/pages" />)} />
                {
                    pages.map((page, index) =>
                        <Route
                            exact
                            key={index}
                            path={`/${page.name}`}
                            render={ props => {
                                    return this.props.session ?
                                    <Main
                                        pageNames={pageNames}
                                        pageName={page.name}
                                        filters={page.filters}
                                        fields={page.fields}
                                    /> : <Login />
                                }
                            }
                        />
                    )
                }
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/logout" render={ props => {
                        localStorage.clear();
                        window.location.replace('/login');
                    }
                } />
                <Route component={NotFound} />
            </Switch>
        )
    }
}

export default App;
