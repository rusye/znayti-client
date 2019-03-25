import React from "react";
import "./Home.css";
import Search from "./Search";
import Header from "./Header";

export default function Home(props) {
  return (
    <div className="fullCentered">
      <Header />
      <Search {...props} />
    </div>
  );
}
