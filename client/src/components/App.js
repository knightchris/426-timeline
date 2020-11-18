import React from 'react';
import Timeline from './pages/Timeline.js';
import Header from './Header.js';
import AdminTimeline from './pages/AdminTimeline.js'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';


function App() {
  return (
  <Router>
    <div className="App">
      <Header />
      <Switch>
        <Route path="/" exact component={Timeline}/>
        <Route path="/admin" component={AdminTimeline}/>
      </Switch>
    </div>
  </Router>
  );
}

export default App;
