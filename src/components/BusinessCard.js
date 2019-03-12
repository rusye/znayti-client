import React from 'react';
import './BusinessCard';


export default function BusinessCard(props) {
  return (
    <div className='listedBusinesses' key={props.business.id}>
      <h3>{props.business.name}</h3>
      <div className='location'>
        {props.business.city}
        {props.business.state}
      </div>
      <button type='button' id={props.business.id} key={props.business.id} onClick={props.viewBusiness}>View Business</button>
    </div>
  );
}