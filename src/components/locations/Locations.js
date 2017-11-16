import React from 'react';
import Location from './Location';
import AddLocations from './AddLocations';
import LocationFilters from './LocationFilters';

class Locations extends React.Component {
    constructor() {
        super();

        this.setLocations = this.setLocations.bind(this);

        this.state = {
            locations: []
        };
    }

    setLocations(locations) {
        this.setState({ locations });
    }

    render() {
        return (
            <div id="locations">
                <div id="left-column">
                    <LocationFilters
                    setLocations={this.setLocations}
                    />
                    <div id="locations-list">
                    {
                        this.state.locations
                            .map((location, index) => <Location key={index} index={index} details={this.state.locations[index]} locations={this.state.locations} setLocations={this.setLocations}/>)
                    }
                    </div>
                </div>
                <div id="right-column">
                    <AddLocations />
                </div>
            </div>
        )
    }
}

export default Locations;
