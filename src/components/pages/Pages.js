import React from 'react';
import Page from './Page';
import PageFilters from './PageFilters';
import AddPage from './AddPage';

class Pages extends React.Component {
    constructor() {
        super();

        this.setPages = this.setPages.bind(this);

        this.state = {
            pages: []
        };
    }

    setPages(pages) {
        this.setState({ pages });
    }

    render() {
        return (
            <div id="pages">
                <div id="left-column">
                    <PageFilters
                    setPages={this.setPages}
                    />
                    <div id="page-list">
                    {
                        this.state.pages
                            .map((page, index) => <Page key={index} index={index} details={this.state.pages[index]} pages={this.state.pages} setPages={this.setPages}/>)
                    }
                    </div>
                </div>
                <div id="right-column">
                    <AddPage />
                </div>
            </div>
        )
    }
}

export default Pages;
