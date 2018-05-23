import React from 'react';
import dateformat from 'dateformat';
import FieldType from './../fields/FieldType.jsx';

class Item extends React.Component {
    constructor(props) {
        super();

        this.edit = this.edit.bind(this);
        this.save = this.save.bind(this);
        this.delete = this.delete.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.updateSelectState = this.updateSelectState.bind(this);

        let states = {
            editing: false
        };

        props.fields.forEach(field => {
            states[field.name] = props.details[field.name]; 
        });

        this.state = states;
    }

    handleChange(e) {
        const newValue = e.target.value === '' ? null : e.target.value;

        this.setState({ [e.target.name]: newValue });
    }

    updateSelectState(field, value) {
        const values = value.length === 0 ? [] : value;

        this.setState({ [field]: values})
    }

    edit() {
        this.setState({
            editing: true
        });
    };

    save() {
        const { details } = this.props;
        let item = {
            id: details.id
        };

        this.props.fields.forEach(field => {
            item[field.name] = this.state[field.name]; 
        });

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

    delete() {
        const { details } = this.props;
        let item = {
            id: details.id,
            hash: localStorage.getItem('hash')
        };

        this.props.fields.forEach(field => {
            item[field.name] = this.state[field.name];
        });

        fetch(`/api/${this.props.page}/delete`, {
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
                const itemsFiltered = items.filter(itemToFilter => {
                    return itemToFilter.id !== item.id;
                });

                this.props.updateState(itemsFiltered);
            }
        });
    }

    renderNormal() {
        let peopleList;
        let locationsList;
        let title = this.props.page === 'pages' ? dateformat(this.state.date, 'mmmm dS yyyy') : this.state.name;

        if ( this.props.page === 'pages' ) {
            if ( this.state.people.length !== 0 ) {
                const people = this.state.people.map(value => {
                    return (
                        <li key={value.id}>{value.name}</li>
                    )
                });
                peopleList = <div className="sub-list first-list people"><ul><h4>People:</h4>{people}</ul></div>
            }

            if ( this.state.locations.length !== 0 ) {
                const locations = this.state.locations.map(value => {
                    return (
                        <li key={value.id}>{value.name}</li>
                    )
                });
                locationsList = <div className="sub-list second-list locations"><ul><h4>Locations:</h4>{locations}</ul></div>
            }
        }

        return (
            <div className="list-item">
                <div className="title"><h2>{title}</h2></div>
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

    renderForm(fields) {
        const { details } = this.props;
        const editFields = fields.map(field => {
            let editField = Object.assign({}, field);

            editField.defaultValue = field.type === 'date' ? dateformat(details.date, 'yyyy-mm-dd') : details[field.name];

            return editField;
        });

        return (
            <div className="list-item">
                <form>
                    {
                        editFields
                            .map((field, index) => {
                                return (
                                    <FieldType
                                        field={field}
                                        key={index}
                                        page={this.props.page}
                                        handleChange={this.handleChange}
                                        updateSelectState={this.updateSelectState}
                                        state={this.state}
                                    />
                                )
                            })
                    }
                </form>
                <button className="save" onClick={this.save}>Save</button>
                <button className="delete" onClick={this.delete}>Delete</button>
            </div>
        )
    }

    render() {
        if (this.state.editing) {
            return this.renderForm(this.props.fields);
        }
        
        return this.renderNormal();
    }
}

export default Item;
