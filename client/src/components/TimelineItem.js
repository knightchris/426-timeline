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
                        <div className="mediadiv cap"><span className="medialabel">Media Type:</span> {this.props.data.mediatype}</div>         
                        <div className="unidiv"><span className="medialabel">Universe date:</span> {this.props.data.unidate.substring(0,1) == '0' ? '0' : this.props.data.unidate}</div>
                        <div className="unidiv"><span className="medialabel">Released:</span> {this.props.data.pubdate.substring(0,10)}</div>      
                    </div>   
                    <span className="circle" />  
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