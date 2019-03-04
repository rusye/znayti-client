import React, { useState, useEffect } from 'react';
import './Categories.css';
import Search from './Search';
import NavBar from './NavBar';
import { normalizeResponseErrors } from '../functions/normalizeResponse';
const {API_BASE_URL} = require('../config');


export default function Categories(props) {
  const [categories, setCategories] = useState('');
  // 1. Get request for backend data
  const fetchCategories = async () => {
    const response = await fetch(`${API_BASE_URL}${props.location.pathname}${props.location.search}`)
    const normalize = await normalizeResponseErrors(response)
    const rcvdCategories = await normalize.json()
    let newArr = []
    rcvdCategories.forEach(category => newArr.push(category.charAt(0).toUpperCase() + category.slice(1)))
    setCategories(newArr)
    // How do make it wait for the response to finish and then do the if statement?
  }
  
  useEffect(
    () => {
      fetchCategories()
    }, []
  )

  const searchCategory = (e) => {
    e.preventDefault()
    let category = e.target.value.toLowerCase()
    console.log(`${API_BASE_URL}/${category}${props.location.pathname}${props.location.search}`)
    props.history.push(`${category}/search${props.location.search}`)
  }

  // 2. Display Results
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

  return (
    <div className='categories'>
      <NavBar />
      <Search {...props} />
      <div>
        <h2>{title}</h2>
        <div>{category}</div>
      </div>
    </div>
  );
}