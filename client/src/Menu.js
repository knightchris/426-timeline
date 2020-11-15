import { render } from 'react-dom';
import './Menu.css';

function Menu() {
    
    return (
      <div className="Menu">
      <h1 className="title">Star Wars Timeline</h1>
        <header className="Menu-header">
        <div id="outer">
            <div class="inner">
                <button className="menu-button">Filter</button>
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


