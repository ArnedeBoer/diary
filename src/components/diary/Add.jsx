import React from 'react';
import { renderType } from './../../helpers.jsx';

class Add extends React.Component {
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
            data[field.name] = this.state[field.name];  
        });

        fetch(`/api/${this.props.page}/create`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => {
            if (res.status === 201) {
                document.getElementById('add-form').reset();
                this.props.fields.forEach(field => {
                    this.setState({[field.name]: field.type === 'select' ? [] : null});    
                });
            }
        });
    };

    render() {
        const requiredFields = this.props.fields.filter(field => field.required);
        const formIsValid = requiredFields.every(field => {
            return this.state[field.name] !== null;
        });

        return (
            <div id="add">
                <h1>Add {this.props.page}</h1>
                <form id="add-form" onSubmit={(e) => this.handleSubmit(e)}>
                    {
                        this.props.fields
                            .map((field, index) => {
                                return renderType(field, index, this.props.page, this.handleChange, this.updateSelectState, this.state);
                            })
                    }
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

export default Add;