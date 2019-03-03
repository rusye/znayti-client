import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './index.css';
import HomePage from './components/HomePage';
import Categories from './components/Categories';
// import Business from './components/Business';
// import Category from './components/Category';
import * as serviceWorker from './serviceWorker';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/business/search' component={Categories} />
          {/* <Route exact path='/business/:category/search' component={Category} /> */}
          {/* <Route exact path='/business/:id' component={Business} /> */}
        </Switch>
      </Router>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();