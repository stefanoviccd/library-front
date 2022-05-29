import React from "react";
import { Link } from "react-router-dom";
import "./notFound.css";

function NotFound() {
  return (
    <>
      <div className="notFoundPageMessage">
        <img src="../images/404.jpg"></img>
        <br></br>
        <p>ERROR 404</p>
        <p className="notfound">Stranica nije pronadjena</p>
        <br></br>

      </div>
    </>
  );
}

export default NotFound;
