import { render } from 'react-dom';
import '../css/Menu.css';
import axios from 'axios'
import Autocomplete from './Search';

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
    for(let i = 0; i < result.data.length; i++) {
      titlearr.push(result[i].title);
    }
    //titlearr = result.data.map(tup => tup.title);
    return titlearr;
  }

    return (
      <div className="first">
        <div className="Menu">
          <h1 className="title">Star Wars Timeline</h1>
          <header className="Menu-header">
            <div id="outer">
                <div className="inner">
                    <button className="menu-button" onClick={handleClick}>Login/Logout</button>
                </div>
                <div className="inner">
                    <button className="menu-button">Create User</button>
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
              "Star Wars 1",
              "Star Wars 2",
              "Star Wars 3",
              "Luke",
              "Darth Vader",
              "Jedi",
              "Yoda"
            ]}
          />
            <button className="sidenav-button" onClick={console.log("hey")}>Filter</button>
            <button className="sidenav-button">Sort</button>
            <button className="sidenav-button">Create</button>
        </div>
      </div>
    );
  }
  
   export default Menu;


