import React, { Component } from 'react';
import MenuItem from './MenuItem';

const createMenuInfo = itemType => {
  return {
    label: itemType[0].toUpperCase() + itemType.slice(1),
    path: `/${itemType}`
  }
};

class Menu extends Component {
  render() {
    const { changeItemType } = this.props;
    const menuItems = this.props.itemTypes.map(itemType => createMenuInfo(itemType));

    return (
      <div id="menu">
        <ul>
          {
            menuItems.map((menuItem, index) => <MenuItem key={index} menuItem={menuItem} changeItemType={changeItemType}/>)
          }
        </ul>
      </div>
    )
  }
};

export default Menu;
