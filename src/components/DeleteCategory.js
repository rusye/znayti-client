import React, { useState } from "react";
import { API_BASE_URL } from "../config";
import { normalizeResponseErrors } from "../functions/normalizeResponse";
import SelectCategory from "./SelectCategory";

export default function DeleteCategory(props) {
  const [category, setCategory] = useState("");
  const [serverMessage, setServerMessage] = useState(null);

  const handleSubmit = e => {
    e.preventDefault();

    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json"
    };

    return fetch(`${API_BASE_URL}/categories/${category}`, {
      method: "DELETE",
      headers,
      body: JSON.stringify({
        id: category
      })
    })
      .then(res => normalizeResponseErrors(res))
      .then(res => {
        setServerMessage(null);
        setCategory("");
        setServerMessage("Category was successfully deleted.");
        setTimeout(() => {
          setServerMessage(null);
          props.onChange(Math.random());
        }, 4000);
      })
      .catch(err => {
        console.log(err);
        let message;
        if (err.code === 422 || 400) {
          message = err.message;
        } else if (err.code === 500) {
          message = "Internal server error";
        } else {
          message = "Something went wrong, please try again later";
        }
        setServerMessage(message);
      });
  };

  return (
    <form
      className="padding "
      onSubmit={e => {
        if (window.confirm("Are you sure you want to delete this business?"))
          handleSubmit(e);
      }}
    >
      <fieldset>
        <legend className="formTitle">Delete A Category</legend>
        <SelectCategory
          {...props}
          category={category}
          setCategory={setCategory}
        />
      </fieldset>

      <button type="submit" className="delete-submit">
        Delete
      </button>

      {serverMessage ? <div>{serverMessage}</div> : null}
    </form>
  );
}
