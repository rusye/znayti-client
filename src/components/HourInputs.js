import React, { useState, useEffect } from "react";

export default function HourInput(props) {
  const [open, setOpen] = useState(props.open || "");
  const [close, setClose] = useState(props.close || "");

  const handleUpdate = () => {
    if (open === "" || close === "") {
      props.onChange(props.name, { open: "", close: "" });
    } else {
      props.onChange(props.name, { open, close });
    }
  };

  useEffect(() => {
    handleUpdate();
  }, [open, close]);

  return (
    <>
      <legend>{props.name}&nbsp;</legend>
      <label className="displayInline" aria-label="select-open-time">
        Open&nbsp;
        <input
          className="hourDisplay"
          type="time"
          value={open}
          onChange={e => setOpen(e.target.value)}
          name="open-time"
          title="Please enter open time"
          aria-labelledby="open-time"
        />
      </label>
      <label className="displayInline" aria-label="select-close-time">
        Close&nbsp;
        <input
          className="hourDisplay"
          type="time"
          value={close}
          onChange={e => setClose(e.target.value)}
          name="close-time"
          title="Please enter close time"
          aria-labelledby="close-time"
        />
      </label>
    </>
  );
}
