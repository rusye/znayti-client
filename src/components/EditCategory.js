import React, { useState } from "react";
import { API_BASE_URL } from "../config";
import { normalizeResponseErrors } from "../functions/normalizeResponse";
import SelectCategory from "./SelectCategory";

export default function EditCategory(props) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [submitDisable, setSubmitDisable] = useState(false);
  const [serverMessage, setServerMessage] = useState(null);

  const reset = () => {
    setName("");
    setCategory("");
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitDisable(true);

    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json"
    };

    return fetch(`${API_BASE_URL}/categories/${category}`, {
      method: "PUT",
      headers,
      body: JSON.stringify({
        id: category,
        name
      })
    })
      .then(res => normalizeResponseErrors(res))
      .then(res => {
        setServerMessage(null);
        reset();
        setSubmitDisable(false);
        setServerMessage("Category name successfully updated.");
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
    <form className="padding" onSubmit={handleSubmit}>
      <fieldset>
        <legend className="formTitle">Edit Category Name</legend>
        <SelectCategory
          {...props}
          category={category}
          setCategory={setCategory}
        />

        <label aria-label="category-name-input">
          New Name&nbsp;
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Category Name"
            type="text"
            name="category"
            pattern="^(\b[A-Z]\w*\s*)+.{2,}$"
            title="Please enter category name that is 3+ characters, first letters are capitalized"
            required
            aria-labelledby="category-name"
          />
        </label>

        <button
          type="submit"
          disabled={submitDisable}
          className="category-submit"
        >
          Submit
        </button>

        <button type="reset" onClick={reset}>
          Reset
        </button>

        {serverMessage ? <div>{serverMessage}</div> : null}
      </fieldset>
    </form>
  );
}
