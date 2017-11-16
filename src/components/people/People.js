import React from 'react';
import Person from './Person';
import AddPeople from './AddPeople';
import PeopleFilters from './PeopleFilters';

class People extends React.Component {
    constructor() {
        super();

        this.setPeople = this.setPeople.bind(this);

        this.state = {
            people: []
        };
    }

    setPeople(people) {
        this.setState({ people });
    }

    render() {
        return (
            <div id="people">
                <div id="left-column">
                    <PeopleFilters
                    setPeople={this.setPeople}
                    />
                    <div id="people-list">
                    {
                        this.state.people
                            .map((people, index) => <Person key={index} index={index} details={this.state.people[index]} people={this.state.people} setPeople={this.setPeople}/>)
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
