import React, { useState, useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";
import "./navbar.css";

function Navbar(props) {
  const [toggleMenu, setToggleMenu] = useState(false);
  const toggleNav = () => {
    setToggleMenu(!toggleMenu);
  };
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", changeWidth);
  }, []);
  return (
    <nav className="slide-left">
      {(toggleMenu || screenWidth > 500) && (
        <ul className="list">
          <li className="items">
            <Link to={"/"}>POČETNA</Link>
          </li>
          <li className="items">
            {props.isLoggedIn ? <Link to={"/knjige"}>KNJIGE</Link> : ""}
          </li>
          <li className="items">
            {props.isLoggedIn ?  <Link to={"/korisnici"}>ČLANOVI</Link> : ""}
          </li>
          <li className="items">
            {props.isLoggedIn ? (
               <Link to={"/iznajmljivanja"}>IZNAJLJIVANJA</Link>
            ) : (
              ""
            )}
          </li>
          <li className="items">
            {props.isLoggedIn ?  <Link to={"/statistika"}>STATISTIKA</Link> : ""}
          </li>
          <li className="items">
            {props.isLoggedIn ? (

              <Link to={"/"} onClick={props.logout}>  ODJAVA</Link>
            ) : (
              ""
            )}
          </li>
        </ul>
      )}

      <button onClick={toggleNav} className="btn">
        <AiOutlineMenu></AiOutlineMenu>
      </button>
    </nav>
  );
}

export default Navbar;
