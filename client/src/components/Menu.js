import { render } from 'react-dom';
import '../css/Menu.css';
import axios from 'axios'

function Menu() {

  async function handleClick(e) {
    e.preventDefault();
    const result = await axios({
        method: 'get',
        url: 'http://localhost:3000/checklogin',
        withCredentials: true,
       }); 
      console.log(result); 
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
            <div class="inner">
                <button class="menu-button" onClick={handleClick}>Login/Logout</button>
            </div>
            <div className="inner">
                <button class="menu-button">Create User</button>
            </div>
            <div className="inner">
                <button class="menu-button">Admin page</button>
            </div>
        </div>
        </header>
      </div>
    );
  }
  
   export default Menu;


