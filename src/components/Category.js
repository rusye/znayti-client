import React, { useState, useEffect } from 'react';
import './Category.css';
import Search from './Search';
import NavBar from './NavBar';
import { normalizeResponseErrors } from '../functions/normalizeResponse';
const {API_BASE_URL} = require('../config');


export default function Businesses(props) {
  const [businesses, setBusinesses] = useState('');
  const [catName, setCatName] = useState('');
  // 1. Get request for backend data
  const fetchCategory = async () => {
    const response = await fetch(`${API_BASE_URL}${props.location.pathname}${props.location.search}`)
    const normalize = await normalizeResponseErrors(response)
    const rcvdBusinesses = await normalize.json()
    // let newArr = []
    console.log(rcvdBusinesses)
    // rcvdBusinesses.forEach(category => newArr.push(category.charAt(0).toUpperCase() + category.slice(1)))
    setBusinesses(rcvdBusinesses)
    // How do make it wait for the response to finish and then do the if statement?
  }
  
  useEffect(
    () => {
      fetchCategory()
    }, []
  )
  // 2. Display Results
  let business;
  let title;
  if (businesses.length > 0) {
    title = 'Businesses';
    business = businesses.map((business, index) => {
      return (
        <div id={business.id} key={index}>
        
        </div>
      )
    })
  } else {
    title = 'No businesses in this area'
    business = 'Submit a business'
  }

  
  // 3. Handle click on category

  return (
    <div className='businesses'>
      <NavBar />
      <Search {...props} />
      <div>
      <h2>{title}</h2>
      {/* Div will show up even if empty */}
      <div>{business}</div>
      </div>
    </div>
  );
}