import React, { useState, useEffect } from 'react';
import './Categories.css';
import { normalizeResponseErrors } from '../functions/normalizeResponse';
const {API_BASE_URL} = require('../config');


export default function Categories(props) {
  const [categories, setCategories] = useState('');
  const [serverMessage, setServerMessage] = useState('Fetching Data');
  const [fetchingData, setFetchingData] = useState(true);

  const fetchCategories = () => {
    return fetch(`${API_BASE_URL}${props.location.pathname}${props.location.search}`, {
      method: 'GET'
    })
    .then(res => normalizeResponseErrors(res))
    .then(res => {
      return res.json();
    })
    .then(rcvdCategories => {
      if (rcvdCategories.length > 0) {
        title = 'Categories';
        setCategories(rcvdCategories.map((category, index) => {
          return (
            <button type='button' id={category} onClick={searchCategory} key={index} value={category}>{category}</button>
          )
        }))
      } else {
        title = 'No businesses in this area'
        setCategories('Submit a business')
      }
      setFetchingData(false)
    })
    .catch(err => {
      console.log(err)
      let message;
      if (err.code === 404) {
        message = err.message;
      } else if (err.code === 500) {
        message = 'Internal server error';
      } else {
        message = 'Something went wrong, please try again later';
      }
      setServerMessage(message)
    })
  }
  
  useEffect(
    () => {
      fetchCategories()
    }, [props.location.search]
  )

  const searchCategory = (e) => {
    e.preventDefault()
    let category = e.target.value
    props.history.push(`${category}/search${props.location.search}`)
  }

  let title;

  return (
    fetchingData ? (
      <div className='categories'>
        <h2>{serverMessage}</h2>
      </div>
    ) : (
      <div className='categories'>
        <h2>{title}</h2>
        <div>{categories}</div>
      </div> 
    )
  );
}