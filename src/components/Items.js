import React from 'react';
import Item from './Item';
import Add from './Add';
import Filters from './Filters';

class Items extends React.Component {
    constructor() {
        super();

        this.updateState = this.updateState.bind(this);

        this.state = {
            items: []
        };
    }

    updateState(items) {
        this.setState({ items });
    }

    render() {
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

        const location = this.props.location.pathname.replace('/', '');
        const fields = location === '' ? pageFields : supportFields;
        const filters = location === '' ? pageFilters : supportFilters;
        const pageName = location === '' ? 'page' : location;

        const addFields = fields.map(field => {
            field.name = `add${field.name}`

            return field;
        })

        return (
            <div id="pages">
                <div id="left-column">
                    <Filters
                        page={pageName}
                        filters={filters}
                        updateState={this.updateState}
                    />
                    <div id="page-list">
                    {
                        this.state.items
                            .map((page, index) =>
                                <Item
                                    page={pageName}
                                    key={index}
                                    index={index}
                                    details={this.state.items[index]}
                                    items={this.state.items}
                                    updateState={this.updateState}
                                />
                            )
                    }
                    </div>
                </div>
                <div id="right-column">
                    <Add
                        page={pageName}
                        fields={addFields}
                    />
                </div>
            </div>
        )
    }
}

export default Items;
