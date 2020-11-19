import { render } from 'react-dom';
import '../css/Timeline.css';
import TimelineItem from './TimelineItem.js'

function Timeline(props) {
    // let {cards, sortBy, filterBy} = props
    let cards = [{},{},{}];
    // handle sorting

    // handle filtering

    const timelineItems = cards.map(card => <TimelineItem key={card.id} data={card}></TimelineItem>)

    return (
        <div className="timeline">
            {timelineItems}
        </div>
    )
}

export default Timeline;


