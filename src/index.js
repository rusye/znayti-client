import React, { useState }  from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './index.css';
// import Search from './components/Search'
import HomePage from './components/HomePage';
import Categories from './components/Categories';
import Category from './components/Category';
import Business from './components/Business';

import * as serviceWorker from './serviceWorker';

function App() {
  const [location, setLocation] = useState('Portland, OR')
  const [radius, setRadius] = useState(10)

  const updateLocation = (e) => {
    setLocation(e)
  }

  const updateRadius = (e) => {
    setRadius(e)
  }
  
  return (
    <div>
      <Router>
        <Switch>
          {/* <Route exact path='/' component={HomePage} /> */}
          <Route exact path='/' 
            render={props => <HomePage props={props} updateLocation={updateLocation} updateRadius={updateRadius} location={location} radius={radius} />}
          />
          {/* <Route exact path='/business/search' component={Categories} /> */}
          <Route exact path='/business/search' 
            render={props => <Categories props={props} updateLocation={updateLocation} updateRadius={updateRadius} location={location} radius={radius} />}
          />
          {/* <Route exact path='/business/:category/search' component={Category} /> */}
          <Route exact path='/business/:category/search' 
            render={props => <Category props={props} updateLocation={updateLocation} updateRadius={updateRadius} location={location} radius={radius} />}
          />
          {/* <Route exact path='/business/:id' component={Business} /> */}
          <Route exact path='/business/:id' 
            render={props => <Business props={props} updateLocation={updateLocation} updateRadius={updateRadius} location={location} radius={radius} />}
          />
        </Switch>
      </Router>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();