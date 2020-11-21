import React from 'react';
import {Background, Midground,} from '../Background.js';
import Timeline from '../Timeline.js';

class TimelinePage extends React.Component {
  
  // constructor(props) {
  //   super(props);
  // }
  
  render() {
    return (
        <div>
          <Background />
          <Midground />
          <Timeline />
        </div>
    );
  }
  
}

export default TimelinePage;