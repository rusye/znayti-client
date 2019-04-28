import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { API_BASE_URL } from "../config";
import { normalizeResponseErrors } from "../functions/normalizeResponse";
import "./Dashboard.css";
import plusIcon from "../images/plus.svg";
import minusIcon from "../images/minus.svg";
import NavBar from "./NavBar";
import AddCategory from "./AddCategory";
import AddAdminUser from "./AddAdminUser";
import AddBusiness from "./AddBusiness";
import EditCategory from "./EditCategory";
import DeleteCategory from "./DeleteCategory";

export default function Dashboard() {
  const [categories, setCategories] = useState("");
  const [displayAddCategory, setDisplayAddCategory] = useState(false);
  const [displayAddBusiness, setDisplayAddBusiness] = useState(false);
  const [displayAddAdminUser, setDisplayAddAdminUser] = useState(false);
  const [displayEditCategory, setDisplayEditCategory] = useState(false);
  const [displayDeleteCategory, setDisplayDeleteCategory] = useState(false);
  const [serverMessage, setServerMessage] = useState(null);
  const [triggerFetch, setTriggerFetch] = useState(1);

  document.activeElement.blur();

  const fetchCategories = () => {
    return fetch(`${API_BASE_URL}/categories`, {
      method: "GET"
    })
      .then(res => normalizeResponseErrors(res))
      .then(res => {
        return res.json();
      })
      .then(rcvdCategories => {
        setServerMessage(null);
        if (rcvdCategories.length > 0) {
          setCategories(rcvdCategories);
        }
      })
      .catch(err => {
        setServerMessage("Unable to connect to server");
      });
  };

  const updateCategories = newCategory => {
    setCategories([...categories, newCategory]);
  };

  useEffect(() => {
    if (localStorage.loggedIn) {
      fetchCategories();
    }
  }, [triggerFetch]);

  return !localStorage.loggedIn ? (
    <Redirect to="/bigboss/login" />
  ) : (
    <>
      <NavBar />
      <section className="fullCentered componentLayout">
        <button
          className="collapsible"
          onClick={() =>
            displayAddCategory
              ? setDisplayAddCategory(false)
              : setDisplayAddCategory(true)
          }
        >
          Add Category
          <img
            className="plusMinusIcon"
            src={displayAddCategory ? minusIcon : plusIcon}
            alt="toggle sign"
          />
        </button>
        {displayAddCategory ? (
          <div className="content">
            <AddCategory updateCategories={updateCategories} />
          </div>
        ) : null}

        <button
          className="collapsible"
          onClick={() =>
            displayAddBusiness
              ? setDisplayAddBusiness(false)
              : setDisplayAddBusiness(true)
          }
        >
          Add Business
          <img
            className="plusMinusIcon"
            src={displayAddBusiness ? minusIcon : plusIcon}
            alt="toggle sign"
          />
        </button>
        {displayAddBusiness ? (
          <div className="content">
            <AddBusiness categories={categories} />
          </div>
        ) : null}

        <button
          className="collapsible"
          onClick={() =>
            displayAddAdminUser
              ? setDisplayAddAdminUser(false)
              : setDisplayAddAdminUser(true)
          }
        >
          Add Admin User
          <img
            className="plusMinusIcon"
            src={displayAddAdminUser ? minusIcon : plusIcon}
            alt="toggle sign"
          />
        </button>
        {displayAddAdminUser ? (
          <div className="content">
            <AddAdminUser />
          </div>
        ) : null}

        <button
          className="collapsible"
          onClick={() =>
            displayEditCategory
              ? setDisplayEditCategory(false)
              : setDisplayEditCategory(true)
          }
        >
          Edit Category
          <img
            className="plusMinusIcon"
            src={displayEditCategory ? minusIcon : plusIcon}
            alt="toggle sign"
          />
        </button>
        {displayEditCategory ? (
          <div className="content">
            <EditCategory categories={categories} onChange={setTriggerFetch} />
          </div>
        ) : null}

        <button
          className="collapsible"
          onClick={() =>
            displayDeleteCategory
              ? setDisplayDeleteCategory(false)
              : setDisplayDeleteCategory(true)
          }
        >
          Delete Category
          <img
            className="plusMinusIcon"
            src={displayDeleteCategory ? minusIcon : plusIcon}
            alt="toggle sign"
          />
        </button>
        {displayDeleteCategory ? (
          <div className="content">
            <DeleteCategory
              categories={categories}
              onChange={setTriggerFetch}
            />
          </div>
        ) : null}

        {serverMessage ? <div>{serverMessage}</div> : null}
      </section>
    </>
  );
}
