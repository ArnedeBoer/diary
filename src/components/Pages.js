import React from 'react';
import Page from './Page';
import axios from 'axios';

class Pages extends React.Component {

    constructor() {
        super();

        // getinitialState
        this.state = {
            pages: {}
        };
    }

    componentDidMount() {
        axios.get('http://localhost:8080/diary')
            .then(res => {
                const pages = [
                    {
                        date: '2017-09-09',
                        text: 'Zeroth text'
                    },
                    {
                        date: '2017-10-10',
                        text: 'First text',
                        people: ['Bob', 'Frank']
                        },
                    {
                        date: '2017-11-11',
                        text: 'Second text',
                        locations: ['Bar Betta', 'Hanoi Social Club']
                    },
                    {
                        date: '2017-12-12',
                        text: 'Third text',
                        people: ['Harry', 'Chris', 'Bob'],
                        locations: ['Cho Shim']
                    }
                ];
                this.setState({ pages });
            });
        }

    render() {
        return (
            <div className="pages">
                {
                    Object
                        .keys(this.state.pages)
                        .map(key => <Page key={key} details={this.state.pages[key]} />)
                }
            </div>
        )
    }
}

export default Pages;
