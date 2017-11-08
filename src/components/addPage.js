import React from 'react';
import { getValue, processArray } from './../helpers.js';

class Filters extends React.Component {
    constructor() {
        super();

        this.handleChange = this.handleChange.bind(this);

        this.state = {
            date: '',
            text: '',
            people: '',
            locations: ''
        }
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();

        const page = {
            date: getValue('date'),
            text: getValue('text'),
            people: processArray(getValue('people')),
            locations: processArray(getValue('locations'))
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
            console.log(res);
        });
    };

    render() {
        const { date, text } = this.state;
        const dateIsValid = date.length > 0;
        const textIsValid = text.length > 0;
        const formIsValid = dateIsValid && textIsValid;

        return (
            <div className="addPage">
                <h1>Add page</h1>
                <form id="addPage" onSubmit={this.handleSubmit}>
                    <label>Date:</label>
                    <input
                        id="date"
                        className="text-field"
                        placeholder="2017-01-01"
                        onChange={this.handleChange}
                        type="date"
                        name="date"
                    />
                    <label>Text:</label>
                    <textarea
                        id="text"
                        className="text-field"
                        placeholder="Today I ..."
                        onChange={this.handleChange}
                        type="text"
                        name="text"
                    />
                    <label>People:</label>
                    <input
                        id="people"
                        className="text-field"
                        placeholder="Bob, Chris, ..."
                        onChange={this.handleChange}
                        type="text"
                        name="people"
                    />
                    <label>Locations:</label>
                    <input
                        id="locations"
                        className="text-field"
                        placeholder="Cafe Bax, Cafe Lennep, ..."
                        onChange={this.handleChange}
                        type="text"
                        name="locations"
                    />
                    <input
                        id="submit"
                        type="submit"
                        disabled={!formIsValid}
                    />
                </form>
            </div>
        )
    }
}

export default Filters;
