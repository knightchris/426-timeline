import { render } from 'react-dom';
import React from 'react';
import '../css/TimelineModal.css'


const classes = `flex-container card`;
class TimelineItem extends React.Component {

    render() {
        return (
            <div className={classes}>
                <i class="glyphicon glyphicon-remove"></i>  
                <h1 className="card-title">{this.props.data.title}</h1>        
                <div className="content">
                    <ul>
                        <li>Released: {this.props.data.pubdate.substring(0,10)}</li>
                    </ul>
                    <p className="description">{this.props.data.description}</p>
                    <div className="rating-container">
                        <i className="fas fa-star" id="star-one"></i>
                        <i className="fas fa-star" id="star-two"></i>
                        <i className="fas fa-star" id="star-three"></i>
                        <i className="fas fa-star" id="star-four"></i>
                        <i className="fas fa-star" id="star-five"></i>
                    </div>
                </div>
            </div>
        )
    }
};


export default TimelineItem;