import React from 'react';

class Menu extends React.Component {
    render() {
        return (
            <div className="filter">
                <label>{this.props.filter.title}:</label>
                <input
                    id={this.props.filter.name}
                    className="text-field"
                    placeholder={this.props.filter.placeholder}
                    type={this.props.filter.type}
                    name={this.props.filter.name}
                />
            </div>
        )
    }
}

export default Menu;
