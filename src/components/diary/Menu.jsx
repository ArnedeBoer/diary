import React from 'react';
import { Link } from 'react-router-dom';

const capitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1);

class Menu extends React.Component {
    render() {
        return (
            <div id="menu">
                <ul>
                    {
                        this.props.pageNames.map((pageName, index) => {
                            const path = `/${pageName}`;

                            return (
                                <li key={index}>
                                    <Link to={path}>{capitalizeFirstLetter(pageName)}</Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default Menu;
