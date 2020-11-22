import React from 'react';
import axios from 'axios'
import '../css/Timeline.css';
import Sidebar from './Sidebar.js'
import TimelineItem from './TimelineItem.js'

class Timeline extends React.Component {
    // let {cards, sortBy, filterBy} = props
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            cards: [],
            sort: false
        };
    }


    async componentDidMount() {
        const result = await axios({
            method: 'post',
            url: 'http://localhost:3000/mediacards',
            withCredentials: true,
            data: {
                "approved": true
            }
        });
        this.setState({
            isLoaded: true,
            cards: await result.data
        });
    }

    render() {
        const { error, isLoaded, cards, sort } = this.state;
        const timelineItems = cards.map(card => <TimelineItem loggedInStatus={this.props.loggedInStatus} key={card.mediaid} data={card}></TimelineItem>);
        if (error) {
            return <div className="timeline">Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div className="timeline">Loading...</div>;
        } else {
            if(!sort) {
                return (
                <div className="timeline">
                    <Sidebar cards={cards} loggedInStatus={this.props.loggedInStatus} parentTL={this}></Sidebar>
                    <div className="timeline-content">
                    {timelineItems}
                    </div>
                </div>
                );
            } else {
                let sortedArray = [...cards];
                sortedArray = sortedArray.sort(function(a, b) {return new Date(a.unidate) - new Date(b.unidate)}).map(card => <TimelineItem loggedInStatus={this.props.loggedInStatus} key={card.mediaid} data={card}></TimelineItem>);
                return (
                    <div className="timeline">
                        <Sidebar cards={cards} loggedInStatus={this.props.loggedInStatus} parentTL={this}></Sidebar>
                        <div className="timeline-content">
                        {sortedArray}
                        </div>
                    </div>
                    );
            }
        }
    }

}

export default Timeline;



