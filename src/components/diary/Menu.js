import React from 'react';

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
                            return <li key={index}><a href={`/${pageName}`}>{this.capitalizeFirstLetter(pageName)}</a></li>
                        })
                    }
                    <li><a href="/login">Logout</a></li>
                </ul>
            </div>
        )
    }
}

export default Menu;
