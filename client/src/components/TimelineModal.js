import { render } from 'react-dom';
import React from 'react';
import '../css/TimelineModal.css'
import TimelineItem from './TimelineItem.js';


let classes = `flex-container card`;
class TimelineModal extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {id: this.key, displayItem: false};
    }

    handleClick(e) {
        this.setState({displayItem: true})
    }

    render() {
        if(!(this.state.displayItem)) {
            if(this.props.even) {
                classes = `flex-container card even`;
                return (
                    <div className={classes}>
                        <i class="glyphicon glyphicon-remove" onClick={this.handleClick}></i>  
                        <h1 className="card-title">{this.props.data.title}</h1>        
                        <div className="content">
                            <ul>
                                <li>Released: {this.props.data.pubdate.substring(0,10)}</li>
                            </ul>
                            <p className="description">{this.props.data.description}</p>
                        </div>
                    </div>
                )
            } else {
                classes = `flex-container card even`;
                return (
                    <div className={classes}>
                            <i class="glyphicon glyphicon-remove" onClick={this.handleClick}></i>  
                            <h1 className="card-title">{this.props.data.title}</h1>        
                            <div className="content">
                                <ul>
                                    <li>Released: {this.props.data.pubdate.substring(0,10)}</li>
                                </ul>
                                <p className="description">{this.props.data.description}</p>
                            </div>
                    </div>
                )
            }
        } else {
            return (
                <TimelineItem key={this.props.data.mediaid} data={this.props.data}></TimelineItem>
            )
        }
    }
};


export default TimelineModal;