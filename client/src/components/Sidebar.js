import '../css/Sidebar.css';
import Autocomplete from './Autocomplete';
import CreateOrEditModal from './CreateOrEditModal.js'
import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import {store} from "react-notifications-component";
import Timeline from './Timeline.js';
import {$, jQuery} from 'jquery';

function Sidebar(props) {

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
  
  let sortClasses = `sidenav-button sort`;
  async function handleSortClick(event) {
    /*if (props.parentTL.state.sort) {
      });
      document.querySelector(".sort").style.backgroundColor = "#cecccc";
    } else {
      props.parentTL.setState({
        sort: true
      });
      document.querySelector(".sort").style.backgroundColor = "rgb(218, 190, 36)";
    }*/
  }

  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedin, setIsLoggedin] = useState(props.loggedInStatus);

  useEffect(() => {
    setIsLoggedin(props.loggedInStatus);
  }, [props.loggedInStatus])

    return (
      <div className="first">
        <div className="Sidebar">
          <h1 className="title">Star Wars Timeline</h1>
          <header className="Sidebar-header">
            <div id="outer">
                <div className="inner">
                  {isLoggedin === "LOGGED_IN"
                  ? <button className="Sidebar-button" onClick={() => setIsOpen(true)}>Suggest New Card</button>
                  : <button className="Sidebar-button" onClick={alertNotLoggedIn}>Suggest New Card</button>
                  }
                  <CreateOrEditModal data={null} open={isOpen} onClose={() => setIsOpen(false)} />
                </div>
            </div>
          </header>
        </div>
        <div className="sidenav">
         <Autocomplete
            options={props.cards}
          /> 
            <button className="sidenav-button">Filter</button>
            <button className={sortClasses} onClick={handleSortClick}>Sort</button>
        </div>
      </div>
    );
  }
  
   export default Sidebar;


