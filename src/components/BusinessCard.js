import React from "react";
import "./BusinessCard.css";

export default function BusinessCard(props) {
  return (
    <div
      className="businessCardBefore"
      id={props.business.id}
      key={props.business.id}
      onClick={props.viewBusiness}
    >
      <div className="btn btn--border btn--primary btn--animated businessCard">
        <h2>{props.business.name}</h2>
        {props.business.contactName ? (
          <span className="contactName">{props.business.contactName}</span>
        ) : null}
        <span className="location">
          {props.business.city}, &nbsp;{props.business.state}
        </span>
      </div>
    </div>
  );
}
