import React from 'react';
import Pages from './Pages';
import Filters from './Filters';

class Diary extends React.Component {
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
            <div className="diary">
                <Pages
                pages={this.state.pages}
                />
                <Filters
                setPages={this.setPages}
                />
            </div>
        )
    }
}

export default Diary;
