import React from 'react';
import Page from './Page';

class Pages extends React.Component {

    constructor() {
        super();

        // getinitialState
        this.state = {
            pages: {
                zeroth: {
                    date: '2017-09-09',
                    text: 'Zeroth text'
                },
                first: {
                    date: '2017-10-10',
                    text: 'First text',
                    people: ['Bob', 'Frank']
                    },
                second: {
                    date: '2017-11-11',
                    text: 'Second text',
                    locations: ['Bar Betta', 'Hanoi Social Club']
                },
                third: {
                    date: '2017-12-12',
                    text: 'Third text',
                    people: ['Harry', 'Chris', 'Bob'],
                    locations: ['Cho Shim']
                }
            }
        };
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
