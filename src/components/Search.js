import React, { Component } from 'react';
import './Search.css';

const cache = {}

class Search extends Component {
  state = {
    city: '',
    radius: 10
  }

  getLocationCoordinates = async (input) => {
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

  searchRequest = async (e) => {
    e.preventDefault()
    // 1. Get the input's
    // console.log('location: ' + this.state.city + ', radius: ' + this.state.radius)
    // 2. Get the coordinates of city
    const [lat, long] = await this.getLocationCoordinates(this.state.city)
    // 3. Change the page to /long+lat+radius
    // 4. Get request for backend data
  }

  render () {
    const city = this.state.city
    return (
      <form className='search-bar' onSubmit={this.searchRequest}>
      {/* add a label for the input */}
        <input type='text' value={city} onChange={e => this.setState({city: e.target.value})} required placeholder='City, State or Zip Code'></input>
        {/* add a label for the select */}
        <select id="radius" onChange={e => this.setState({radius: e.target.value})}>
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