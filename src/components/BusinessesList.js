import React, { useState, useEffect } from 'react';
import './BusinessesList.css';
import BusinessCard from './BusinessCard'
import { normalizeResponseErrors } from '../functions/normalizeResponse';
const {API_BASE_URL} = require('../config');


export default function BusinessesList(props) {
  const [businesses, setBusinesses] = useState('');
  const [serverMessage, setServerMessage] = useState('Fetching Data');
  const [fetchingData, setFetchingData] = useState(true)

  const fetchCategory = () => {
    return fetch(`${API_BASE_URL}${props.location.pathname}${props.location.search}`, {
      method: 'GET'
    })
    .then(res => normalizeResponseErrors(res))
    .then(res => {
      return res.json();
    })
    .then(rcvdBusinesses => {
      setBusinesses(rcvdBusinesses)
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
        <h2>{serverMessage}</h2>
      </div>
      ) : (
        <div className='businesses'>
          <h2>{title}</h2>
          <div>{business}</div>
        </div>
      )
  );
}