import React from 'react';
import './Search.css';

const cache = {}

export default function Search(props) {

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
    console.log('getting new coordinates', lat, long)
    return [lat, long]
  }

  const searchRequest = async (e) => {
    e.preventDefault()
    const [lat, long] = await getLocationCoordinates(props.userLocation)
    console.log('this is the new state ', props.userLocation, props.radius)
    props.history.push(`/business/search?long=${long}&lat=${lat}&rad=${props.radius}`)
  }

  return (
    <form className='search-bar' onSubmit={searchRequest}>
      <label htmlFor='search' aria-label='search-form'>City, State</label>
      <input 
        type='text' 
        id='search' 
        name='search' 
        value={props.userLocation} 
        onChange={e => props.updateLocation(e.target.value)} 
        placeholder='City, State or Zip Code'
        required>
      </input>
      
      <label htmlFor='radius' aria-label='radius-input'>Radius</label>
        <select id='radius' value={props.radius} onChange={e => props.updateRadius(e.target.value)}>
          <option value='10'>10</option>
          <option value='20'>20</option>
          <option value='50'>50</option>
          <option value='100'>100</option>
          <option value='200'>200</option>
          <option value='3963.2'>Any</option>
        </select>
      <button type='submit'>Search</button>
    </form>
  )
}