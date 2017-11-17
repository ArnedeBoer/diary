import React from 'react';
import { getValue, processArray, emptyStringToNull } from './../helpers.js';
import Filter from './Filter';

class Filters extends React.Component {
    handleSubmit(e) {
        e.preventDefault();

        const filters = {};

        this.props.filters.forEach(filter => {
            return filters[filter.name] = filter.type === 'select' ? processArray(getValue(filter.name)) : emptyStringToNull(getValue(filter.name));    
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
                                .map((filter, index) => <Filter key={index} index={index} filter={filter}/>)
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
