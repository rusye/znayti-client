import React, { useState }  from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './index.css';
import Search from './components/Search';
import NavBar from './components/NavBar';
import Header from './components/Header';
import Categories from './components/Categories';
import Category from './components/Category';
import Business from './components/Business';
import AdminLogin from './components/AdminLogin';

import * as serviceWorker from './serviceWorker';

function App() {
  const [userLocation, setLocation] = useState('Portland, OR')
  const [radius, setRadius] = useState(10)

  const updateLocation = (e) => {
    setLocation(e)
  }

  const updateRadius = (e) => {
    setRadius(e)
  }

  return (
    <Router>
      <div className='App'>
        <Route path='/business'path="/(business|bigboss)/" component={NavBar} />

        <Route exact path='/' component={Header} />

        {(window.location.pathname === '/bigboss/login') ? null : (
          <Route path='/' render={props => 
            <Search 
              {...props} 
              updateLocation={updateLocation} 
              updateRadius={updateRadius} 
              userLocation={userLocation} 
              radius={radius} 
            />}
          />
        )}

        <main role='main'>
          <Switch>
            <Route exact path='/business/search' component={Categories} />
            <Route exact path='/business/:category/search' component={Category} />
            <Route exact path='/business/:id' component={Business} />
            <Route exact path='/bigboss/login' component={AdminLogin} />
          </Switch>
        </main>
      </div>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();