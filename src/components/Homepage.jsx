

import React from "react";
import { Link } from "react-router-dom";
import "../componentcss/Homepage.css";

function Homepage() {
  return (
    <div className="homepage-container">
      <h1>Student marks menagement</h1>
      <div className="homepage-links">
        <p>Already have an account?</p>
        <Link to="/login">Login</Link>
      </div>
      <div className="homepage-links">
        <p>Need to create an account?</p>
        <Link to="/register">Register</Link>
      </div>
    </div>
  );
}

export default Homepage;
