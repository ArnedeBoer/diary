import React, { Component } from 'react';

class MenuItem extends Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    const { menuItem, changeItemType } = this.props;
    const itemType = menuItem.path.substring(1);

    e.preventDefault();
    changeItemType(itemType);

    const stateObj = { itemType };
    history.pushState(stateObj, itemType, itemType);
  }

  render() {
    const { path, label } = this.props.menuItem;

    return (
      <div>
        <li>
          <a
            href={path}
            onClick={this.handleClick}
          >
            {label}
          </a>
        </li>
      </div>
    )
  }
};

export default MenuItem;
