import React, {useState} from 'react';
import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from '../functions/normalizeResponse';

export default function AddCategory() {
  const [name, setName] = useState('');
  const [serverMessage, setServerMessage] = useState(null);

  const handleSubmit = e => {
    e.preventDefault(e);

    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    return (fetch(`${API_BASE_URL}/categories/`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        name,
        'user_id': localStorage.userId
      })
    }))
    .then(res => normalizeResponseErrors(res))
    .then(res => {
      return res.json();
    })
    .then(res => {
      setServerMessage(null);
      console.log(res)
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

  return(
    <form className='add-category-form' onSubmit={handleSubmit}>
    <label htmlFor='category-name' aria-label='category-name-input'>Category Name</label>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder='Category Name'
        type='text'
        name='category'
        pattern='^(\b[A-Z]\w*\s*)+.{2,}$'
        title='Please enter category name that is 3+ characters, first letters are capitalized'
        id='category-name'
        required
        aria-labelledby='category-name'
      />

      <button type='submit' className='category-submit'>
        Submit
      </button>
      {serverMessage}
    </form>
  )
}