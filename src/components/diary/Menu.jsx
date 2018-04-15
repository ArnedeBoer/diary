import React from 'react';
import { Link } from 'react-router-dom';

class Menu extends React.Component {
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    render() {
        return (
            <div id="menu">
                <ul>
                    {
                        this.props.pageNames.map((pageName, index) => {
                            const path = `/${pageName}`;

                            return (
                                <li key={index}>
                                    <Link to={path}>{this.capitalizeFirstLetter(pageName)}</Link>
                                </li>
                            )
                        })
                    }
                    <li>
                        <Link to='/logout'>Logout</Link>
                    </li>
                </ul>
            </div>
        )
    }
}

export default Menu;
