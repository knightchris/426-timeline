import React from 'react';
import AdminTimeline from '../AdminTimeline.js'
import axios from 'axios'
import {store} from "react-notifications-component"

class AdminTimelinePage extends React.Component {
  
   constructor(props) {
      super(props);

      this.handleRatingsUpdate = this.handleRatingsUpdate.bind(this);
   }

   async handleRatingsUpdate() {
    const result = await axios({
      method: 'get',
      url: 'http://localhost:3000/updateratings',
      withCredentials: true,
     }); 
     if (result.data === "You are not logged in") {
      store.addNotification({
          title: "You are not logged in",
          message: "Login to update ratings",
          type: "danger",
          container: "top-center",
          insert: "top",
          animationIn: ["animate__animated animate__fadeIn"],
          animationOut: ["animate__animated animate__fadeOut"],
          dismiss: {
              duration: 4000,
              showIcon: true
          },
          width:270
      })
  } else if (result.data === "You are not an admin") {
      store.addNotification({
          title: "You are not an admin",
          message: "Only admins can update ratings",
          type: "danger",
          container: "top-center",
          insert: "top",
          animationIn: ["animate__animated animate__fadeIn"],
          animationOut: ["animate__animated animate__fadeOut"],
          dismiss: {
              duration: 4000,
              showIcon: true
          },
          width:270
      })
  } else {
    store.addNotification({
      title: "Success!",
      message: "Cached IMDB ratings updated",
      type: "success",
      container: "top-center",
      insert: "top",
      animationIn: ["animate__animated animate__fadeIn"],
      animationOut: ["animate__animated animate__fadeOut"],
      dismiss: {
          duration: 4000,
          showIcon: true
      },
      width:270
  })
  }
}
  
  render () {
    return (
      <div className="AdminTimeline">
          <h1>Admin page</h1>
          <button className="Sidebar-button" onClick={this.handleRatingsUpdate}>Update IMDB Ratings</button>
          <AdminTimeline />
      </div>
    );
  }
  
}

export default AdminTimelinePage;