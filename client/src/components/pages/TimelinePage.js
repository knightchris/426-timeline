import React from 'react';
import Menu from '../Menu.js';
// import {Background, Midground,} from '../Background.js';
import Timeline from '../Timeline.js';

class TimelinePage extends React.Component {
  
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className="Timeline">
          {/*<Background />
          <Midground /> */}
          <Menu />
          <Timeline />
          
      </div>
    );
  }
  
}

export default TimelinePage;