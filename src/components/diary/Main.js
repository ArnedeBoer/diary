import React from 'react';
import Menu from './Menu';
import Item from './Item';
import Add from './Add';
import Filters from './Filters';
import Input from './../fields/Input';
import Textarea from './../fields/Textarea';
import Select from './../fields/Select';

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

    renderType(field, index, page, handleChange, updateSelectState) {
        switch(field.type) {
            case 'textarea':
            return (
                <Textarea
                    key={index}
                    field={field}
                    page={page}
                    updateSelectState={updateSelectState}
                    handleChange={handleChange}
                />
            );

            case 'select':
            return (
                <Select
                    key={index}
                    field={field}
                    page={page}
                    updateSelectState={updateSelectState}
                    handleChange={handleChange}
                />
            );

            default:
            return (
                <Input
                    key={index}
                    field={field}
                    page={page}
                    updateSelectState={updateSelectState}
                    handleChange={handleChange}
                />
            );
        }
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
                        renderType={this.renderType}
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
                                        renderType={this.renderType}
                                    />
                                )
                        }
                    </div>
                </div>
                <div id="right-column">
                    <Add
                        page={pageName}
                        fields={fields}
                        renderType={this.renderType}
                    />
                </div>
            </div>
        )
    }
}

export default Main;
