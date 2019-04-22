import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "../config";
import "./SubmitABusinessForm.css";
import { normalizeResponseErrors } from "../functions/normalizeResponse";
import { customeValidationMessage } from "../functions/customeValidationMessage";

export default function SubmitABusinessForm(props) {
  const [replyTo, setReplyTo] = useState("");
  const [submitterName, setSubmitterName] = useState("");
  const [businessToAdd, setBusinessToAdd] = useState("");
  const [newBusinessAddress, setNewBusinessAddress] = useState("");
  const [newBusinessHours, setNewBusinessHours] = useState("");
  const [newBusinessTelephone, setNewBusinessTelephone] = useState("");
  const [comment, setComment] = useState("");
  const [submitDisable, setSubmitDisable] = useState(false);
  const [success, setSuccess] = useState(false);
  const [integerOne, setIntegerOne] = useState("");
  const [integerTwo, setIntegerTwo] = useState("");
  const [sum, setSum] = useState("");
  const [captchaResponse, setCaptchaResponse] = useState("");
  const [wrongResponse, setWrongResponse] = useState(false);
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

  const getRandomInt = () => {
    setIntegerOne(Math.floor(Math.random() * Math.floor(31)));
    setIntegerTwo(Math.floor(Math.random() * Math.floor(31)));
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitDisable(true);
    setWrongResponse(false);
    setServerMessage(null);

    if (sum === captchaResponse) {
      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json"
      };

      return fetch(`${API_BASE_URL}/emailsupport`, {
        method: "POST",
        headers,
        body: JSON.stringify({
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
          setSubmitDisable(false);
          setSuccess(true);
          setTimeout(() => {
            setSuccess(false);
            props.updateModal();
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
    } else {
      setSubmitDisable(false);
      setWrongResponse(true);
      setServerMessage("You've entered the wrong answer");
      setTimeout(() => {
        setServerMessage(null);
      }, 5000);
    }
  };

  useEffect(() => {
    getRandomInt();
    customeValidationMessage();
  }, []);

  useEffect(() => {
    setSum(`${integerOne + integerTwo}`);
  }, [captchaResponse]);

  return (
    <section className="modal forms" aria-live="assertive">
      <div className="modal-content animate padding">
        {!success ? (
          <form onSubmit={handleSubmit}>
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
              <legend className="formTitle">Add A Business</legend>
              <label aria-label="your name">
                Your Name&nbsp;
                <input
                  value={submitterName}
                  onChange={e => setSubmitterName(e.target.value)}
                  placeholder="enter your name"
                  type="text"
                  name="your-name"
                  title="Please enter your name"
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
                  title="Enter your email so we can contact you"
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
                Business Address
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
                Business Hours
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
                Comment (Optional)
                <textarea
                  rows={3}
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  placeholder="Is there a specific person you want users to contact?  Any additional info you would like to add?"
                  type="text"
                  name="comment"
                  title="Enter any additional comments you might have"
                  aria-labelledby="comment"
                />
              </label>
            </fieldset>

            <p>
              {integerOne}+{integerTwo}=
              <input
                className={`captchaResponse ${
                  wrongResponse ? "wrongResponse" : null
                }`}
                value={captchaResponse}
                onChange={e => setCaptchaResponse(e.target.value)}
                type="text"
                name="your-answer"
                title="Enter your answer"
                aria-labelledby="your-answer"
                autoComplete="off"
                size={3}
                required
              />
            </p>

            <button
              type="submit"
              disabled={submitDisable}
              className="uxLink other"
            >
              Submit
              {submitDisable ? (
                <div className="lds-ring">
                  <div />
                  <div />
                  <div />
                  <div />
                </div>
              ) : null}
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
