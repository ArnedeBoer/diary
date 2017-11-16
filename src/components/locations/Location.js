import React from 'react';
import { getValue, emptyStringToNull } from './../../helpers.js';

class Location extends React.Component {
    constructor() {
        super();

        this.edit = this.edit.bind(this);
        this.save = this.save.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            editing: false,
            editName: ''
        };
    }

    edit() {
        const { details } = this.props;

        this.setState({
            editing: true,
            editName: details.editName
        });
    };

    save() {
        const { details } = this.props;
        const location = {
            id: details.id,
            name: emptyStringToNull(getValue('editName')),
            text: emptyStringToNull(getValue('editText')),
            userid: 2
        }

        fetch('/api/locations/edit', {
            method: "POST",
            body: JSON.stringify(location),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => {
            if (res.status === 201) {
                this.setState({editing: false});

                const locations = this.props.locations;
                
                locations[this.props.index] = location;
                this.props.setLocations(locations);
            }
        });
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    renderNormal() {
        const { details } = this.props;

        return (
            <div className="list-item location">
                <div className="title name"><h2>{details.name}</h2></div>
                <div className="full">
                    <div className="text">{details.text}</div>
                </div>
                <button className="edit" onClick={this.edit}>Edit</button>
            </div>
        )
    }

    renderForm() {
        const { details } = this.props;

        return (
            <div className="location">
                <form>
                    <label>Name:</label>
                    <input
                        id="editName"
                        className="text-field"
                        placeholder="Bob, Chris, ..."
                        defaultValue={details.name}
                        onChange={this.handleChange}
                        type="text"
                        name="editName"
                    />
                    <label>Description:</label>
                    <textarea
                        id="editText"
                        className="text-field"
                        placeholder="Today I ..."
                        defaultValue={details.text}
                        onChange={this.handleChange}
                        type="text"
                        name="editText"
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

export default Location;
