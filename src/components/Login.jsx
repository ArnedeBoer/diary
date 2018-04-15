import React from 'react';
import { Link } from 'react-router-dom';
import FieldType from './fields/FieldType.jsx';
import { loginFields } from './../defaults.js';

class Login extends React.Component {
    constructor() {
        super();

        this.handleChange = this.handleChange.bind(this);

        const states = {
            error: false
        };

        loginFields.forEach(field => {
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

        loginFields.forEach(field => {
            return data[field.name] = this.state[field.name];  
        });

        fetch('/api/user/login', {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => {
            if(res.status === 200) {
                return res.json();
            }

            if(res.status === 400) {
                return Promise.reject('Fail');
            }
        })
        .then(result => {
            localStorage.setItem('hash', result.hash);
            window.location.replace('/');
        })
        .catch(err => {
            this.setState({error: true});
        });
    };

    render() {
        const requiredFields = loginFields.filter(field => field.required);
        const formIsValid = requiredFields.every(field => {
            return this.state[field.name].length >= 8;
        });

        return (
            <div id="login">
                <h2>Login</h2>
                <form id="login-form" onSubmit={(e) => this.handleSubmit(e)}>
                    {
                        loginFields
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
                    <input
                        id="submit"
                        type="submit"
                        disabled={!formIsValid}
                    />
                </form>
                { this.state.error ? <div className="error">The username or password is not correct.</div> : null }
                <Link to='/register'>Sign up</Link>
            </div>
        )
    }
}

export default Login;
