import React from 'react';
import Page from './Page';

class Pages extends React.Component {
    render() {
        return (
            <div className="pages">
                {
                    Object
                        .keys(this.props.pages)
                        .map(key => <Page key={key} details={this.props.pages[key]} />)
                }
            </div>
        )
    }
}

export default Pages;
