import React, { useState, useEffect } from "react";

export default function SelectCategory(props) {
  const [categories, setCategories] = useState("");
  const [select, setSelect] = useState("");

  useEffect(() => {
    const populateCategories = () => {
      if (props.categories.length > 0) {
        setSelect("-- select a category --");
        setCategories(
          props.categories.map((categoryDetails, index) => {
            return (
              <option key={index} value={categoryDetails.id}>
                {categoryDetails.name}
              </option>
            );
          })
        );
      } else {
        setSelect("Create a category");
      }
    };

    populateCategories();
  }, [props.categories]);

  return (
    <label aria-label="select-category">
      Select Category&nbsp;
      <select
        value={props.category}
        onChange={e => props.setCategory(e.target.value)}
        required
      >
        <option disabled={true} value="">
          {select}
        </option>
        {categories}
      </select>
    </label>
  );
}
