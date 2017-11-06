import React from 'react';
import Page from './Page';

class Pages extends React.Component {
    constructor() {
        super();

        // getinitialState
        this.state = {
            pages: {}
        };
    }

    componentDidMount() {
        fetch('http://localhost:8080/api/page/all')
            .then(res => {
                return res.json();
            })
            .then(pages => {
                this.setState({ pages });
            });
        }

    render() {
        return (
            <div className="pages">
                {
                    Object
                        .keys(this.state.pages)
                        .map(key => <Page key={key} details={this.state.pages[key]} />)
                }
            </div>
        )
    }
}

export default Pages;
