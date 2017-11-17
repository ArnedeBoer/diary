import React from 'react';
import Location from './Location';
import Add from './../Add';
import Filters from './../Filters';

class Locations extends React.Component {
    constructor() {
        super();

        this.updateState = this.updateState.bind(this);

        this.state = {
            locations: []
        };
    }

    updateState(locations) {
        this.setState({ locations });
    }

    render() {
        const filters = [
            {
                name: 'name',
                title: 'Location',
                type: 'text'
            }
        ];

        const fields = [
            {
                name: 'addname',
                title: 'Name',
                placeholder: 'Cafe Bax',
                type: 'text',
                required: true
            },
            {
                name: 'addtext',
                title: 'Description',
                placeholder: 'This location is ...',
                type: 'textarea'
            }
        ];

        return (
            <div id="locations">
                <div id="left-column">
                    <Filters
                        page="locations"
                        filters={filters}
                        updateState={this.updateState}
                    />
                    <div id="locations-list">
                    {
                        this.state.locations
                            .map((location, index) => <Location key={index} index={index} details={this.state.locations[index]} locations={this.state.locations} updateState={this.updateState}/>)
                    }
                    </div>
                </div>
                <div id="right-column">
                    <Add
                        page="locations"
                        fields={fields}
                    />
                </div>
            </div>
        )
    }
}

export default Locations;
