import React, {useState} from 'react';

export default function AddCategory() {
  const [categoryName, setCategoryName] = useState('');
  return(
    <form className='login-form' // onSubmit={handleSubmit} 
    >
    <label htmlFor='category-name' aria-label='category-name-input'>Category Name</label>
      <input
        value={categoryName}
        onChange={e => setCategoryName(e.target.value)}
        placeholder='enter category name'
        type='text'
        name='categoryName'
        pattern='[A-Za-z0-9_]{1,15}'
        title='Please enter a desired category name'
        id='category-name'
        required
        aria-labelledby='category-name'
      />

      <button type='submit' className='category-submit'>
        Submit
      </button>
    </form>
  )
}