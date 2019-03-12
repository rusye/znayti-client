import React, {useState, useEffect, useContext} from 'react';
// import { API_BASE_URL } from '../config';
// import { normalizeResponseErrors } from '../functions/normalizeResponse';
// import CategoryContext from "./Context";

export default function AddBusiness(props) {
  const [businessName, setBusinessName] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState('')
  const [open, setOpen] = useState('');
  const [close, setClose] = useState('');
  const [telephone, setTelephone] = useState('')
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [serverMessage, setServerMessage] = useState(null);

  // console.log(props)

  // const allCategories = useContext(CategoryContext);

  // const fetchCategories = () => {
  //   return fetch(`${API_BASE_URL}/categories`, {
  //       method: 'GET'
  //     })
  //     .then(res => normalizeResponseErrors(res))
  //     .then(res => {
  //       return res.json();
  //     })
  //     .then(rcvdCategories => {
  //       // let results = rcvdCategories
  //       // allCategories.splice(0)
  //       // allCategories.push(...results)
  //       // console.log(allCategories)
  //       console.log('i Made a fetch')
  //       setServerMessage(null);
  //       if (rcvdCategories.length > 0) {
  //         setCategories(rcvdCategories.map((categoryDetails, index) => {
  //           return (
  //             <option key={index} value={categoryDetails.id}>{categoryDetails.name}</option>
  //           )
  //         }))
  //       } else {
  //         setServerMessage('No categories available, please create a category')
  //       }
  //     })
  //     .catch(err => {
  //       let message;
  //       if (err.message) {
  //         message = err.message;
  //       } else {
  //         message = 'Unable to fetch categories, please try again';
  //       }
  //       setServerMessage(message)
  //     })
  // }

  const populateCategories = () => {
    // let rcvdCategories = props.categories
    if (props.categories.length > 0) {
      setCategories(props.categories.map((categoryDetails, index) => {
        return (
          <option key={index} value={categoryDetails.id}>{categoryDetails.name}</option>
        )
      }))
    } else {
      setServerMessage('No categories available, please create a category')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // const headers = {
    //   'Content-Type': 'application/json',
    //   'Accept': 'application/json'
    // };

    // return (fetch(`${API_BASE_URL}/api/users/`, {
    //   method: 'POST',
    //   headers,
    //   body: JSON.stringify({
    //     firstName,
    //     lastName,
    //     username,
    //     password,
    //     'admin': true
    //   })
    // }))
    // .then(res => normalizeResponseErrors(res))
    // .then(res => {
    //   return res.json();
    // })
    // .then(res => {
    //   setServerMessage(null);
    // clear the inputs
      // user = res.username
      // setServerMessage('res.business.name succesfully added')
    // })
    // .catch(err => {
    //   console.log(err)
    //   let message;
    //   if (err.code === 422) {
    //     message = err.message;
    //     } else if (err.code === 500) {
    //       message = 'Internal server error';
    //     } else {
    //       message = 'Something went wrong, please try again later';
    //     }
    //   localStorage.setItem('serverMessage', message)
    //   setServerMessage(message)
    // })
  };
  
  useEffect(
    () => {
      // fetchCategories()
      populateCategories()
    }, [props.categories]
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

      <label htmlFor='category' aria-label='select-category'>Business Category</label>
      <select id='category' value='select' onChange={e => setCategory(e.target.value)} required>
        <option disabled value='select'> -- select a category -- </option>
        {categories}
      </select>

      {/* Move this to the bottom and add monday-saturday */}
      <p>Business Hours</p>
      <label htmlFor='open' aria-label='select-open-time'>Open</label>
      <input 
        id='open' 
        type='time' 
        value={open} 
        onChange={e => setOpen(e.target.value)} 
        name='open-time'
        title='Please enter open time'
        aria-labelledby='open-time'
        required
      />

      <label htmlFor='close' aria-label='select-close-time'>Close</label>
      <input 
        id='close' 
        type='time' 
        value={close} 
        onChange={e => setClose(e.target.value)} 
        name='close-time'
        title='Please enter close time'
        aria-labelledby='close-time'
        required
      />

      <label htmlFor='telephone' aria-label='telephone-input'>Telephone</label>
      <input 
        id='telephone'
        type='tel'
        value={telephone}
        onChange={e => setTelephone(e.target.value)}
        placeholder='503-123-9876'
        title='Please enter a telephone number in this format: 503-123-9876'
        pattern='^\d{3}-\d{3}-\d{4}$'
        name='telephone'
        aria-labelledby='telephone'
        required
      />

      <p>Business Address</p>
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

      <button type='submit' className='add-business-submit'>Submit</button>
      <button type="reset">Reset</button>
      {serverMessage}
    </form>
  )
}