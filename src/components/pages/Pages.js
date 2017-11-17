import React from 'react';
import Page from './Page';
import Add from './../Add';
import Filters from './../Filters';

class Pages extends React.Component {
    constructor() {
        super();

        this.updateState = this.updateState.bind(this);

        this.state = {
            pages: []
        };
    }

    updateState(pages) {
        this.setState({ pages });
    }

    render() {
        const filters = [
            {
                name: 'dateStart',
                title: 'Date start',
                type: 'date'
            },
            {
                name: 'dateEnd',
                title: 'Date end',
                type: 'date'
            },
            {
                name: 'people',
                title: 'People',
                type: 'select',
                placeholder: 'Bob, Chris, ...'
            },
            {
                name: 'locations',
                title: 'Locations',
                type: 'select',
                placeholder: 'Cafe Bax, Cafe Lennep, ...'
            }
        ];

        const fields = [
            {
                name: 'adddate',
                title: 'Date',
                type: 'date',
                required: true
            },
            {
                name: 'addtext',
                title: 'Description',
                placeholder: 'Dear diary...',
                type: 'textarea',
                required: true
            },
            {
                name: 'addpeople',
                title: 'People',
                type: 'select',
                placeholder: 'Bob, Chris, ...'
            },
            {
                name: 'addlocations',
                title: 'Locations',
                type: 'select',
                placeholder: 'Cafe Bax, Cafe Lennep, ...'
            }
        ];

        return (
            <div id="pages">
                <div id="left-column">
                    <Filters
                        page="page"
                        filters={filters}
                        updateState={this.updateState}
                    />
                    <div id="page-list">
                    {
                        this.state.pages
                            .map((page, index) => <Page key={index} index={index} details={this.state.pages[index]} pages={this.state.pages} updateState={this.updateState}/>)
                    }
                    </div>
                </div>
                <div id="right-column">
                    <Add
                        page="page"
                        fields={fields}
                    />
                </div>
            </div>
        )
    }
}

export default Pages;
