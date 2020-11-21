import React, {useState, useEffect} from 'react';
import '../css/TimelineModal.css'
import TimelineItem from './TimelineItem.js';
import {store} from "react-notifications-component"
import CreateOrEditModal from "./CreateOrEditModal.js"




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
                <div className="card flex-container">
                    <i className="glyphicon glyphicon-remove" onClick={handleClick}></i>  
                    <h1 className="card-title">{props.data.title}</h1>        
                    <div className="content">
                        <ul>
                            <li>Released: {props.data.pubdate.substring(0,10)}</li>
                        </ul>
                        <p className="description">{props.data.description}</p>
                        {isLoggedin === "LOGGED_IN"
                        ? <button className="Sidebar-button" onClick={() => setIsOpen(true)}>Suggest Edit</button>
                        : <button className="Sidebar-button" onClick={alertNotLoggedIn}>Suggest Edit</button>
                        }
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