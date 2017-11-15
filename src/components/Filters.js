import React from 'react';
import { getValue, processArray } from './../helpers.js';

class Filters extends React.Component {
    handleSubmit(e) {
        e.preventDefault();

        const filters = {
            dateStart: getValue('dateStart'),
            dateEnd: getValue('dateEnd'),
            people: processArray(getValue('people')),
            locations: processArray(getValue('locations'))
        }

        fetch('/api/page/filter', {
            method: "POST",
            body: JSON.stringify(filters),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(pages => this.props.setPages(pages));
    };

    render() {
        return (
            <div className="filters">
                <div className="container">
                    <h1>Filters</h1>
                    <form id="filters" onSubmit={(e) => this.handleSubmit(e)}>
                        <label>People:</label>
                        <input
                            id="people"
                            className="text-field"
                            placeholder="Bob, Chris, ..."
                            type="text"
                            name="people"
                        />
                        <label>Locations:</label>
                        <input
                            id="locations"
                            className="text-field"
                            placeholder="Cafe Bax, Cafe Lennep, ..."
                            type="text"
                            name="locations"
                        />
                        <label>Date start:</label>
                        <input
                            id="dateStart"
                            className="text-field"
                            type="date"
                            name="dateStart"
                        />
                        <label>Date end:</label>
                        <input
                            id="dateEnd"
                            className="text-field"
                            type="date"
                            name="dateEnd"
                        />
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
