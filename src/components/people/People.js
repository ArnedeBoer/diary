import React from 'react';
import Person from './Person';
import Add from './../Add';
import Filters from './../Filters';

class People extends React.Component {
    constructor() {
        super();

        this.updateState = this.updateState.bind(this);

        this.state = {
            people: []
        };
    }

    updateState(people) {
        this.setState({ people });
    }

    render() {
        const filters = [
            {
                name: 'name',
                title: 'Person',
                type: 'text'
            }
        ];

        const fields = [
            {
                name: 'addname',
                title: 'Name',
                placeholder: 'Bob',
                type: 'text',
                required: true
            },
            {
                name: 'addtext',
                title: 'Description',
                placeholder: 'This person is ...',
                type: 'textarea'
            }
        ];

        return (
            <div id="people">
                <div id="left-column">
                    <Filters
                        page="people"
                        filters={filters}
                        updateState={this.updateState}
                    />
                    <div id="people-list">
                    {
                        this.state.people
                            .map((people, index) => <Person key={index} index={index} details={this.state.people[index]} people={this.state.people} updateState={this.updateState}/>)
                    }
                    </div>
                </div>
                <div id="right-column">
                    <Add
                        page="people"
                        fields={fields}
                    />
                </div>
            </div>
        )
    }
}

export default People;
