import React, {useState} from 'react';
import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from '../functions/normalizeResponse';

export default function AddAdminUser() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [serverMessage, setServerMessage] = useState(null);

  const reset = () => {
    setFirstName('')
    setLastName('')
    setUsername('')
    setPassword('')
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    return (fetch(`${API_BASE_URL}/api/users/`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        firstName,
        lastName,
        username,
        password,
        'admin': true
      })
    }))
    .then(res => normalizeResponseErrors(res))
    .then(res => {
      return res.json();
    })
    .then(res => {
      setServerMessage(null);
      reset()
      setServerMessage(`${res.username} succesfully added`)
      setInterval(() => { setServerMessage(null) }, 4000)
    })
    .catch(err => {
      let message;
      if (err.code === 422) {
        message = err.message;
        } else if (err.code === 500) {
          message = 'Internal server error';
        } else {
          message = 'Something went wrong, please try again later';
        }
      localStorage.setItem('serverMessage', message)
      setServerMessage(message)
      setInterval(() => { setServerMessage(null) }, 5000)
    })
  };
  
  return(
    <form id='newAdmin' className='add-admin-user-form' onSubmit={handleSubmit}>
      <label htmlFor='first-name' aria-label='username-input'>First Name</label>
      <input
        value={firstName}
        onChange={e => setFirstName(e.target.value)}
        placeholder='enter first name'
        type='text'
        name='first-name'
        pattern='[A-Za-z]{1,35}'
        title='Please enter first name'
        id='first-name'
        aria-labelledby='first-name'
      />

      <label htmlFor='last-name' aria-label='username-input'>Last Name</label>
      <input
        value={lastName}
        onChange={e => setLastName(e.target.value)}
        placeholder='enter last name'
        type='text'
        name='last-name'
        pattern='[A-Za-z]{1, 35}'
        title='Please enter last name'
        id='last-name'
        aria-labelledby='last-name'
      />


      <label htmlFor='username' aria-label='username-input'>Username</label>
      <input
        value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder='enter username'
        type='text'
        name='username'
        pattern='[A-Za-z0-9_]{4,35}'
        title='Please enter a desired username, must be min of 4 characters and max of 35'
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
        // pattern='^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$' 
        title='Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters'
        required
        id='login-password'
        aria-labelledby='login-password'
      />

      <button type='submit' className='add-user-admin-submit'>Submit</button>
      <button type="reset" onClick={reset}>Reset</button>
      {serverMessage}
    </form>
  )
}