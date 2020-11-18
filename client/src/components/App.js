import React from 'react';
import Header from './Header.js';
import TimelinePage from './pages/TimelinePage.js';
import AdminTimelinePage from './pages/AdminTimelinePage.js'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';


function App() {
  return (
  <Router>
    <div className="App">
      <Header />
      <Switch>
        <Route path="/" exact component={TimelinePage}/>
        <Route path="/admin" component={AdminTimelinePage}/>
      </Switch>
    </div>
  </Router>
  );
}

export default App;
