import React from 'react';
import axios from 'axios'
import '../css/Timeline.css';
import AdminTimelineItem from './AdminTimelineItem.js'

class AdminTimeline extends React.Component {
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
                "approved": false
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
            const adminTimelineItems = cards.map(card => <AdminTimelineItem key={card.mediaid} data={card}></AdminTimelineItem>);
            return (
            <div className="timeline">
                <div className="timeline-content">
                {adminTimelineItems}
                </div>
            </div>
            );
        }
    }

}

export default AdminTimeline;

