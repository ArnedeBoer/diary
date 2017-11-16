import React from 'react';
import { getValue, emptyStringToNull } from './../../helpers.js';

class Filters extends React.Component {
    handleSubmit(e) {
        e.preventDefault();

        const filters = {
            name: emptyStringToNull(getValue('name'))
        }

        fetch('/api/locations/filter', {
            method: "POST",
            body: JSON.stringify(filters),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(locations => this.props.setLocations(locations));
    };

    render() {
        return (
            <div id="filters">
                <div className="container">
                    <form id="locations-filter" onSubmit={(e) => this.handleSubmit(e)}>
                        <div className="filter">
                            <label>Name:</label>
                            <input
                                id="name"
                                className="text-field"
                                placeholder="Bob, Chris, ..."
                                type="text"
                                name="name"
                            />
                        </div>
                        <input
                            id="submit"
                            type="submit"
                        />
                    </form>
                </div>
            </div>
        )
    }
}

export default Filters;
