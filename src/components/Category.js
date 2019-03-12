import React, { useState, useEffect } from 'react';
import './Category.css';
import BusinessCard from './BusinessCard'
import { normalizeResponseErrors } from '../functions/normalizeResponse';
const {API_BASE_URL} = require('../config');


export default function Businesses(props) {
  const [businesses, setBusinesses] = useState('');
  const [fetchingData, setFetchingData] = useState(true)

  const fetchCategory = async () => {
    const response = await fetch(`${API_BASE_URL}${props.location.pathname}${props.location.search}`)
    const normalize = await normalizeResponseErrors(response)
    const rcvdBusinesses = await normalize.json()
    setBusinesses(rcvdBusinesses)
    setFetchingData(false)
  }
  
  useEffect(
    () => {
      fetchCategory()
    }, []
  )

  const viewBusiness = (e) => {
    e.preventDefault()
    let businessId = e.target.id
    props.history.push(`/business/${businessId}`)
  }

  let business;
  let title;
  if (businesses.length > 0) {
    title = 'Businesses';
    business = businesses.map((business, index) => <BusinessCard business={business} key={business.id} viewBusiness={viewBusiness}/>)
  } else {
    title = 'No businesses in this area'
    business = 'Submit a business'
  }

  return (
    fetchingData ? (
      <div className='businesses'>
        <h2>Getting the data insert a spining wheel</h2>
      </div>
      ) : (
        <div className='businesses'>
          <h2>{title}</h2>
          <div>{business}</div>
        </div>
      )
  );
}