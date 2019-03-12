import React, { useState, useEffect } from 'react';
import './Categories.css';
import { normalizeResponseErrors } from '../functions/normalizeResponse';
const {API_BASE_URL} = require('../config');


export default function Categories(props) {
  const [categories, setCategories] = useState('');
  const [fetchingData, setFetchingData] = useState(true);

  const fetchCategories = async () => {
    setFetchingData(true)
    const response = await fetch(`${API_BASE_URL}${props.location.pathname}${props.location.search}`)
    const normalize = await normalizeResponseErrors(response)
    const rcvdCategories = await normalize.json()
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
    console.log('I made a fetch ')
    setFetchingData(false)
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

  console.log('got new data')
  return (
    fetchingData ? (
      <div className='categories'>
        <h2>Getting the data insert a spining wheel</h2>
      </div>
    ) : (
      <div className='categories'>
        <h2>{title}</h2>
        <div>{categories}</div>
      </div> 
    )
  );
}