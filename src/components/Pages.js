import React from 'react';
import Page from './Page';

class Pages extends React.Component {
    render() {
        return (
            <div className="pages">
                {
                    this.props.pages
                        .map((page, index) => <Page key={index} index={index} details={this.props.pages[index]} pages={this.props.pages} setPages={this.props.setPages}/>)
                }
            </div>
        )
    }
}

export default Pages;
