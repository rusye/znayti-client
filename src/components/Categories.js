import React, { useState, useEffect, useCallback } from "react";
import "./Categories.css";
import NavBar from "./NavBar";
import Search from "./Search";
import SubmitABusinessForm from "./SubmitABusinessForm";
import { normalizeResponseErrors } from "../functions/normalizeResponse";
const { API_BASE_URL } = require("../config");

export default function Categories(props) {
  const [fetchingData, setFetchingData] = useState(true);
  const [categories, setCategories] = useState("");
  const [title, setTitle] = useState(null);
  const [modal, setModal] = useState(false);
  const [serverMessage, setServerMessage] = useState(null);

  const updateModal = useCallback(
    e => {
      modal ? setModal(false) : setModal(true);
    },
    [modal]
  );

  const searchCategory = useCallback(
    e => {
      e.preventDefault();
      let category = e.target.value;
      props.history.push(`${category}/search${props.location.search}`);
    },
    [props.history, props.location.search]
  );

  useEffect(() => {
    const fetchCategories = () => {
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
        .then(rcvdCategories => {
          if (rcvdCategories.length > 0) {
            setTitle("Categories");
            setCategories(
              rcvdCategories.map((category, index) => {
                return (
                  <li key={index}>
                    <button
                      className="btn btn--border btn--primary btn--animated categoryButton"
                      type="button"
                      id={category}
                      onClick={searchCategory}
                      value={category}
                    >
                      {category}
                    </button>
                  </li>
                );
              })
            );
          } else {
            setTitle("No businesses in this area");
            setCategories(
              <li>
                <button
                  type="button"
                  className="uxLink other dark"
                  onClick={updateModal}
                >
                  Add A Business
                </button>
              </li>
            );
          }
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

    fetchCategories();
  }, [
    props.location.pathname,
    props.location.search,
    searchCategory,
    updateModal
  ]);

  return (
    <div className="componentLayout">
      <NavBar />
      <Search blur={modal ? true : false} {...props} />
      {modal ? <SubmitABusinessForm updateModal={updateModal} /> : null}

      {fetchingData ? (
        <h1 className="fontTwenty">
          {serverMessage ? serverMessage : "Fetching Data"}
        </h1>
      ) : (
        <div className={`componentResults${modal ? " blur" : ""}`}>
          <h1>{title}</h1>
          <ul>{categories}</ul>
        </div>
      )}
    </div>
  );
}
