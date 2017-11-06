import React from 'react';

class Filters extends React.Component {
    render() {
        return (
            <div className="filters">
                <div className="container">
                    <h1>Filters</h1>
                    <form id="filters" action="/" method="post">
                        <label>People:</label><input id="people" className="text-field" type="text" name="people" />
                        <label>Locations:</label><input id="locations" className="text-field" type="text" name="locations" />
                        <label>Date start:</label><input id="dateStart" className="text-field" type="text" name="dateStart" />
                        <label>Date end:</label><input id="dateEnd" className="text-field" type="text" name="dateEnd" />
                        <input id="submit" type="submit" />
                    </form>
                </div>
            </div>
        )
    }
}

export default Filters;
