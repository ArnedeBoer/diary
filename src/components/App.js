import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Main from './diary/Main';
import Login from './Login';
import Register from './Register';
import NotFound from './NotFound';

const pageFields = [
    {
        name: 'date',
        title: 'Date',
        type: 'date',
        required: true
    },
    {
        name: 'text',
        title: 'Description',
        placeholder: 'Dear diary...',
        type: 'textarea',
        required: true
    },
    {
        name: 'people',
        title: 'People',
        type: 'select',
        placeholder: 'Bob, Chris, ...',
        list: 'people-list',
        filter: true
    },
    {
        name: 'locations',
        title: 'Locations',
        type: 'select',
        placeholder: 'Cafe Bax, Cafe Lennep, ...',
        list: 'location-list',
        filter: true
    }
];

const supportFields = [
    {
        name: 'name',
        title: 'Name',
        placeholder: 'Cafe Bax',
        type: 'text',
        required: true,
        filter: true
    },
    {
        name: 'text',
        title: 'Description',
        placeholder: 'This location is ...',
        type: 'textarea'
    }
]

let pageFilters = [
    {
        name: 'dateStart',
        title: 'Date start',
        type: 'date'
    },
    {
        name: 'dateEnd',
        title: 'Date end',
        type: 'date'
    }
];

let supportFilters = [];

pageFields.forEach(field => {
    if (field.filter) {
        pageFilters.push(field);
    }
});

supportFields.forEach(field => {
    if (field.filter) {
        supportFilters.push(field);
    }
});

const pages = [
    {
        name: 'pages',
        filters: pageFilters,
        fields: pageFields
    },
    {
        name: 'people',
        filters: supportFilters,
        fields: supportFields
    },
    {
        name: 'locations',
        filters: supportFilters,
        fields: supportFields
    }
];

const pageNames = pages.map(page => {
    return page.name;
})

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
                                        {...props}
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
