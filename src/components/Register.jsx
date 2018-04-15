import React from 'react';
import { Link } from 'react-router-dom';
import { renderType } from './../helpers.jsx';

const registerFields = [
    {
        name: 'username',
        title: 'Username',
        type: 'text',
        required: true
    },
    {
        name: 'displayName',
        title: 'Display Name',
        type: 'text',
        required: true
    },
    {
        name: 'password',
        title: 'Password',
        type: 'password',
        required: true
    },
    {
        name: 'confirmPassword',
        title: 'Confirm Password',
        type: 'password',
        required: true
    }
];

class Register extends React.Component {
    constructor() {
        super();

        this.handleChange = this.handleChange.bind(this);

        const states = {
            error: false
        };

        registerFields.forEach(field => {
            states[field.name] = field.type === 'select' ? [] : '';
        });

        this.state = states;
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();

        const data = {};

        registerFields.forEach(field => {
            data[field.name] = this.state[field.name];  
        });

        fetch('/api/user/create', {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => {
            if (res.status === 201) {
                window.location.replace('/login');
            }

            if (res.status === 400) {
                this.setState({error: true});
            }
        });
    };

    render() {
        const requiredFields = registerFields.filter(field => field.required);
        const formIsValid = requiredFields.every(field => {
            return this.state[field.name].length >= 8 && this.state.password === this.state.confirmPassword;
        });
        const errorMsg = 'Username is already used!';

        return (
            <div id="register">
                <h2>Register</h2>
                <form id="register-form" onSubmit={(e) => this.handleSubmit(e)}>
                    {
                        registerFields
                            .map(field => {
                                return renderType(field, this.props.page, this.handleChange, this.updateSelectState, this.state);
                            })
                    }
                    <input
                        id="submit"
                        type="submit"
                        disabled={!formIsValid}
                    />
                </form>
                {this.state.error ? errorMsg : null}
                <Link to='/login'>Or login</Link>
            </div>
        )
    }
}

export default Register;
