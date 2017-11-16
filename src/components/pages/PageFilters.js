import React from 'react';
import { getValue, processArray } from './../../helpers.js';

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
            <div id="filters">
                <div className="container">
                    <form id="page-filter" onSubmit={(e) => this.handleSubmit(e)}>
                        <div className="filter">
                            <label>People:</label>
                            <input
                                id="people"
                                className="text-field"
                                placeholder="Bob, Chris, ..."
                                type="text"
                                name="people"
                            />
                        </div>
                        <div className="filter">
                            <label>Locations:</label>
                            <input
                                id="locations"
                                className="text-field"
                                placeholder="Cafe Bax, Cafe Lennep, ..."
                                type="text"
                                name="locations"
                            />
                        </div>
                        <div className="filter">
                            <label>Date start:</label>
                            <input
                                id="dateStart"
                                className="text-field"
                                type="date"
                                name="dateStart"
                            />
                        </div>
                        <div className="filter">
                            <label>Date end:</label>
                            <input
                                id="dateEnd"
                                className="text-field"
                                type="date"
                                name="dateEnd"
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
