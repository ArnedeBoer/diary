import React from 'react';

class Menu extends React.Component {
    render() {
        return (
            <div id="menu">
                <ul>
                    <li><a href="/pages">Diary</a></li>
                    <li><a href="/people">People</a></li>
                    <li><a href="/locations">Locations</a></li>
                    <li><a href="/login">Logout</a></li>
                </ul>
            </div>
        )
    }
}

export default Menu;
