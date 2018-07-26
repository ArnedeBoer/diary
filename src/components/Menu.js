import React, { Component } from 'react';
import PropTypes from 'prop-types';

const createMenuInfo = itemType => ({
  label: itemType[0].toUpperCase() + itemType.slice(1),
  path: `/${itemType}`
});

class Menu extends Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(path, e) {
    e.preventDefault();

    const { changeItemType } = this.props;
    const itemType = path.substring(1);
    const stateObj = { itemType };

    changeItemType(itemType);

    history.pushState(stateObj, itemType, itemType);
  }

  render() {
    const menuItems = this.props.itemTypes.map(itemType => createMenuInfo(itemType));

    return (
      <div id="menu">
        <ul>
          {
            menuItems.map((menuItem, index) => {
              const { path, label } = menuItem;
              return (
                <li key={index}>
                  <a href={path} onClick={this.handleClick.bind(this, path)}>{label}</a>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
};

Menu.propTypes = {
  changeItemType: PropTypes.func,
  itemTypes: PropTypes.array
};

export default Menu;
