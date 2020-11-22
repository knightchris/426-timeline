import React from 'react';
import '../css/TimelineModal.css'


function Rating(props) {
    if (props.data.mediatype === "movie" || props.data.mediatype === "television") {
        if (props.data.rating != null) {
            return <div className="mediadiv">IMDB Rating: {props.data.rating}</div>  
        }
    }
}


function appendOriginalIfIsEditRequest(props) {
    if (props.originalcard !== undefined && props.originalcard !== "Media with given mediaid not found") {
        return (<>
            <br></br>
            <div className="content">
                <h3>Original Card</h3>
                <h1 className="card-header">{props.originalcard.title}</h1>
                {Rating(props)}
                <div className="mediadiv">A {props.originalcard.mediatype} by {props.originalcard.creator}</div>  
                    <div className="unidiv">Universe date: {props.originalcard.unidate}</div>
                    <div className="unidiv">Released: {props.originalcard.pubdate.substring(0,10)}</div>
                    <p className="unidiv">{props.originalcard.description}</p>
            </div>
        </>)
    }
}


function AdminTimelineItem (props) {
   
    return (
        <div className="timelineItem" id={props.data.mediaid}>   
            <div className="content">
                {props.originalcard === "Media with given mediaid not found" 
                ? <><h3>Proposed New Card</h3><i className="glyphicon glyphicon-check" onClick={() => props.handleApproveNewCard(props.data.mediaid)}></i></>
                : <><h3>Proposed Edit</h3><i className="glyphicon glyphicon-check" onClick={() => props.handleApproveEditCard(props.data.mediaid, props.data.contributors[0])}></i></>
                }
                <i className="glyphicon glyphicon-remove" onClick={() => props.handleDenyCard(props.data.mediaid)}></i>
                <h1 className="card-header">{props.data.title}</h1>
                {Rating(props)}
                <div className="mediadiv">A {props.data.mediatype} by {props.data.creator}</div>  
                    <div className="unidiv">Universe date: {props.data.unidate}</div>
                    <div className="unidiv">Released: {props.data.pubdate.substring(0,10)}</div>
                    <p className="unidiv">{props.data.description}</p>
                <p>Contributed by: {props.data.contributors.join(', ')}</p>
            </div>
            {appendOriginalIfIsEditRequest(props)}
        </div>
    );
   
    
};


export default AdminTimelineItem;