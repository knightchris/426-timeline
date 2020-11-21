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
            cards: []
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
        const { error, isLoaded, cards } = this.state;
        
        if (error) {
            return <div className="timeline">Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div className="timeline">Loading...</div>;
        } else {
            const timelineItems = cards.map(card => <TimelineItem loggedInStatus={this.props.loggedInStatus} key={card.mediaid} data={card}></TimelineItem>);
            console.log(cards);
            return (
            <div className="timeline">
                <Sidebar loggedInStatus={this.props.loggedInStatus}></Sidebar>
                <div className="timeline-content">
                {timelineItems}
                </div>
            </div>
            );
        }
    }

}

export default Timeline;



