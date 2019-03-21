import React, {useState} from 'react';
import './Search.css';
import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from '../functions/normalizeResponse';

const cache = {}

export default function Search(props) {
  const [serverMessage, setServerMessage] = useState(null);

  const getLocationCoordinates = (input) => {
    if(cache[input]) {
      return cache[input]
    }

    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    return (fetch(`${API_BASE_URL}/location`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        'location': props.userLocation
      })
    }))
    .then(res => normalizeResponseErrors(res))
    .then(res => {
      return res.json();
    })
    .then(res => {
      setServerMessage(null)
      cache[input] = [res.lat, res.long]
      return [res.lat, res.long]
    })
    .catch(err => {
      console.log(err)
      let message = 'Something went wrong, please try again later';
      setServerMessage(message)
    })
  }

  const searchRequest = async (e) => {
    e.preventDefault()
    const [lat, long] = await getLocationCoordinates(props.userLocation)
    props.history.push(`/business/search?long=${long}&lat=${lat}&rad=${props.radius}&input=${props.userLocation}`)
  }

  return (
    <form className='search-bar' onSubmit={searchRequest}>
      <input 
        aria-label='city and state'
        type='text'
        name='search' 
        value={props.userLocation} 
        onChange={e => props.updateLocation(e.target.value)} 
        placeholder='City, State'
        required>
      </input>

      <select aria-label='radius' value={props.radius} onChange={e => props.updateRadius(e.target.value)}>
        <option value='10'>10 Miles</option>
        <option value='20'>20 Miles</option>
        <option value='50'>50 Miles</option>
        <option value='100'>100 Miles</option>
        <option value='200'>200 Miles</option>
        <option value='3963.2'>Any</option>
      </select>

      <button aria-label='search' type='submit'><i className="fas fa-search"></i></button>
      
      {serverMessage}
   </form>
  )
}