import React from 'react';

class Filters extends React.Component {
    constructor(props) {
        super();

        this.handleChange = this.handleChange.bind(this);
        this.updateSelectState = this.updateSelectState.bind(this);

        const states = {};

        props.fields.forEach(field => {
            return states[field.name] = null;    
        });

        this.state = states;
    }

    handleChange(e) {
        const newValue = e.target.value === '' ? null : e.target.value;
        this.setState({ [e.target.name]: newValue });
    }

    updateSelectState(field, value) {
        const values = value.map(val => val.name);

        this.setState({ [field]: values})
    }

    handleSubmit(e) {
        e.preventDefault();

        const fields = {};

        this.props.fields.forEach(field => {
            return fields[field.name.replace('add', '')] = this.state[field.name];  
        });

        fetch(`/api/${this.props.page}/filter`, {
            method: "POST",
            body: JSON.stringify(fields),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(results => this.props.updateState(results));
    };

    render() {
        return (
            <div id="filters">
                <form id="filter-form" onSubmit={(e) => this.handleSubmit(e)}>
                    {
                        this.props.fields
                            .map((field, index) => {
                                return this.props.renderType(field, index, this.handleChange, this.updateSelectState);
                            })
                    }
                    <input
                        id="submit"
                        type="submit"
                    />
                </form>
            </div>
        )
    }
}
// better to loop sub elements because of nested functions??
// now fixed for handleChange, but now must do updateSelectState as well :/
export default Filters;
