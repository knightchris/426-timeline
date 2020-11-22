import React, {useState, useEffect} from 'react';
import '../css/TimelineModal.css'
import {store} from "react-notifications-component"



function Rating(props) {
    if (props.data.mediatype === "movie" || props.data.mediatype === "television") {
        if (props.data.rating != null) {
            return <div className="mediadiv">IMDB Rating: {props.data.rating}</div>  
        }
    }
}


function AdminTimelineItem (props) {
   
    return (
        <div className="timelineItem" id={props.data.mediaid}>   
            <div className="content">
            <h1 className="card-header">{props.data.title}</h1>
            {Rating(props)}
            <div className="mediadiv">A {props.data.mediatype} by {props.data.creator}</div>  
                <div className="unidiv">Universe date: {props.data.unidate}</div>
                <div className="unidiv">Released: {props.data.pubdate.substring(0,10)}</div>
                <p className="unidiv">{props.data.description}</p>
            <p>Contributed by: {props.data.contributors.join(', ')}</p>
            </div>
        </div>
    );
   
    
};


export default AdminTimelineItem;