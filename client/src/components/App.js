import React from 'react';
import Header from './Header.js';
import TimelinePage from './pages/TimelinePage.js';
import AdminTimelinePage from './pages/AdminTimelinePage.js'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';


// Notifications (https://www.npmjs.com/package/react-notifications-component)
import ReactNotification from 'react-notifications-component'
import "animate.css"
import 'react-notifications-component/dist/theme.css'



export default class App extends React.Component {
  
  constructor() {
    super();

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user: ""
    }

    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(username) {
    this.setState({
      loggedInStatus: "LOGGED_IN",
      user: username
    })
  }

  render() {
    return (
      <Router>
        <div className="App">
        <ReactNotification />
          <Header loggedInStatus={this.state.loggedInStatus} handleLogin={this.handleLogin}/>
          <Switch>
            <Route exact path="/"  render={props => (<TimelinePage {...props} loggedInStatus={this.state.loggedInStatus} /> )} />
            <Route exact path="/admin"  render={props => (<AdminTimelinePage {...props} loggedInStatus={this.state.loggedInStatus} /> )} />
          </Switch>
        </div>
      </Router>
      );
  }
  
}


