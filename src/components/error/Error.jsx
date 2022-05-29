import React from "react";
import { Link } from "react-router-dom";
import "./error.css";

function Error() {
  return (
    <>
      <div className="erorrPageMessage">
        <img src="../images/erorr.png"></img>
        <br></br>
        <p> Pristup nije dozvoljen neautentifikovanim korisnicima.</p>
        <br></br>
        <Link className="btn-error" to={"/"}>
          Nazad na početnu stranicu
        </Link>
      </div>
    </>
  );
}

export default Error;
