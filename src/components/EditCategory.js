import React, {useState} from 'react';
import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from '../functions/normalizeResponse';

export default function EditCategory(props) {
  const [name, setName] = useState('');
  const [categories, setCategories] = useState('')
  const [serverMessage, setServerMessage] = useState(null);

  const reset = () => {
    setName('')
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
      props.updateCategories(res)
      reset()
      setServerMessage(`${res.name} succesfully added`)
      setInterval(() => { setServerMessage(null) }, 4000)
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
      <label aria-label='select-category'>Business Category
        <select value={category} onChange={e => setCategory(e.target.value)} required>
          <option disabled={true} value=''> -- select a category -- </option>
          {categories}
        </select>
      </label>

      <label aria-label='category-name-input'>New Category Name
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder='Category Name'
          type='text'
          name='category'
          pattern='^(\b[A-Z]\w*\s*)+.{2,}$'
          title='Please enter category name that is 3+ characters, first letters are capitalized'
          required
          aria-labelledby='category-name'
        />
      </label>

      <button type='submit' className='category-submit'>Submit</button>
      <button type='reset' onClick={reset}>Reset</button>
      {serverMessage}
    </form>
  )
}