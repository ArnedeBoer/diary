import React from 'react';

class Filters extends React.Component {
    handleSubmit(event) {
        event.preventDefault();

        const trimArray = array => array.map(value => value.trim());
        const getValue = field => document.getElementById(field).value;
        const page = {
            date: getValue('date'),
            text: getValue('text'),
            people: trimArray(getValue('people').split(',')),
            locations: trimArray(getValue('locations').split(','))
        }

        const userid = '1';

        fetch(`/api/page/create/${userid}`, {
            method: "POST",
            body: JSON.stringify(page),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => {
            console.log(res.json());
        });
    };

    render() {
        return (
            <div className="addPage">
                <h1>Add page</h1>
                <form id="addPage" onSubmit={this.handleSubmit}>
                    <label>Date:</label><input id="date" className="text-field" type="text" name="date" />
                    <label>Text:</label><input id="text" className="text-field" type="text" name="text" />
                    <label>People:</label><input id="people" className="text-field" type="text" name="people" />
                    <label>Locations:</label><input id="locations" className="text-field" type="text" name="locations" />
                    <input id="submit" type="submit" />
                </form>
            </div>
        )
    }
}

export default Filters;
