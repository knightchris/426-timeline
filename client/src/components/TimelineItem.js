import { unmountComponentAtNode, render } from 'react-dom';
import ReactDOM from 'react-dom';
import React from 'react';
import $ from 'jquery';
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
        if(!(this.state.displayModal)) {
            return (
                <div id={this.props.data.mediaid}>
                <h1 className="card-header" onClick={this.handleClick}>{this.props.data.title}</h1>            
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