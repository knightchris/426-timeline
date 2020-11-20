import { unmountComponentAtNode, render } from 'react-dom';
import ReactDOM from 'react-dom';
import React from 'react';
import $ from 'jquery';
import TimelineModal from './TimelineModal.js';

class TimelineItem extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {id: this.key, displayModal: false};
    }

    handleClick(e) {
        this.setState({displayModal: true})
        console.log(this.state.displayModal);
        //let card = this.props.data;
        //let timelineModal = <TimelineModal key={card.mediaid} data={card}></TimelineModal>;
        //console.log(this.getDOMNode())
        //unmountComponentAtNode(document.getElementById(`${this.props.data.mediaid}`));
        //$(`#${this.props.data.mediaid}`).replaceWith(timelineModal);
    }

    render() {
        if(!(this.state.displayModal)) {
            return (
                <div id={this.props.data.mediaid}>
                <h1 className="card-title" onClick={this.handleClick}>{this.props.data.title}</h1>            
                </div>
            )
        } else {
            return (
                <TimelineModal key={this.props.data.mediaid} data={this.props.data}></TimelineModal>
            )
        }
    }
}

export default TimelineItem;