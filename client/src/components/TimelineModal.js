import React, {useState, useEffect} from 'react';
import '../css/TimelineModal.css'
import TimelineItem from './TimelineItem.js';
import {store} from "react-notifications-component"
import CreateOrEditModal from "./CreateOrEditModal.js"


function Rating(props) {
    if (props.data.mediatype === "movie" || props.data.mediatype === "television") {
        if (props.data.rating != null) {
            return <div className="mediadiv"><span className="medialabel">IMDB Rating:</span> {props.data.rating}</div>  
        }
    }
}


function TimelineModal (props) {
   

    async function handleClick(e) {
        setIsDisplay(true);
    }


    async function alertNotLoggedIn() {
        store.addNotification({
          title: "You are not logged in",
          message: "Login to suggest a card edit!",
          type: "danger",
          container: "top-center",
          insert: "top",
          animationIn: ["animate__animated animate__fadeIn"],
          animationOut: ["animate__animated animate__fadeOut"],
          dismiss: {
              duration: 4000,
              showIcon: true
          },
          width:270
      })
      }

   const [isDisplay, setIsDisplay] = useState(false);
   const [isOpen, setIsOpen] = useState(false);
   const [isLoggedin, setIsLoggedin] = useState(props.loggedInStatus);

   useEffect(() => {
    setIsLoggedin(props.loggedInStatus);
   }, [props.loggedInStatus])

    
    if(!(isDisplay)) {
        let mediatext = (props.data.mediatype === "television") ? "tv show" : props.data.mediatype;
            return (
                <div className="timelineItem" id={props.data.mediaid}>   
                    <div className="content">
                        <i className="glyphicon glyphicon-remove" onClick={handleClick}></i> 
                        {isLoggedin === "LOGGED_IN"
                        ? <i className="glyphicon glyphicon-edit"  onClick={() => setIsOpen(true)}></i>
                        : <i className="glyphicon glyphicon-edit" onClick={alertNotLoggedIn}></i>
                        }
                        <h1 className="card-header">{props.data.title}</h1>
                        <div className="mediadiv"><span className="medialabel"><span className='cap'>{mediatext}</span> by:</span> {props.data.creator}</div>
                        {Rating(props)}
                        <div className="unidiv"><span className="medialabel">Universe date:</span> {props.data.unidate.substring(0,1) == '0' ? '0': props.data.unidate}</div>
                        <div className="unidiv"><span className="medialabel">Released:</span> {props.data.pubdate.substring(0,10)}</div>
                        <p className="unidiv">{props.data.description}</p>
                    <p>Contributed by: {props.data.contributors.join(', ')}</p>
                        <CreateOrEditModal data={props.data} open={isOpen} onClose={() => setIsOpen(false)} />
                    </div>
                    <span className="circle" />  
                </div>
            );
    } else {
        return (
            <TimelineItem data={props.data} loggedInStatus={isLoggedin}></TimelineItem>
        );
    }
    
};


export default TimelineModal;