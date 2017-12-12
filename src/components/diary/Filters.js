import React from 'react';
import { renderType } from './../../helpers';

class Filters extends React.Component {
    constructor(props) {
        super();

        this.handleChange = this.handleChange.bind(this);
        this.updateSelectState = this.updateSelectState.bind(this);

        const states = {};

        props.fields.forEach(field => {
            states[field.name] = field.type === 'select' ? [] : null;
        });

        this.state = states;
    }

    handleChange(e) {
        const newValue = e.target.value === '' ? null : e.target.value;
        this.setState({ [e.target.name]: newValue });
    }

    updateSelectState(field, values) {
        this.setState({ [field]: values})
    }

    handleSubmit(e) {
        e.preventDefault();

        const data = {
            hash: localStorage.getItem('hash')
        };

        this.props.fields.forEach(field => {
            return data[field.name] = this.state[field.name];  
        });

        fetch(`/api/${this.props.page}/filter`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(results => {
            this.props.updateState(results)
        });
    };

    render() {
        return (
            <div id="filters">
                <form id="filter-form" onSubmit={(e) => this.handleSubmit(e)}>
                    {
                        this.props.fields
                            .map((field, index) => {
                                return renderType(field, index, this.props.page, this.handleChange, this.updateSelectState, this.state);
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
export default Filters;
