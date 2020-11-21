// import { unmountComponentAtNode, render } from 'react-dom';
// import ReactDOM from 'react-dom';
import React from 'react';
import $ from 'jquery';
import TimelineModal from './TimelineModal.js';
import '../css/TimelineItem.css'

let uppercase = function(word) {
    word = word[0].toUpperCase() + word.slice(1);
    console.log(word);
    return word;
}


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
        if(!(this.state.displayModal)) {
            return (
                <div className="timelineItem" id={this.props.data.mediaid} onClick={this.handleClick}>
                    <div className="content">
                        <h1 className="card-header">{this.props.data.title}</h1>   
                        <div className="mediadiv">Media Type: {uppercase(this.props.data.mediatype)}</div>         
                        <div className="unidiv">Universe date: {this.props.data.unidate}</div>      
                    </div>   
                </div>
            )
        } else {
            return (
                <TimelineModal loggedInStatus={this.props.loggedInStatus} key={this.props.data.mediaid} data={this.props.data}></TimelineModal>
            )
        }
    }
}

export default TimelineItem;