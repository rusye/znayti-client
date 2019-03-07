import React, {useState} from 'react';
import { API_BASE_URL } from '../config';
import { Redirect } from 'react-router-dom';
import './AdminLogin.css';


export default function AdminLogin(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  let errorMessage;
  // Reword this auth stuff
  // if(authError && username.length > 0 ){
  //   errorMessage = <p>Login Failed. Check your credentials and resubmit.</p>
  //   setInterval(function(){ localStorage.removeItem('error') }, 2000);
  // } else if (localStorage.error){
  //   errorMessage = <p>Login Failed. Check your credentials and resubmit.</p>
  //   setInterval(function(){ localStorage.removeItem('error') }, 2000);
  // } else {
  //   errorMessage = <p></p>
  // }

  const handleErrors = (response) => {
    console.log(response)
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

  const handleSubmit = e => {
    e.preventDefault(e);

    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }

    return (fetch(`${API_BASE_URL}/api/auth/bigboss/login`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        username,
        password
      })
    }))
    // .then(res => handleErrors(res))
    .then(res => {
      return res.json();
    })
    .then(res => {
      localStorage.setItem("user", username);
      localStorage.setItem("authToken", res.authToken);
      localStorage.setItem("loggedIn", true);
    })
    .catch(err => {
      console.log(err)
      const { code } = err;
      const message = code === 401 ? 'Incorrect username or password' : 'Unable to login, please try again';
      console.log(message)
      
      return Promise.reject(
        new Error({
          _error: message
        })
      )
    })
  };

  return (
    <section className='login-container'>
      {errorMessage}
      {
        localStorage.loggedIn ? (
          <Redirect to='/dashboard' />
        ) : (
          <section className='login'>
            <form className='login-form'
              onSubmit={handleSubmit}
            >
              <input
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder='enter username'
                type='text'
                name='username'
                pattern='[A-Za-z0-9_]{1,15}'
                title='Username should only contain letters, numbers and underscores; no more than 15 characters e.g. Jojo_123'
                id='login-username'
                required
                aria-labelledby='login-username'
              />

              <input
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder='enter password'
                type='password'
                name='password'
                pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$' 
                title='Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters'
                required
                id='login-password'
                aria-labelledby='login-password'
              />

              <button type='submit' className='login-submit'>
                Submit
              </button>
              {/* <Button /> */}
            </form>
        </section>
        )
      }
  </section>
  );
}