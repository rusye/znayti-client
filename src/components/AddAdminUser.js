import React, {useState} from 'react';

export default function AddAdminUser() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const [error, setError] = useState(null);
  
  return(
    <form className='add-admin-user-form' // onSubmit={handleSubmit} 
    >
      <label htmlFor='username' aria-label='username-input'>Username</label>
      <input
        value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder='enter username'
        type='text'
        name='username'
        pattern='[A-Za-z0-9_]{1,15}'
        title='Please enter a desired username'
        id='username'
        required
        aria-labelledby='username'
      />

      <label htmlFor='password' aria-label='password-input'>Password</label>
      <input
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder='enter password'
        type='password'
        name='password'
        // pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$' 
        title='Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters'
        required
        id='login-password'
        aria-labelledby='login-password'
      />

      <button type='submit' className='add-user-admin-submit'>
        Submit
      </button>
    </form>
  )
}