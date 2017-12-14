import React from 'react';
import Menu from './Menu.jsx';
import Item from './Item.jsx';
import Add from './Add.jsx';
import Filters from './Filters.jsx';

class Main extends React.Component {
    constructor() {
        super();

        this.updateState = this.updateState.bind(this);

        this.state = {
            items: []
        };
    }

    updateState(items) {
        this.setState({ items });
    }

    render() {
        const { pageName, filters, fields } = this.props;
        
        return (
            <div>
                <Menu
                    pageNames={this.props.pageNames}
                />
                <div id="left-column">
                    <Filters
                        page={pageName}
                        fields={filters}
                        updateState={this.updateState}
                    />
                    <div id="page-list">
                        {
                            this.state.items
                                .map((page, index) =>
                                    <Item
                                        page={pageName}
                                        key={page.id}
                                        index={index}
                                        details={page}
                                        fields={fields}
                                        items={this.state.items}
                                        updateState={this.updateState}
                                    />
                                )
                        }
                    </div>
                </div>
                <div id="right-column">
                    <Add
                        page={pageName}
                        fields={fields}
                    />
                </div>
            </div>
        )
    }
}

export default Main;
