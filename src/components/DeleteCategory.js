import React, { useState } from "react";
import { API_BASE_URL } from "../config";
import { normalizeResponseErrors } from "../functions/normalizeResponse";
import SelectCategory from "./SelectCategory";

export default function DeleteCategory(props) {
  const [category, setCategory] = useState("");
  const [submitDisable, setSubmitDisable] = useState(false);
  const [serverMessage, setServerMessage] = useState(null);

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitDisable(true);

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
        setSubmitDisable(false);
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
        setSubmitDisable(false);
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

      <button type="submit" disabled={submitDisable} className="delete-submit">
        Delete
        {submitDisable ? (
          <div className="lds-ring dark-ring">
            <div />
            <div />
            <div />
            <div />
          </div>
        ) : null}
      </button>

      {serverMessage ? <div>{serverMessage}</div> : null}
    </form>
  );
}
