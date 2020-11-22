import React from 'react';
import AdminTimeline from '../AdminTimeline.js'

class AdminTimelinePage extends React.Component {
  
  // constructor(props) {
  //   super(props);
  // }
  
  
  render () {
    return (
      <div className="AdminTimeline">
          <h1>Admin page</h1>
          <AdminTimeline />
      </div>
    );
  }
  
}

export default AdminTimelinePage;