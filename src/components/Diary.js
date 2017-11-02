import React from 'react';
import Pages from './Pages';
import Filters from './Filters';

class Diary extends React.Component {
  render() {
    return (
      <div className="diary">
        <Pages />
        <Filters />
      </div>
    )
  }
}

export default Diary;
