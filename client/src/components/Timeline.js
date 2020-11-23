import React from 'react';
import axios from 'axios'
import '../css/Timeline.css';
import Sidebar from './Sidebar.js'
import TimelineItem from './TimelineItem.js'
require('dotenv').config();

class Timeline extends React.Component {
    // let {cards, sortBy, filterBy} = props
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            cards: [],
            sort: ['unidate', 'dsc']
        };
        this.updateSort = this.updateSort.bind(this);
        this.uniYearConvert = this.uniYearConvert.bind(this)
    }

    
    async componentDidMount() {
        const result = await axios({
            method: 'post',
            url: `${process.env.REACT_APP_REQUEST_SERVER}/mediacards`,
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

    updateSort(choice) {
        this.setState({
            sort: choice
        });
    }

    uniYearConvert(card) {
        let [num, suffix] = card.unidate.split(' ');
        return (suffix.toLowerCase() == 'bby') ? (-num) : (num);
    }

    sort(cards, sort) {
        let sorted = cards
        if (sort[0] === 'pubdate') sorted = cards.sort((a,b) => new Date(a.pubdate) - new Date(b.pubdate));
        if(sort[0] === 'unidate') {
            sorted = cards.sort((a,b) => this.uniYearConvert(a)-this.uniYearConvert(b));
        }

        if (sort[1] === 'dsc') sorted = sorted.reverse();

        return sorted
    }

    render() {
        const { error, isLoaded, cards, sort } = this.state;

        if (error) {
            return <div className="timeline">Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div className="timeline">Loading...</div>;
        } else {

            let sorted = this.sort(cards, sort);
            const timelineItems = sorted.map(card => <TimelineItem loggedInStatus={this.props.loggedInStatus} key={card.mediaid} data={card}></TimelineItem>);

                return (
                <div className="timeline">
                    <Sidebar cards={cards} loggedInStatus={this.props.loggedInStatus} updateSort={this.updateSort}></Sidebar>
                    <div className="timeline-content">
                    {timelineItems}
                    </div>
                </div>
                );
        }
    }

}

export default Timeline;



