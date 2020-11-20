import React from 'react';
import axios from 'axios'
import '../css/Timeline.css';
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
        console.log(result);
        this.setState({
            isLoaded: true,
            cards: result.data
        });
    }


    // handle sorting

    // handle filtering



    render() {
        const { error, isLoaded, cards } = this.state;
        const timelineItems = cards.map(card => <TimelineItem key={card.id} data={card}></TimelineItem>)
        if (error) {
            return <div className="timeline">Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div className="timeline">Loading...</div>;
        } else {
            <div className="timeline">
                {timelineItems}
            </div>
        }
    }

}

export default Timeline;


