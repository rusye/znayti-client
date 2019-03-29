import React from "react";
import "./BusinessCard.css";

export default function BusinessCard(props) {
  return (
    <button
      className="businessCard"
      type="button"
      id={props.business.id}
      key={props.business.id}
      onClick={props.viewBusiness}
    >
      <h3 id={props.business.id}>{props.business.name}</h3>
      {props.business.contactName ? <span id={props.business.id} className='contactName' >{props.business.contactName}</span> : null }
      <span id={props.business.id} className="location">
        {props.business.city}, &nbsp;{props.business.state}
      </span>
    </button>
  );
}
