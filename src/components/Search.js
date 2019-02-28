import React, { Component } from 'react';
import './Search.css';

class Search extends Component {
  getLocationCoordinates = (input) => {
    const GEO_SEARCH_URL = 'https://www.mapquestapi.com/geocoding/v1/address';
    const key = '?key=EaTfTKVe0lWnGBL9AOM4zpA4rm6O28HB'
    fetch(GEO_SEARCH_URL + key + '&location=' + input)
    .then(results => results.json())
    .then(data => {
      let lat = data.results[0].locations[0].latLng.lat;
      let lng = data.results[0].locations[0].latLng.lng;
      console.log('lat: ' + lat + ', long: ' + lng)
      // Do I need to create a callback function?
      // How do I make sure I get back the data before the next step executes?
      // Or do I set this all to state?
    })
  }

  searchRequest = (e) => {
    e.preventDefault()
    // 1. Get the input's
    let location = this.input.value
    let radius = this.radius.value
    // Should I set this to state?
    console.log('location: ' + location + ', radius: ' + radius)
    // 2. Get the coordinates of city
    this.getLocationCoordinates(location)
    // 3. Change the page to /long+lat+radius
    console.log('I run after coordinates')
    // 4. Get request for backend data
  }

  render () {
    return (
      <form className='search-bar' onSubmit={this.searchRequest}>
        <input type='text'ref={input => (this.input = input)} required placeholder='City, State or Zip Code'></input>
        <select id="radius" ref={radius => (this.radius = radius)}>
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
}

export default Search;