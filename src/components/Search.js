import React, { useState } from 'react';
import { BrowserRouter as Link } from "react-router-dom";
import './Search.css';

const cache = {}

export default function Search(props) {
  const [location, setLocation] = useState("");
  const [radius, setRadius] = useState(10);

  const getLocationCoordinates = async (input) => {
    if(cache[input]) {
      console.log('no need for another api call')
      return cache[input]
    }
    const GEO_SEARCH_URL = 'https://www.mapquestapi.com/geocoding/v1/address';
    const key = '?key=EaTfTKVe0lWnGBL9AOM4zpA4rm6O28HB'
    const results = await fetch(GEO_SEARCH_URL + key + '&location=' + input)
    const data = await results.json()
    let lat = data.results[0].locations[0].latLng.lat;
    let long = data.results[0].locations[0].latLng.lng;
    cache[input] = [lat, long]
    console.log('getting new coordinates')
    return [lat, long]
  }

  const searchRequest = async (e) => {
    e.preventDefault()
    // 1. Get the input's
    // console.log('location: ' + this.state.city + ', radius: ' + this.state.radius)
    // 2. Get the coordinates of city
    const [lat, long] = await getLocationCoordinates(location)
    // 3. Change the page to /long+lat+radius
    // 4. Get request for backend data
  }

  return (
    <form className='search-bar' onSubmit={searchRequest}>
    {/* add a label for the input */}
      <input type='text' value={location} onChange={e => setLocation(e.target.value)} required placeholder='City, State or Zip Code'></input>
      {/* add a label for the select */}
      <select id="radius" onChange={e => setRadius(e.target.value)}>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
        <option value="100">100</option>
        <option value="200">200</option>
        <option value="3963.2">Any</option>
      </select>
      <button type='submit'>Search</button>
    </form>
  )
}