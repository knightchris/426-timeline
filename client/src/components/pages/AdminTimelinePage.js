import React from 'react';
import AdminTimeline from '../AdminTimeline.js'
import axios from 'axios'
import {store} from "react-notifications-component"
import '../../css/AdminTimeline.css'
require('dotenv').config();

class AdminTimelinePage extends React.Component {
  
   constructor(props) {
      super(props);

      this.handleRatingsUpdate = this.handleRatingsUpdate.bind(this);
   }

   async handleRatingsUpdate() {
    const result = await axios({
      method: 'get',
      url: `${process.env.REACT_APP_REQUEST_SERVER}/updateratings`,
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
          <br></br>
          <h1 className="admintimeline-title">Admin Timeline</h1>
          <button className="admintimeline-button" onClick={this.handleRatingsUpdate}>Update IMDB Ratings</button>
          <AdminTimeline />
      </div> 
    );
  }
  
}

export default AdminTimelinePage;