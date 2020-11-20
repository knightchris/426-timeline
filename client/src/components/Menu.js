import { render } from 'react-dom';
import '../css/Menu.css';
import axios from 'axios'

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


    return (

      <div className="Menu">
      <h1 className="title">Star Wars Timeline</h1>

        <header className="Menu-header">
        <div className="sidenav">
                <button>Search</button>
                <button>Filter</button>
                <button>Sort</button>
                <button>Create</button>
              </div>

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
    );
  }
  
   export default Menu;


