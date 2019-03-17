import React, {useState, useEffect} from 'react';
import HourInputs from './HourInputs'
import SelectCategory from './SelectCategory'

export default function BusinessForm(props) {
  const [eachDay, setEachDay] = useState('');

  const populateDays = () => {
    props.setResetHours(false)
    let days;

    if(props.hours) {
      days = Object.keys(props.hours)
  
      days.forEach(day => {
        setEachDay(days.map((day, index) => {
          return (
            <fieldset key={index}>
              <HourInputs open={props.hours[day].open} close={props.hours[day].close} name={day} onChange={props.handleHoursChange} />
            </fieldset>
          )
        }))
      })
    } 
    
    else {
      days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

      setEachDay(days.map((day, index) => {
        return (
          <fieldset key={index}>
            <HourInputs name={day} onChange={props.handleHoursChange} />
          </fieldset>
        )
      }))
    }
  }

  useEffect(
    () => {
      populateDays()
    }, []
  )

  return (
    <section>
      <label htmlFor='business-name' aria-label='username-input'>Business Name</label>
        <input
          value={props.businessName}
          onChange={e => props.setBusinessName(e.target.value)}
          placeholder='enter business name'
          type='text'
          name='business-name'
          pattern='^(\b[A-Z]\w*\s*)+.{2,}$'
          title='Please enter the business name'
          id='business-name'
          aria-labelledby='business-name'
          required
        />

      <SelectCategory {...props} category={props.category} setCategory={props.setCategory} />

      <label htmlFor='telephone' aria-label='telephone-input'>Telephone</label>
        <input 
          id='telephone'
          type='tel'
          value={props.telephone}
          onChange={e => props.setTelephone(e.target.value)}
          placeholder='5031239876'
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
          value={props.street}
          onChange={e => props.setStreet(e.target.value)}
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
          value={props.city}
          onChange={e => props.setCity(e.target.value)}
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
          value={props.state}
          onChange={e => props.setState(e.target.value)}
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
          value={props.zip}
          onChange={e => props.setZip(e.target.value)}
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
          value={props.latitude}
          onChange={e => props.setLatitude(e.target.value)}
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
          value={props.longitude}
          onChange={e => props.setLongitude(e.target.value)}
          placeholder='-122.7944704'
          title='Please enter the longitude, between -180 and 0 (East/West)'
          pattern='^([\-])(180(\.0+)?|(1[0-7]\d)|([1-9]?\d))(\.\d+)?$'
          name='longitude-code'
          aria-labelledby='longitude code'
          required
        />
      </fieldset>
        
      <fieldset key={props.resetHours}>
        <legend>Business Hours</legend>
        {eachDay}
      </fieldset>

      <button type='submit' className='add-business-submit'>Submit</button>
      <button type='reset' onClick={props.reset}>Reset</button>
    </section>
  )
}