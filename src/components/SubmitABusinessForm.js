import React, { useState } from "react";
import { API_BASE_URL } from "../config";
import "./SubmitABusinessForm.css";
import { normalizeResponseErrors } from "../functions/normalizeResponse";

export default function SubmitABusinessForm(props) {
  const [replyTo, setReplyTo] = useState("");
  const [submitterName, setSubmitterName] = useState("");
  const [businessToAdd, setBusinessToAdd] = useState("");
  const [newBusinessAddress, setNewBusinessAddress] = useState("");
  const [newBusinessHours, setNewBusinessHours] = useState("");
  const [newBusinessTelephone, setNewBusinessTelephone] = useState("");
  const [comment, setComment] = useState("");
  const [serverMessage, setServerMessage] = useState(null);

  const reset = () => {
    setReplyTo("");
    setSubmitterName("");
    setBusinessToAdd("");
    setNewBusinessAddress("");
    setNewBusinessHours("");
    setNewBusinessTelephone("");
    setComment("");
  };

  const handleSubmit = e => {
    e.preventDefault();
    // disable submit button on click

    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json"
    };

    return fetch(`${API_BASE_URL}/emailsupport`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        //all the fields
        formID: "add",
        replyTo,
        submitterName,
        businessToAdd,
        newBusinessTelephone,
        newBusinessAddress,
        newBusinessHours,
        comment
      })
    })
      .then(res => normalizeResponseErrors(res))
      .then(res => {
        return res.json();
      })
      .then(res => {
        setServerMessage(null);
        reset();
        setServerMessage("Business succesfully submitted");
        setTimeout(() => {
          setServerMessage(null);
          props.updateModal();
          // enable the submit button
        }, 4000);
      })
      .catch(err => {
        console.log(err);
        //enable submit button if something is wrong
        let message = "Something went wrong, please try again later";
        setServerMessage(message);
        setTimeout(() => {
          setServerMessage(null);
        }, 5000);
      });
  };

  return (
    <section className="modal forms" aria-live="assertive">
      <form className="modal-content animate padding" onSubmit={handleSubmit}>
        <div className="imgcontainer">
          <span
            className="close"
            onClick={props.updateModal}
            title="Close Form"
          >
            &times;
          </span>
        </div>

        <fieldset>
          <legend className="formTitle">Submit A Business</legend>
          <label aria-label="your name">
            Your Name&nbsp;
            <input
              value={submitterName}
              onChange={e => setSubmitterName(e.target.value)}
              placeholder="enter your name"
              type="text"
              name="your-name"
              title="Enter your name"
              aria-labelledby="your-name"
              required
            />
          </label>

          <label aria-label="your email">
            Your Email&nbsp;
            <input
              value={replyTo}
              onChange={e => setReplyTo(e.target.value)}
              placeholder="enter your email"
              type="email"
              name="your-email"
              title="Enter your email so we can contact you example@email.com"
              aria-labelledby="your-name"
              required
            />
          </label>

          <label aria-label="business name">
            Business Name&nbsp;
            <input
              value={businessToAdd}
              onChange={e => setBusinessToAdd(e.target.value)}
              placeholder="enter business name"
              type="text"
              name="business-name"
              title="Please enter the business name"
              aria-labelledby="business-name"
              required
            />
          </label>

          <label aria-label="telephone-number">
            Business Telephone&nbsp;
            <input
              type="tel"
              value={newBusinessTelephone}
              onChange={e => setNewBusinessTelephone(e.target.value)}
              placeholder="5031239876"
              title="Please enter the business telephone number"
              name="telephone"
              aria-labelledby="telephone"
              required
            />
          </label>

          <label className="userTextare" aria-label="business address">
            Business Address&nbsp;
            <textarea
              rows={2}
              value={newBusinessAddress}
              onChange={e => setNewBusinessAddress(e.target.value)}
              placeholder="enter business address"
              type="text"
              name="business-address"
              title="Please enter the business address"
              aria-labelledby="business-address"
              required
            />
          </label>

          <label className="userTextare" aria-label="business hours">
            Business Hours&nbsp;
            <textarea
              rows={2}
              value={newBusinessHours}
              onChange={e => setNewBusinessHours(e.target.value)}
              placeholder="enter business operating hours"
              type="text"
              name="business-hours"
              title="Please enter the business operating hours"
              aria-labelledby="business-address"
              required
            />
          </label>

          <label className="userTextare" aria-label="comment">
            Comment&nbsp;
            <textarea
              rows={3}
              value={comment}
              onChange={e => setComment(e.target.value)}
              placeholder="Is there a specific person you want users to contact?  Any additional info you would like to add?"
              type="text"
              name="comment"
              title="Please enter any additional comments you might have"
              aria-labelledby="comment"
            />
          </label>
        </fieldset>

        {/* Make the spinning thing show up when they hit submit */}
        <button type="submit" className="add-business-submit">
          Submit
        </button>

        <button type="reset" onClick={reset}>
          Reset
        </button>

        {serverMessage ? <div>{serverMessage}</div> : null}
      </form>
    </section>
  );
}
