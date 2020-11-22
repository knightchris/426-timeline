// import { unmountComponentAtNode, render } from 'react-dom';
// import ReactDOM from 'react-dom';
import React from 'react';
import TimelineModal from './TimelineModal.js';
import '../css/TimelineItem.css'


class TimelineItem extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {id: this.key, displayModal: false};
       
    }

    handleClick(e) {
        this.setState({displayModal: true});
    }

    render() {
        if(!    (this.state.displayModal)) {
            return (
                <div className="timelineItem" id={this.props.data.mediaid} >
                    <div className="content" onClick={this.handleClick}>
                        <h1 className="card-header">{this.props.data.title}</h1>   
                        <div className="mediadiv">Media Type: {this.props.data.mediatype}</div>         
                        <div className="unidiv">Universe date: {this.props.data.unidate}</div>
                        <div className="unidiv">Released: {this.props.data.pubdate.substring(0,10)}</div>      
                    </div>   
                </div>
            )
        } else {
            return (
                <TimelineModal loggedInStatus={this.props.loggedInStatus} data={this.props.data}></TimelineModal>
            )
        }
    }
}

export default TimelineItem;