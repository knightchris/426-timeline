import { render } from 'react-dom';
import './Menu.css';
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
        <div id="outer">
            <div class="inner">
                <button className="menu-button" onClick={handleClick}>Filter</button>
            </div>
            <div class="inner">
                <button className="menu-button">Sort</button>
            </div>
        </div>
        </header>
      </div>
    );
  }
  
   export default Menu;


