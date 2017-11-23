import React from 'react';
import Item from './Item';
import Add from './Add';
import Filters from './Filters';
import Input from './fields/Input';
import Textarea from './fields/Textarea';
import Select from './fields/Select';

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

    renderType(field, index, page, handleChange, updateSelectState) {
        switch(field.type) {
            case 'textarea':
            return (
                <Textarea
                    key={index}
                    field={field}
                    page={page}
                    updateSelectState={updateSelectState}
                    handleChange={handleChange}
                />
            );

            case 'select':
            return (
                <Select
                    key={index}
                    field={field}
                    page={page}
                    updateSelectState={updateSelectState}
                    handleChange={handleChange}
                />
            );

            default:
            return (
                <Input
                    key={index}
                    field={field}
                    page={page}
                    updateSelectState={updateSelectState}
                    handleChange={handleChange}
                />
            );
        }
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
        const pageName = location === '' ? 'pages' : location;

        return (
            <div id="pages">
                <div id="left-column">
                    <Filters
                        page={pageName}
                        fields={filters}
                        updateState={this.updateState}
                        renderType={this.renderType}
                    />
                    <div id="page-list">
                        {
                            this.state.items
                                .map((page, index) =>
                                    <Item
                                        page={pageName}
                                        key={index}
                                        index={index}
                                        details={page}
                                        fields={fields}
                                        items={this.state.items}
                                        updateState={this.updateState}
                                        renderType={this.renderType}
                                    />
                                )
                        }
                    </div>
                </div>
                <div id="right-column">
                    <Add
                        page={pageName}
                        fields={fields}
                        renderType={this.renderType}
                    />
                </div>
            </div>
        )
    }
}

export default Items;
