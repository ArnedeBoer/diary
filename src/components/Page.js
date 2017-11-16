import React from 'react';
import dateformat from 'dateformat';
import { getValue, emptyStringToNull, processArray } from './../helpers.js';

class Page extends React.Component {
    constructor() {
        super();

        this.edit = this.edit.bind(this);
        this.save = this.save.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            editing: false,
            date: '',
            text: '',
            people: '',
            locations: ''
        };
    }

    edit() {
        const { details } = this.props;

        this.setState({
            editing: true,
            date: details.date,
            text: details.text,
            people: details.people,
            locations: details.locations
        });
    };

    save() {
        const { details } = this.props;
        const page = {
            id: details.id,
            text: emptyStringToNull(getValue('text')),
            people: processArray(getValue('people')),
            locations: processArray(getValue('locations')),
            userid: 2
        }

        fetch('/api/page/edit', {
            method: "POST",
            body: JSON.stringify(page),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => {
            if (res.status === 201) {
                this.setState({editing: false});

                const pages = this.props.pages;
                
                pages[this.props.index] = page;
                this.props.setPages(pages);
            }
        });
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    renderNormal() {
        const { details } = this.props;
        let peopleList;
        let locationsList;

        if ( details.people !== null ) {
            const people = details.people.map((value, index) => {
                return (
                    <li key={index}>{value}</li>
                )
            });
            peopleList = <div className="people"><ul><h4>People:</h4>{people}</ul></div>
        }

        if ( details.locations !== null ) {
            const locations = details.locations.map((value, index) => {
                return (
                    <li key={index}>{value}</li>
                )
            });
            locationsList = <div className="locations"><ul><h4>Locations:</h4>{locations}</ul></div>
        }

        return (
            <div className="page">
                <div className="date"><h2>{dateformat(details.date, 'mmmm dS yyyy')}</h2></div>
                <div className="left">
                    <div className="text">{details.text}</div>
                </div>

                <div className="right">
                    {peopleList}
                    {locationsList}
                </div>
                <div className="info-end" style={{clear: 'both'}}></div>
                <button onClick={this.edit}>Edit</button>
            </div>
        )
    }

    renderForm() {
        const { details } = this.props;

        return (
            <div className="page">
                <div className="date"><h2>{dateformat(details.date, 'mmmm dS yyyy')}</h2></div>
                <form>
                    <label>Text:</label>
                    <textarea
                        id="text"
                        className="text-field"
                        placeholder="Today I ..."
                        defaultValue={details.text}
                        onChange={this.handleChange}
                        type="text"
                        name="text"
                    />
                    <label>People:</label>
                    <input
                        id="people"
                        className="text-field"
                        placeholder="Bob, Chris, ..."
                        defaultValue={details.people}
                        onChange={this.handleChange}
                        type="text"
                        name="people"
                    />
                    <label>Locations:</label>
                    <input
                        id="locations"
                        className="text-field"
                        placeholder="Cafe Bax, Cafe Lennep, ..."
                        defaultValue={details.locations}
                        onChange={this.handleChange}
                        type="text"
                        name="locations"
                    />
                </form>
                <button onClick={this.save}>Save</button>
            </div>
        )
    }

    render() {        
        return this.state.editing ? this.renderForm() : this.renderNormal();
    }
}

export default Page;
