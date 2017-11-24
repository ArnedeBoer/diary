import React from 'react';

class Add extends React.Component {
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
        const values = value.length === 0 ? null : value.map(val => val.name);

        this.setState({ [field]: values})
    }

    handleSubmit(event) {
        event.preventDefault();

        const data = {};

        this.props.fields.forEach(field => {
            return data[field.name] = this.state[field.name];  
        });

        const userid = '1';

        fetch(`/api/${this.props.page}/create/${userid}`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => {
            if (res.status === 201) {
                document.getElementById('add-form').reset();
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
                                return this.props.renderType(field, index, this.props.page, this.handleChange, this.updateSelectState);
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
