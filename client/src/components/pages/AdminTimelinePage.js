import React from 'react';

class AdminTimelinePage extends React.Component {
  
  constructor(props) {
    super(props);
  }
  
  
  render () {
    return (
      <div className="AdminTimeline">
          <h1>Admin page</h1>
          <h1>Status: {this.props.loggedInStatus}</h1>
      </div>
    );
  }
  
}

export default AdminTimelinePage;