import React from 'react';
import dateformat from 'dateformat';
import { getValue, emptyStringToNull, processArray } from './../../helpers.js';

class Page extends React.Component {
    constructor(props) {
        super();

        this.edit = this.edit.bind(this);
        this.save = this.save.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            editing: false,
            date: props.details.date,
            text: props.details.text,
            people: props.details.people,
            locations: props.details.locations
        };
    }

    edit() {
        this.setState({
            editing: true,
            date: this.state.date,
            text: this.state.text,
            people: this.state.people,
            locations: this.state.locations
        });
    };

    save() {
        const { details } = this.props;
        const page = {
            id: details.id,
            text: emptyStringToNull(getValue('editText')),
            people: processArray(getValue('editPeople')),
            locations: processArray(getValue('editLocations')),
            userid: 1
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
                this.props.updateState(pages);
            }
        });
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    renderNormal() {
        let peopleList;
        let locationsList;

        if ( this.state.people !== null ) {
            const people = this.state.people.map((value, index) => {
                return (
                    <li key={index}>{value}</li>
                )
            });
            peopleList = <div className="sub-list first-list people"><ul><h4>People:</h4>{people}</ul></div>
        }

        if ( this.state.locations !== null ) {
            const locations = this.state.locations.map((value, index) => {
                return (
                    <li key={index}>{value}</li>
                )
            });
            locationsList = <div className="sub-list second-list locations"><ul><h4>Locations:</h4>{locations}</ul></div>
        }

        return (
            <div className="list-item page">
                <div className="title date"><h2>{dateformat(this.state.date, 'mmmm dS yyyy')}</h2></div>
                <div className="left">
                    <div className="text">{this.state.text}</div>
                </div>

                <div className="right">
                    {peopleList}
                    {locationsList}
                </div>
                <div className="info-end" style={{clear: 'both'}}></div>
                <button className="edit" onClick={this.edit}>Edit</button>
            </div>
        )
    }

    renderForm() {
        return (
            <div className="list-item page">
                <div className="title date"><h2>{dateformat(this.state.date, 'mmmm dS yyyy')}</h2></div>
                <form>
                    <label>Text:</label>
                    <textarea
                        id="editText"
                        className="text-field"
                        placeholder="Today I ..."
                        defaultValue={this.state.text}
                        onChange={this.handleChange}
                        type="text"
                        name="editText"
                    />
                    <label>People:</label>
                    <input
                        id="editPeople"
                        className="text-field"
                        placeholder="Bob, Chris, ..."
                        defaultValue={this.state.people}
                        onChange={this.handleChange}
                        type="text"
                        name="editPeople"
                    />
                    <label>Locations:</label>
                    <input
                        id="editLocations"
                        className="text-field"
                        placeholder="Cafe Bax, Cafe Lennep, ..."
                        defaultValue={this.state.locations}
                        onChange={this.handleChange}
                        type="text"
                        name="editLocations"
                    />
                </form>
                <button className="save" onClick={this.save}>Save</button>
            </div>
        )
    }

    render() {        
        return this.state.editing ? this.renderForm() : this.renderNormal();
    }
}

export default Page;
