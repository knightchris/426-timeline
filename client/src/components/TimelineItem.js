import { unmountComponentAtNode, render } from 'react-dom';
import ReactDOM from 'react-dom';
import React from 'react';
import $ from 'jquery';
import TimelineModal from './TimelineModal.js';
import '../css/TimelineItem.css'

let classes = `timelineItem`;
class TimelineItem extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        let isEven;
        if ((this.props.data.mediaid % 2) == 0) {
            isEven = true;
        } else {
            isEven = false;
        }
        this.state = {id: this.key, displayModal: false, even: {isEven}};
        if (this.state.even.isEven) {
            classes = `timelineItem even`;
        } else {
            classes = `timelineItem odd`;
        }
    }

    handleClick(e) {
        this.setState({displayModal: true});
    }

    render() {
        if(!(this.state.displayModal)) {
            return (
                <div id={this.props.data.mediaid} className={classes}>
                    <h1 className="card-header" onClick={this.handleClick}>{this.props.data.title}</h1>   
                    <div className="unidiv">Universe date: {this.props.data.unidate}</div>         
                </div>
            )
        } else {
            return (
                <TimelineModal even={this.state.even} key={this.props.data.mediaid} data={this.props.data}></TimelineModal>
            )
        }
    }
}

export default TimelineItem;