import { render } from 'react-dom';
import '../css/Menu.css';
import axios from 'axios'
import Autocomplete from './Search';
import CreateCardModal from './CreateCardModal.js'
import React, {useState} from 'react';

function Menu() {

  async function handleClick(e) {
    e.preventDefault();
    const result = await axios({
        method: 'post',
        url: 'http://localhost:3000/login',
        withCredentials: true,
        data: {
          "username": "Chris",
          "password": "pass"
        }
       }); 
      console.log(result); 
  }

  async function handleCard(e) {
    e.preventDefault();
    const result = await axios({
        method: 'post',
        url: 'http://localhost:3000/mediacards',
        withCredentials: true,
        data: {
          "approved": true
        }
       }); 
      console.log(result.data); 
  }

  async function getCardTitles(e) {
    e.preventDefault();
    const result = await axios({
        method: 'post',
        url: 'http://localhost:3000/mediacards',
        withCredentials: true,
        data: {
          "approved": true
        }
    });
    let titlearr = [];
    titlearr = result.data.map(tup => tup.title);
    //console.log(titlearr);
    return titlearr;
  }

  const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="first">
        <div className="Menu">
          <h1 className="title">Star Wars Timeline</h1>
          <header className="Menu-header">
            <div id="outer">
                <div className="inner">
                    {/* <button className="menu-button" onClick={handleClick}>Login/Logout</button> */}
                </div>
                <div className="inner">
                  <button className="menu-button" onClick={() => setIsOpen(true)}>Suggest New Card</button>
                  <CreateCardModal open={isOpen} onClose={() => setIsOpen(false)} />
                </div>
                <div className="inner">
                    <button className="menu-button" onClick={handleCard}>Admin page</button>
                </div>
            </div>
          </header>
        </div>
        <div className="sidenav">
            <Autocomplete
            options={[
              "SW: Third Movie",
              "SW: Second Movie",
              "Star Wars 3",
              "That one book",
              "Luke",
              "Darth Vader",
              "Jedi",
              "Yoda"
            ]}
          />
            <button className="sidenav-button">Filter</button>
            <button className="sidenav-button">Sort</button>
        </div>
      </div>
    );
  }
  
   export default Menu;


