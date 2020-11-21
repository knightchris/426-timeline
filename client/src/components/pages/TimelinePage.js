import React from 'react';
import Timeline from '../Timeline.js';

class TimelinePage extends React.Component {
  
  /*  constructor(props) {
     super(props);
   } */
  
  render() {
    return (
        <div>
          <Timeline loggedInStatus={this.props.loggedInStatus}/>
        </div>
    );
  }
  
}

export default TimelinePage;