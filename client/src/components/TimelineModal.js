import React from 'react';
import '../css/TimelineModal.css'
import TimelineItem from './TimelineItem.js';


let classes = `flex-container card`;
class TimelineModal extends React.Component {
    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.state = {id: this.key, displayItem: false};
    }

    handleClose(e) {
        this.setState({displayItem: true})
    }

    handleEdit(e) {
        console.log("Edit here!");
    }

    render() {
        if(!(this.state.displayItem)) {
                return (
                    <div className="timelineItem" id={this.props.data.mediaid} >
                        <div className="content">
                            <i class="glyphicon glyphicon-remove" onClick={this.handleClose}></i>
                            <i class="glyphicon glyphicon-edit" onClick={this.handleEdit}></i>  
                            <h1 className="card-header">{this.props.data.title}</h1>   
                            <div className="mediadiv">Media Type: {this.props.data.mediatype}</div>         
                            <div className="unidiv">Universe date: {this.props.data.unidate}</div>
                            <div className="unidiv">Released: {this.props.data.pubdate.substring(0,10)}</div>
                            <p className="description">{this.props.data.description}</p>   
                        </div>   
                    </div>

                );
        } else {
            return (
                <TimelineItem key={this.props.data.mediaid} data={this.props.data}></TimelineItem>
            )
        }
    }
};


export default TimelineModal;