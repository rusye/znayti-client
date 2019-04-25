import React, { useState, useEffect } from "react";
import "./BusinessesList.css";
import BusinessCard from "./BusinessCard";
import NavBar from "./NavBar";
import Search from "./Search";
import SubmitABusinessForm from "./SubmitABusinessForm";
import { normalizeResponseErrors } from "../functions/normalizeResponse";
const { API_BASE_URL } = require("../config");

export default function BusinessesList(props) {
  const [fetchingData, setFetchingData] = useState(true);
  const [businesses, setBusinesses] = useState([]);
  const [modal, setModal] = useState(false);
  const [serverMessage, setServerMessage] = useState("Fetching Data");

  const updateModal = e => {
    modal ? setModal(false) : setModal(true);
  };

  useEffect(() => {
    const fetchBusinesses = () => {
      return fetch(
        `${API_BASE_URL}${props.location.pathname}${props.location.search}`,
        {
          method: "GET"
        }
      )
        .then(res => normalizeResponseErrors(res))
        .then(res => {
          return res.json();
        })
        .then(rcvdBusinesses => {
          setBusinesses(rcvdBusinesses);
          setFetchingData(false);
        })
        .catch(err => {
          console.log(err);
          let message;
          if (err.code === 404) {
            message = err.message;
          } else if (err.code === 500) {
            message = "Internal server error";
          } else {
            message = "Something went wrong, please try again later";
          }
          setServerMessage(message);
        });
    };

    fetchBusinesses();
  }, [props.location.pathname, props.location.search]);

  const viewBusiness = e => {
    e.preventDefault();
    let businessId = e.target.id;
    props.history.push(`/business/${businessId}/${props.location.search}`);
  };

  return (
    <div className="componentLayout">
      <NavBar />
      <Search blur={modal ? true : false} {...props} />
      {modal ? <SubmitABusinessForm updateModal={updateModal} /> : null}

      {fetchingData ? (
        <h2>{serverMessage}</h2>
      ) : (
        <div className={`componentResults ${modal ? "blur" : null}`}>
          <h2>{props.match.params.category}</h2>
          {businesses.length > 0 ? (
            <ul>
              {businesses.map((business, index) => (
                <li key={index}>
                  <BusinessCard
                    business={business}
                    viewBusiness={viewBusiness}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <div>
              <span>No businesses in this area</span>
            </div>
          )}

          <button
            type="button"
            className="uxLink other light"
            onClick={updateModal}
          >
            Add A Business
          </button>
        </div>
      )}
    </div>
  );
}
