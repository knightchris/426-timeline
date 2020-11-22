import React, {useState, useEffect} from 'react';
import '../css/TimelineModal.css'
import TimelineItem from './TimelineItem.js';
import {store} from "react-notifications-component"
import CreateOrEditModal from "./CreateOrEditModal.js"


function Rating(props) {
    if (props.data.mediatype === "movie" || props.data.mediatype === "television") {
        if (props.data.rating != null) {
            return <div className="mediadiv">IMDB Rating: {props.data.rating}</div>  
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
          message: "Login to suggest a new card!",
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
            return (
                <div className="timelineItem" id={props.data.mediaid}>   
                    <div className="content">
                        <i className="glyphicon glyphicon-remove" onClick={handleClick}></i> 
                        {isLoggedin === "LOGGED_IN"
                        ? <i className="glyphicon glyphicon-edit"  onClick={() => setIsOpen(true)}></i>
                        : <i className="glyphicon glyphicon-edit" onClick={alertNotLoggedIn}></i>
                        }
                        <h1 className="card-header">{props.data.title}</h1> 
                        {Rating(props)}
                    <div className="mediadiv">A {props.data.mediatype} by {props.data.creator}</div>  
                        <div className="unidiv">Universe date: {props.data.unidate}</div>
                        <div className="unidiv">Released: {props.data.pubdate.substring(0,10)}</div>
                        <p className="unidiv">{props.data.description}</p>
                    <p>Contributed by: {props.data.contributors.join(', ')}</p>
                        <CreateOrEditModal data={props.data} open={isOpen} onClose={() => setIsOpen(false)} />
                    </div>
                </div>
            );
    } else {
        return (
            <TimelineItem data={props.data} loggedInStatus={isLoggedin}></TimelineItem>
        );
    }
    
};


export default TimelineModal;