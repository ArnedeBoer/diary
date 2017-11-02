import React from 'react';

class Page extends React.Component {
    render() {
        const { details } = this.props;
        let peopleList;
        let locationsList;
        let buffer;

        if ( details.people !== undefined ) {
            const people = details.people.map((value, index) => {
                return (
                    <li key={index}>{value}</li>
                )
            });
            peopleList = <div className="people"><ul><h4>People:</h4>{people}</ul></div>
        }

        if ( details.locations !== undefined ) {
            const locations = details.locations.map((value, index) => {
                return (
                    <li key={index}>{value}</li>
                )
            });
            locationsList = <div className="locations"><ul><h4>Locations:</h4>{locations}</ul></div>
        }

        if ( details.people !== undefined && details.locations !== undefined ) {
            buffer = <div className="buffer"></div>
        }
        
        return (
            <div className="page">
                <div className="date"><h2>{details.date}</h2></div>
                <div className="left">
                    <div className="text">{details.text}</div>
                </div>

                <div className="right">
                    {peopleList}
                    {buffer}
                    {locationsList}
                </div>
                <div style={{clear: 'both'}}></div>
            </div>
        )
    }
}

export default Page;
