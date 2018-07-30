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

  handleClick(location, e) {
    e.preventDefault();

    const { changeItemType } = this.props;
    const stateObj = { location };

    changeItemType(location);

    history.pushState(stateObj, location, location);
  }

  render() {
    const { itemType, itemTypes } = this.props;
    const menuItems = itemTypes.map(itemType => createMenuInfo(itemType));

    return (
      <div id="menu">
        <ul>
          {
            menuItems.map((menuItem, index) => {
              const { path, label } = menuItem;
              const location = path.substring(1);
              const linkClass = location === itemType ? 'active' : 'inactive';

              return (
                <li key={index}>
                  <a
                    className={linkClass}
                    href={path}
                    onClick={this.handleClick.bind(this, location)}
                  >
                    {label}
                  </a>
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
  itemType: PropTypes.string,
  itemTypes: PropTypes.array
};

export default Menu;
