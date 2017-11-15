import React from 'react';

class Menu extends React.Component {
    render() {
        return (
            <div id="menu">
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/addPage">Add Page</a></li>
                    <li><a href="/login">Logout</a></li>
                </ul>
            </div>
        )
    }
}

export default Menu;
