import React, { useState, useEffect } from 'react';
import './Home.css';
import Search from './Search';
import Header from './Header';

export default function Home(props) {
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

  return (<div className='home' >
    <Header />
    <Search 
        {...props} 
        updateLocation={updateLocation} 
        updateRadius={updateRadius} 
        userLocation={userLocation} 
        radius={radius} 
      />
    </div>
  );
}