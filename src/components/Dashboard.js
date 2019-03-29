import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { API_BASE_URL } from "../config";
import { normalizeResponseErrors } from "../functions/normalizeResponse";
import "./Dashboard.css";
import NavBar from "./NavBar";
import AddCategory from "./AddCategory";
import AddAdminUser from "./AddAdminUser";
import AddBusiness from "./AddBusiness";
import EditCategory from "./EditCategory";
import DeleteCategory from "./DeleteCategory";

export default function Dashboard() {
  const [categories, setCategories] = useState("");
  const [serverMessage, setServerMessage] = useState(null);
  const [triggerFetch, setTriggerFetch] = useState(1);

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

  const collapsible = () => {
    const coll = document.getElementsByClassName("collapsible");

    for (let i = 0; i < coll.length; i++) {
      coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        let content = this.nextElementSibling;
        if (content.style.height) {
          content.style.height = null;
        } else {
          content.style.height = "100%"
        }
      });
    }
  };

  useEffect(() => {
    collapsible();
  }, []);

  return !localStorage.loggedIn ? (
    <Redirect to="/bigboss/login" />
  ) : (
    <>
      <NavBar />
      <section className="fullCentered componentLayout">
        <button className="collapsible">Add Category</button>
        <div className="content white">
          <AddCategory updateCategories={updateCategories} />
        </div>

        <button className="collapsible">Add Business</button>
        <div className="content white">
          <AddBusiness categories={categories} />
        </div>

        <button className="collapsible">Add Admin User</button>
        <div className="content white">
          <AddAdminUser />
        </div>

        <button className="collapsible">Edit Category</button>
        <div className="content white">
          <EditCategory categories={categories} onChange={setTriggerFetch} />
        </div>

        <button className="collapsible">Delete Category</button>
        <div className="content white">
          <DeleteCategory categories={categories} onChange={setTriggerFetch} />
        </div>

        {serverMessage}
      </section>
    </>
  );
}
