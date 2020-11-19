import { render } from 'react-dom';
import '../css/Timeline.css';

function Timeline(props) {
    let {cards, sortBy, filterBy} = props

    // handle sorting

    // handle filtering

    const timelineItems = cards.map(card => <TimelineItem data={card}></TimelineItem>)

    return (
        <div className="timeline"></div>
    )
}

export default Timeline;


