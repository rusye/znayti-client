import React, { useState } from "react";
import { API_BASE_URL } from "../config";
import "./SubmitABusinessForm.css";
import { normalizeResponseErrors } from "../functions/normalizeResponse";

export default function SubmitAnEditForm(props) {
  const [replyTo, setReplyTo] = useState("");
  const [submitterName, setSubmitterName] = useState("");
  const [comment, setComment] = useState("");
  const [submitDisable, setSubmitDisable] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverMessage, setServerMessage] = useState(null);

  const reset = () => {
    setReplyTo("");
    setSubmitterName("");
    setComment("");
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitDisable(true);

    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json"
    };

    return fetch(`${API_BASE_URL}/emailsupport`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        formID: "edit",
        replyTo,
        submitterName,
        businessToEdit: props.businessName,
        businessID: props.businessId,
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
        setSubmitDisable(false);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          props.updateEditModal();
        }, 3000);
      })
      .catch(err => {
        console.log(err);
        let message = "Something went wrong, please try again later";
        setSubmitDisable(false);
        setServerMessage(message);
        setTimeout(() => {
          setServerMessage(null);
        }, 5000);
      });
  };

  return (
    <section className="modal forms" aria-live="assertive">
      <div className="modal-content animate padding">
        {!success ? (
          <form onSubmit={handleSubmit}>
            <div className="imgcontainer">
              <span
                className="close"
                onClick={props.updateEditModal}
                title="Close Form"
              >
                &times;
              </span>
            </div>

            <fieldset>
              <legend className="formTitle">Submit An Edit</legend>
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

              <label className="userTextare" aria-label="comment">
                Comment&nbsp;
                <textarea
                  rows={4}
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  placeholder="What would you like to be updated for this business?"
                  type="text"
                  name="comment"
                  title="Please enter what you would like to be edited"
                  aria-labelledby="comment"
                  required
                />
              </label>
            </fieldset>

            {/* Make the spinning thing show up when they hit submit */}
            <button
              type="submit"
              disabled={submitDisable}
              className="uxLink other"
            >
              Submit
            </button>

            {serverMessage ? <div>{serverMessage}</div> : null}
          </form>
        ) : (
          <p>Business succesfully submitted</p>
        )}
      </div>
    </section>
  );
}
