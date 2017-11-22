import React from 'react';
import dateformat from 'dateformat';

class Item extends React.Component {
    constructor(props) {
        super();

        this.edit = this.edit.bind(this);
        this.save = this.save.bind(this);
        this.handleChange = this.handleChange.bind(this);

        let states = {
            editing: false
        };

        if (props.page === 'pages') {
            states.date = props.details.date;
            states.text = props.details.text;
            states.people = props.details.people;
            states.locations = props.details.locations;
        } else {
            states.name = props.details.name;
            states.text = props.details.text;
        }

        this.state = states;
    }

    edit() {
        if (this.props.page === 'pages') {
            this.setState({
                editing: true,
                date: this.state.date,
                text: this.state.text,
                people: this.state.people,
                locations: this.state.locations
            });
        } else {
            this.setState({
                editing: true,
                name: this.state.name,
                text: this.state.text
            });
        }
    };

    save() {
        const { details } = this.props;
        let item = {
            id: details.id,
            userid: 1
        };

        if (this.props.page === 'pages') {
            item.date = this.state.date;
            item.text = this.state.text;
            item.people = this.state.people;
            item.locations = this.state.locations;
        } else {
            item.name = this.state.name;
            item.text = this.state.text;
        }

        console.log(item);

        fetch(`/api/${this.props.page}/edit`, {
            method: "POST",
            body: JSON.stringify(item),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => {
            if (res.status === 201) {
                this.setState({editing: false});

                const items = this.props.items;
                
                items[this.props.index] = item;
                this.props.updateState(items);
            }
        });
    }

    handleChange(e) {
        const newValue = e.target.value === '' ? null : e.target.value;
        this.setState({ [e.target.name]: newValue });
    }

    renderPageNormal() {
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
            <div className="list-item">
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

    renderPageForm() {
        return (
            <div className="list-item page">
                <form>
                    <label>Date:</label>
                    <input
                        id="date"
                        className="text-field"
                        defaultValue={dateformat(this.state.date, 'yyyy-mm-dd')}
                        onChange={this.handleChange}
                        type="date"
                        name="date"
                    />
                    <label>Text:</label>
                    <textarea
                        id="text"
                        className="text-field"
                        placeholder="Today I ..."
                        defaultValue={this.state.text}
                        onChange={this.handleChange}
                        type="text"
                        name="text"
                    />
                    <label>People:</label>
                    <input
                        id="people"
                        className="text-field"
                        placeholder="Bob, Chris, ..."
                        defaultValue={this.state.people}
                        onChange={this.handleChange}
                        type="text"
                        name="people"
                    />
                    <label>Locations:</label>
                    <input
                        id="locations"
                        className="text-field"
                        placeholder="Cafe Bax, Cafe Lennep, ..."
                        defaultValue={this.state.locations}
                        onChange={this.handleChange}
                        type="text"
                        name="locations"
                    />
                </form>
                <button className="save" onClick={this.save}>Save</button>
            </div>
        )
    }

    renderOtherNormal() {
        const { details } = this.props;

        return (
            <div className="list-item person">
                <div className="title name"><h2>{details.name}</h2></div>
                <div className="full">
                    <div className="text">{details.text}</div>
                </div>
                <button className="edit" onClick={this.edit}>Edit</button>
            </div>
        )
    }

    renderOtherForm() {
        const { details } = this.props;

        return (
            <div className="list-item person">
                <form>
                    <label>Name:</label>
                    <input
                        id="name"
                        className="text-field"
                        placeholder="Bob, Chris, ..."
                        defaultValue={details.name}
                        onChange={this.handleChange}
                        type="text"
                        name="name"
                    />
                    <label>Description:</label>
                    <textarea
                        id="text"
                        className="text-field"
                        placeholder="Today I ..."
                        defaultValue={details.text}
                        onChange={this.handleChange}
                        type="text"
                        name="text"
                    />
                </form>
                <button className="save" onClick={this.save}>Save</button>
            </div>
        )
    }

    render() {
        if (this.props.page === 'pages') {
            return this.state.editing ? this.renderPageForm() : this.renderPageNormal();
        }

        return this.state.editing ? this.renderOtherForm() : this.renderOtherNormal();
    }
}

export default Item;
