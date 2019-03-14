import React, {useState, useEffect} from 'react';
import { API_BASE_URL } from '../config';
import HourInputs from './HourInputs'
import SelectCategory from './SelectCategory'
import { normalizeResponseErrors } from '../functions/normalizeResponse';

export default function AddBusiness(props) {
  const [businessName, setBusinessName] = useState('');
  const [category, setCategory] = useState('');
  const [unformatedTel, setUnformatedTel] = useState('')
  const [telephone, setTelephone] = useState('')
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [eachDay, setEachDay] = useState('');
  const [hours, setHours] = useState({})
  const [resetHours, setResetHours] = useState(false)
  const [serverMessage, setServerMessage] = useState(null);

  const reset = () => {
    setBusinessName('')
    setCategory('')
    setUnformatedTel('')
    setTelephone('')
    setStreet('')
    setCity('')
    setState('')
    setZip('')
    setLatitude('')
    setLongitude('')
    setHours({})
    setResetHours(true)
  }

  const populateDays = () => {
    setResetHours(false)
    let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    setEachDay(days.map((day, index) => {
      return (
        <fieldset key={index}>
          <HourInputs name={day} onChange={handleHoursChange} />
        </fieldset>
      )
    }))
  }

  const formatPhoneNumber = (phoneNumberString) => {
    let cleaned = ('' + phoneNumberString).replace(/\D/g, '')
    let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
    if (match) {
      setTelephone('(' + match[1] + ') ' + match[2] + '-' + match[3])
      return match
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    await formatPhoneNumber(unformatedTel)

    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    return (fetch(`${API_BASE_URL}/business/`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        'user_id': localStorage.userId,
        'name': businessName,
        category,
        'address': {
          street,
          city,
          state,
          zip,
          'coordinates': [longitude, latitude]
        },
        hours,
        telephone
      })
    }))
    .then(res => normalizeResponseErrors(res))
    .then(res => {
      return res.json();
    })
    .then(res => {
      setServerMessage(null);
      reset()
      setServerMessage(`${res.name} succesfully added`)
      setTimeout(() => { setServerMessage(null) }, 4000)
    })
    .catch(err => {
      let message;
      if (err.code === 422 || 400) {
        message = err.message;
        } else if (err.code === 500) {
          message = 'Internal server error';
        } else {
          message = 'Something went wrong, please try again later';
        }
      setServerMessage(message)
    })
  };

  const handleHoursChange = (day, value) => {
    hours[day] = value
  }

  useEffect(
    () => {
      populateDays()
    }, []
  )
  
  return(
    <form className='add-business-form' onSubmit={handleSubmit}>
      <label htmlFor='business-name' aria-label='username-input'>Business Name</label>
      <input
        value={businessName}
        onChange={e => setBusinessName(e.target.value)}
        placeholder='enter business name'
        type='text'
        name='business-name'
        pattern='^(\b[A-Z]\w*\s*)+.{2,}$'
        title='Please enter the business name'
        id='business-name'
        aria-labelledby='business-name'
        required
      />

      <SelectCategory {...props} category={category} setCategory={setCategory} />

      <label htmlFor='telephone' aria-label='telephone-input'>Telephone</label>
      <input 
        id='telephone'
        type='tel'
        value={unformatedTel}
        onChange={e => setUnformatedTel(e.target.value)}
        placeholder='5031239876'
        // maxLength='10'
        title='Please enter a telephone number in this format: 5031239876'
        pattern='^[0-9]{10,10}$'
        name='telephone'
        aria-labelledby='telephone'
        required
      />

      <fieldset>
        <legend>Business Address</legend>
      
        <label htmlFor='street' aria-label='street-address-input'>Street Address</label>
        <input 
          id='street'
          type='text'
          value={street}
          onChange={e => setStreet(e.target.value)}
          placeholder='123 Main St'
          title='Please enter a street address in this pattern 542 W 15th Street'
          name='street-address'
          aria-labelledby='street-address'
          required
        />

        <label htmlFor='city' aria-label='city-name-input'>City</label>
        <input 
          id='city'
          type='text'
          value={city}
          onChange={e => setCity(e.target.value)}
          placeholder='Portland'
          title='Please enter a city name, first letter must be capital'
          pattern='^(\b[A-Z]\w*\s*)+.{2,}$'
          name='city-name'
          aria-labelledby='city-name'
          required
        />

        <label htmlFor='state' aria-label='state-name-input'>State</label>
        <input 
          id='state'
          type='text'
          value={state}
          onChange={e => setState(e.target.value)}
          placeholder='OR'
          title='Please enter state two letter abbreviation, must be uppercase'
          pattern='[A-Z]{2}'
          name='state-name'
          aria-labelledby='state-name'
          required
        />

        <label htmlFor='zip' aria-label='state-name-input'>Zip Code</label>
        <input 
          id='zip'
          type='number'
          value={zip}
          onChange={e => setZip(e.target.value)}
          placeholder='97236'
          title='Please enter the business zip code'
          pattern='^\d{5}(?:[-]\d{4})?$'
          name='zip-code'
          aria-labelledby='zip code'
          required
        />

        <label htmlFor='latitude' aria-label='latitude-input'>Latitude</label>
        <input 
          id='latitude'
          type='number'
          value={latitude}
          onChange={e => setLatitude(e.target.value)}
          placeholder='45.5426225'
          title='Please enter the latitude, between 0 and 90 (North/South)'
          pattern='^([+]?)(90(\.0+)?|([1-8]?\d))(\.\d+)?$'
          name='latitude-code'
          aria-labelledby='latitude code'
          required
        />

        <label htmlFor='longitude' aria-label='longitude-input'>Longitude</label>
        <input 
          id='longitude'
          type='number'
          value={longitude}
          onChange={e => setLongitude(e.target.value)}
          placeholder='-122.7944704'
          title='Please enter the longitude, between -180 and 0 (East/West)'
          pattern='^([\-])(180(\.0+)?|(1[0-7]\d)|([1-9]?\d))(\.\d+)?$'
          name='longitude-code'
          aria-labelledby='longitude code'
          required
        />
      </fieldset>
      
      <fieldset key={resetHours}>
        <legend>Business Hours</legend>
        {eachDay}
      </fieldset>

      <button type='submit' className='add-business-submit'>Submit</button>
      <button type='reset' onClick={reset}>Reset</button>
      {serverMessage}
    </form>
  )
}