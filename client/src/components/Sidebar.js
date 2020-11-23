import '../css/Sidebar.css';
import Autocomplete from './Autocomplete';
import CreateOrEditModal from './CreateOrEditModal.js'
import React, {useState, useEffect} from 'react';
import {store} from "react-notifications-component";

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

  const [sort, setSort] = useState(false);
  let sortClasses = `sidenav-button sort`;
  async function handleSortClick(event) {
    if(sort) {
      setSort(false);
    } else {
      setSort(true);
    }
  }

  async function handleSort(event) {
    
    let choice = event.target.textContent;
    let sort= [];
    if (choice == "Published Date, Ascending") {
      sort = ['pubdate', 'asc'];
    } else if (choice == "Published Date, Descending") {
      sort = ['pubdate', 'dsc'];
    } else if (choice == "Universe Date, Ascending") {
      sort = ['unidate', 'asc'];
    } else {
      sort = ['unidate', 'dsc'];
    }
    props.updateSort(sort)
  }

  let renderSortButton = function() {
    return  `className={sortClasses} onClick={handleSortClick}>Sort</button>`;
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
            <div className="custom-select" id="dropdown">
              <button className="sidenav-button" id="dropdownbtn">Sort</button>
              <ul className="dropdown-content">
                <li onClick={handleSort} className="sort-option" >Published Date, Ascending</li>
                <li onClick={handleSort} className="sort-option" >Published Date, Descending</li>
                <li onClick={handleSort} className="sort-option" >Universe Date, Ascending</li>
                <li onClick={handleSort} className="sort-option" >Universe Date, Descending</li>
              </ul>
            </div>
        </div>
      </div>
    );
  }
  
   export default Sidebar;


