import React from "react";
import "./About.css";
import NavBar from "./NavBar";

export default function About() {
  return (
    <div className="fullCentered about">
      <NavBar />
      <span>Our Mission:</span>
      <span>
        Helping you connect with a business that can communicate with you in
        Russian.
      </span>

      <h1>About Znayti</h1>
      <p>
        Znayti was founded because of the frustration that ensued after trying
        to locate a body shop but all we had to go off was word of mouth and no
        one had the phone number of the business on hand without having to call
        around. Currently we are focused on serving Portland, OR.
      </p>

      <h2>Current Goal</h2>
      <p>
        We are currently creating a directory of businesses in the Portland, OR
        area that have a Russian speaker on staff.
      </p>

      <h2>Next Goal</h2>
      <p>
        Add a map that that will show you all the listings within a category.
      </p>
    </div>
  );
}
