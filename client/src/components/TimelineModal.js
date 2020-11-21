import React, {useState, useEffect} from 'react';
import '../css/TimelineModal.css'
import TimelineItem from './TimelineItem.js';
import {store} from "react-notifications-component"
import CreateOrEditModal from "./CreateOrEditModal.js"


function Rating(props) {
    if (props.data.mediatype === "movie" || props.data.mediatype === "television") {
        return <h1 className="card-header">{props.data.title}</h1> 
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
   const [key, setKey] = useState(props.key)
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
                        {Rating(props)}
                        <div className="mediadiv">IMDB Rating: {props.data.rating}</div>  
                    <div className="mediadiv">A {props.data.mediatype} by {props.data.creator}</div>  
                        <div className="unidiv">Universe date: {props.data.unidate}</div>
                        <div className="unidiv">Released: {props.data.pubdate.substring(0,10)}</div>
                        <p className="unidiv">{props.data.description}</p>
                    <p>Contributed by: {props.data.contributors.join(', ')}</p>
                        {console.log(props.data)}
                        <CreateOrEditModal data={props.data} open={isOpen} onClose={() => setIsOpen(false)} />
                    </div>
                </div>
            );
    } else {
        return (
            <TimelineItem key={props.data.mediaid} data={props.data} loggedInStatus={isLoggedin}></TimelineItem>
        );
    }
    
};


export default TimelineModal;