import React, { Component } from 'react';
import Header from './Header.js';
import TimelinePage from './pages/TimelinePage.js';
import AdminTimelinePage from './pages/AdminTimelinePage.js'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import axios from 'axios';
import ProtectedRoute from './auth/ProtectedRoute.js'



// Notifications (https://www.npmjs.com/package/react-notifications-component)
import ReactNotification from 'react-notifications-component'
import "animate.css"
import 'react-notifications-component/dist/theme.css'


export default class App extends React.Component {
  
  constructor() {
    super();

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user: "",
      contributioncount: 0,
      admin: false
    }

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  async checkLoginStatus() {
    let result = await axios({
      method: 'get',
      url: 'http://localhost:3000/checklogin',
      withCredentials: true,
     }); 
     if (result.data.username != undefined && this.state.loggedInStatus == "NOT_LOGGED_IN") {
       this.setState({
        loggedInStatus: "LOGGED_IN",
        user: result.data.username,
        contributioncount: result.data.contributioncount,
        admin: result.data.admin
       })
     } else if (result.data == "You are not logged in" && this.state.loggedInStatus == "LOGGED_IN") {
        this.setState({
          loggedInStatus: "NOT_LOGGED_IN",
          user: "",
          contributioncount: 0,
          admin: false
        })
     }
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  handleLogin(username, contributioncount, admin) {
    this.setState({
      loggedInStatus: "LOGGED_IN",
      user: username,
      contributioncount: contributioncount,
      admin: admin
    })
  }

  handleLogout() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
      user: "",
      contributioncount: 0,
      admin: false
    })
  }

  

  

  render() {
    return (
      <Router>
        <div className="App">
        <ReactNotification />
          <Header loggedInStatus={this.state.loggedInStatus} user={this.state.user} contributioncount={this.state.contributioncount} 
                                  admin={this.state.admin} handleLogin={this.handleLogin} handleLogout={this.handleLogout}/>
          <Switch>
            <Route exact path="/"  render={props => (<TimelinePage {...props} loggedInStatus={this.state.loggedInStatus} /> )} />
            <ProtectedRoute exact path="/admin" admin={this.state.admin} component={AdminTimelinePage} />
          </Switch>
        </div>
      </Router>
      );
  }
  
}


