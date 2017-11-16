import React from 'react';
import { getValue, emptyStringToNull, processArray } from './../../helpers.js';

class AddPage extends React.Component {
    constructor() {
        super();

        this.handleChange = this.handleChange.bind(this);

        this.state = {
            addDate: '',
            addText: '',
            addPeople: '',
            addLocations: ''
        }
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();

        const page = {
            date: emptyStringToNull(getValue('addDate')),
            text: emptyStringToNull(getValue('addText')),
            people: processArray(getValue('addPeople')),
            locations: processArray(getValue('addLocations'))
        }

        const userid = '2';

        fetch(`/api/page/create/${userid}`, {
            method: "POST",
            body: JSON.stringify(page),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => {
            if (res.status === 201) {
                document.getElementById('form-addPage').reset();
            }
        });
    };

    render() {
        const { addDate, addText } = this.state;
        const dateIsValid = addDate.length > 0;
        const textIsValid = addText.length > 0;
        const formIsValid = dateIsValid && textIsValid;

        return (
            <div id="addPage" className="add">
                <h1>Add page</h1>
                <form id="form-addPage" onSubmit={this.handleSubmit}>
                    <label>Date:</label>
                    <input
                        id="addDate"
                        className="text-field"
                        onChange={this.handleChange}
                        type="date"
                        name="addDate"
                    />
                    <label>Text:</label>
                    <textarea
                        id="addText"
                        className="text-field"
                        placeholder="Today I ..."
                        onChange={this.handleChange}
                        type="text"
                        name="addText"
                    />
                    <label>People:</label>
                    <input
                        id="addPeople"
                        className="text-field"
                        placeholder="Bob, Chris, ..."
                        onChange={this.handleChange}
                        type="text"
                        name="addPeople"
                    />
                    <label>Locations:</label>
                    <input
                        id="addLocations"
                        className="text-field"
                        placeholder="Cafe Bax, Cafe Lennep, ..."
                        onChange={this.handleChange}
                        type="text"
                        name="addLocations"
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

export default AddPage;
