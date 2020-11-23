import React from 'react';
import '../css/TimelineModal.css'


function Rating(props) {
    if (props.data.mediatype === "movie" || props.data.mediatype === "television") {
        if (props.data.rating != null) {
            return <div className="mediadiv"><span className="medialabel">IMDB Rating:</span> {props.data.rating}</div>
        }
    }
}


function appendOriginalIfIsEditRequest(props) {

    let mediatext = (props.data.mediatype === "television") ? "tv show" : props.data.mediatype;

    if (props.originalcard !== undefined && props.originalcard !== "Media with given mediaid not found") {
        return (<>
            <br></br>
            <div className="content">
                <h3>Original Card</h3>
                <h1 className="card-header">{props.originalcard.title}</h1>

                <div className="mediadiv"><span className="medialabel"><span className='cap'>{mediatext}</span> by:</span> {props.originalcard.creator}</div>
                {Rating(props)}
                <div className="unidiv"><span className="medialabel">Universe date:</span> {props.originalcard.unidate.substring(0, 1) == '0' ? '0' : props.originalcard.unidate}</div>
                <div className="unidiv"><span className="medialabel">Released:</span> {props.originalcard.pubdate.substring(0, 10)}</div>
                <p className="unidiv">{props.originalcard.description}</p>
            </div>
        </>)
    }
}


function AdminTimelineItem(props) {

    let mediatext = (props.data.mediatype === "television") ? "tv show" : props.data.mediatype;

    return (
        <div className="timelineItem" id={props.data.mediaid}>
            <div className="content">
                {props.originalcard === "Media with given mediaid not found"
                    ? <><h3>Proposed New Card</h3><i className="glyphicon glyphicon-check" onClick={() => props.handleApproveNewCard(props.data.mediaid)}></i></>
                    : <><h3>Proposed Edit</h3><i className="glyphicon glyphicon-check" onClick={() => props.handleApproveEditCard(props.data.mediaid, props.data.contributors[0])}></i></>
                }
                <i className="glyphicon glyphicon-remove" onClick={() => props.handleDenyCard(props.data.mediaid)}></i>
                <h1 className="card-header">{props.data.title}</h1>

                <div className="mediadiv"><span className="medialabel"><span className='cap'>{mediatext}</span> by:</span> {props.data.creator}</div>
                {Rating(props)}
                <div className="unidiv"><span className="medialabel">Universe date:</span> {props.data.unidate.substring(0, 1) == '0' ? '0' : props.data.unidate}</div>
                <div className="unidiv"><span className="medialabel">Released:</span> {props.data.pubdate.substring(0, 10)}</div>
                <p className="unidiv">{props.data.description}</p>
                <p>Contributed by: {props.data.contributors.join(', ')}</p>
            </div>
            {appendOriginalIfIsEditRequest(props)}
        </div>
    );


};


export default AdminTimelineItem;