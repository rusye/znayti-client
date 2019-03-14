import React, { useState, useEffect }  from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './index.css';
import Search from './components/Search';
import NavBar from './components/NavBar';
import Header from './components/Header';
import Categories from './components/Categories';
import BusinessList from './components/BusinessesList';
import Business from './components/Business';
import AdminLogin from './components/AdminLogin';
import Dashboard from './components/Dashboard'

import * as serviceWorker from './serviceWorker';

function App() {
  const [userLocation, setLocation] = useState('')
  const [radius, setRadius] = useState(10)

  const paramsString = decodeURIComponent(window.location.search.substring(1))
  
  const parseQueryString = (queryString) => {
    let params = {}, queries, temp, i;
    queries = queryString.split('&');
    for ( i = 0; i < queries.length; i++ ) {
        temp = queries[i].split('=');
        params[temp[0]] = temp[1];
    }
    return params;
    
  };

  const paramsKeys = (params) => params.input ? setLocation(params.input) : setLocation('Portland, OR')

  const updateLocation = (e) => {
    setLocation(e)
  }

  const updateRadius = (e) => {
    setRadius(e)
  }

  useEffect(
    () => {
      paramsKeys(parseQueryString(paramsString))
    }, []
  )

  const searchProps = (props) => {
    return (
      <Search 
        {...props} 
        updateLocation={updateLocation} 
        updateRadius={updateRadius} 
        userLocation={userLocation} 
        radius={radius} 
      />
    )
  }

  function EnforceAuthentication(Component) {
    if (localStorage.loggedIn) {
      return Component
    }
    else {
      const RedirectToHome = () => <Redirect to='/bigboss/login' />
      return RedirectToHome
    }
  }

  return (
    <Router>
      <div className='App'>
        <Route path='/(business|bigboss|dashboard)' component={NavBar} />

        <Route exact path='/' component={Header} />

        <main role='main'>
          <Switch>
            <Route path='/(bigboss|dashboard)' component={null} />
            <Route path='/' render={searchProps} />
          </Switch>

          <Switch>
            <Route exact path='/dashboard' component={EnforceAuthentication(Dashboard)} />
            <Route exact path='/business/search' component={Categories} />
            <Route exact path='/business/:category/search' component={BusinessList} />
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