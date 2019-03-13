import React, {useState, useEffect} from 'react';
import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from '../functions/normalizeResponse';

export default function DeleteCategory(props) {
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState('')
  const [serverMessage, setServerMessage] = useState(null);

  const reset = () => {
    setCategory('')
    setCategories('')
  }

  const populateCategories = () => {
    if (props.categories.length > 0) {
      setServerMessage(null)
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

    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    return (fetch(`${API_BASE_URL}/categories/${category}`, {
      method: 'DELETE',
      headers,
      body: JSON.stringify({
        'id': category
      })
    }))
    .then(res => normalizeResponseErrors(res))
    .then(res => {
      setServerMessage(null);
      reset()
      setServerMessage('Category was successfully deleted.')
      setTimeout(() => { 
        setServerMessage(null)
        props.onChange(Math.random()) 
      }, 4000)
    })
    .catch(err => {
      console.log(err)
      let message;
      if (err.code === 422 || 400) {
        message = err.message;
      } else if (err.code === 500) {
        message = 'Internal server error';
      } else {
        message = 'Something went wrong, please try again later';
      }
      localStorage.setItem('serverMessage', message)
      setServerMessage(message)
    })
  };

  useEffect(
    () => {
      populateCategories()
    }, [props.categories]
  )

  return(
    <form className='edit-category-form' onSubmit={handleSubmit}>
      <label aria-label='select-category'>Category To Delete
        <select value={category} onChange={e => setCategory(e.target.value)} required>
          <option disabled={true} value=''> -- select a category -- </option>
          {categories}
        </select>
      </label>

      <button type='submit' className='delete-submit'>Delete</button>
      {serverMessage}
    </form>
  )
}