import React from 'react';
import Filter from './Filter';

class Filters extends React.Component {
    constructor(props) {
        super();

        this.handleChange = this.handleChange.bind(this);
        this.updateSelectState = this.updateSelectState.bind(this);

        const states = {};

        props.filters.forEach(filter => {
            return states[filter.name] = null;    
        });

        this.state = states;
    }

    handleChange(e) {
        const newValue = e.target.value === '' ? null : e.target.value;
        this.setState({ [e.target.name]: newValue });
    }

    updateSelectState(filter, value) {
        const values = value.map(val => val.name);

        this.setState({ [filter]: values})
    }

    handleSubmit(e) {
        e.preventDefault();

        const filters = {};

        this.props.filters.forEach(filter => {
            return filters[filter.name.replace('add', '')] = this.state[filter.name];  
        });

        fetch(`/api/${this.props.page}/filter`, {
            method: "POST",
            body: JSON.stringify(filters),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(results => this.props.updateState(results));
    };

    render() {
        return (
            <div id="filters">
                <div className="container">
                    <form id="filter-form" onSubmit={(e) => this.handleSubmit(e)}>
                        {
                            this.props.filters
                                .map((filter, index) => <Filter key={index} index={index} filter={filter} page={this.props.page} handleChange={this.handleChange} updateSelectState={this.updateSelectState}/>)
                        }
                        <input
                            id="submit"
                            type="submit"
                        />
                    </form>
                </div>
            </div>
        )
    }
}

export default Filters;
