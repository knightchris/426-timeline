import '../css/Sidebar.css';
import Autocomplete from './Autocomplete';
import CreateOrEditModal from './CreateOrEditModal.js'
import React, {useState, useEffect} from 'react';
import {store} from "react-notifications-component";
import Timeline from './Timeline.js';

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
    let choice = document.querySelector("#dropdown").value;
    if (choice == "Published Date, Ascending") {
      props.parentTL.state.sort = ['pubdate', 'asc'];
    } else if (choice == "Published Date, Descending") {
      props.parentTL.state.sort = ['pubdate', 'dsc'];
    } else if (choice == "Universe Date, Ascending") {
      props.parentTL.state.sort = ['unidate', 'asc'];
    } else {
      props.parentTL.state.sort = ['pubdate', 'dsc'];
    }
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
            <button className="sidenav-button">Filter</button>
            {sort 
            ? 
            <div>
              <label for="dropdown" id="sort-dropdown-label">Sort by:</label>
              <br></br>
              <select name="dropdown" id="dropdown">
                <option className="sort-option" value="Published Date, Ascending">Published Date, Ascending</option>
                <option className="sort-option" value="Published Date, Descending">Published Date, Descending</option>
                <option className="sort-option" value="Universe Date, Ascending">Universe Date, Ascending</option>
                <option className="sort-option" value="Universe Date, Descending">Universe Date, Descending</option>
              </select>
              <svg onClick={handleSort} id="sort-go" width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-right" fill="white" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
              </svg>
            </div>
            : <button className={sortClasses} onClick={handleSortClick}>Sort</button>
            }
        </div>
      </div>
    );
  }
  
   export default Sidebar;


