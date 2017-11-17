import React from 'react';
import Person from './Person';
import AddPeople from './AddPeople';
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
                    <AddPeople />
                </div>
            </div>
        )
    }
}

export default People;
