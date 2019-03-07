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
    let newArr = []
    rcvdCategories.forEach(category => newArr.push(category.charAt(0).toUpperCase() + category.slice(1)))
    console.log('I made a fetch ')
    setCategories(newArr)
    setFetchingData(false)
  }
  
  useEffect(
    () => {
      fetchCategories()
    }, [props.location.search]
  )

  const searchCategory = (e) => {
    e.preventDefault()
    let category = e.target.value.toLowerCase()
    console.log(`${API_BASE_URL}/${category}${props.location.pathname}${props.location.search}`)
    props.history.push(`${category}/search${props.location.search}`)
  }

  let category;
  let title;
  if (categories.length > 0) {
    title = 'Categories';
    category = categories.map((category, index) => {
      return (
        <input type='button' id={category} onClick={searchCategory} key={index} value={category}></input>
      )
    })
  } else {
    title = 'No businesses in this area'
    category = 'Submit a business'
  }

  console.log('got new data')
  return (
    <div className='categories'>
      { fetchingData ? (
          <h2>Getting the data insert a spining wheel</h2>
        ) : (
          <div>
            <h2>{title}</h2>
            <div>{category}</div>
          </div> 
        )
      }
    </div>
  );
}