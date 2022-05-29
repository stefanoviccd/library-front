import React from "react";
import "./users.css";
import { FiMoreHorizontal } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import { GrNext, GrPowerReset, GrPrevious } from "react-icons/gr";

import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import LibrarianMemberService from "../../services/LibrarianMemberService";

function Users(props) {
  const [search, setSearch] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [currentPage, setCurrentPage]=useState(1);
const [usersPerPage, setUsersPerPage]=useState(10);
const goPrevious=function(e){
  e.preventDefault();
  if(currentPage===1) return;
  else{
    setCurrentPage(currentPage-1)
    console.log(currentPage)

  }
}
const goNext=function(e){
  e.preventDefault();
  const maxPageNumber=props.users.length/usersPerPage;
  if(currentPage+1>Math.ceil(maxPageNumber)) return;
  setCurrentPage(currentPage+1);
  console.log(currentPage)
  return;
}

  function showMessage() {
    //  document.getElementById(elementId).style.visibility = "visible";
    setErrorMessage(true);
    setTimeout(function () {
      setErrorMessage(false);
    }, 2000);
  }
  const renderErrorMessage = (message) => (
    <div className="error-msg-books">{errorMessage && message}</div>
  );
  useEffect(() => {
    props.getAllUsers();
  }, []);
  const resetSearch = (e) => {
    e.preventDefault();
    console.log("Reset search")
    props.getAllUsers();
  };
  const deleteUser = (id) => {
    console.log("Brisanje");
    LibrarianMemberService.deleteUser(id)
      .then((response) => {
        if (response.data.responseException == null) {
          props.getAllUsers();
        } else {
          console.log(response.data.responseException);
          setMessage(response.data.responseException.message)
          showMessage()

        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const indexOfLastUser=usersPerPage*currentPage;
const indexOfFirstUser= indexOfLastUser-usersPerPage;
const currentUsers=props.users.slice(indexOfFirstUser, indexOfLastUser);
  return (
    <>
      {errorMessage === true ? renderErrorMessage(<b>{message}</b>) : <></>}
      <div className="pgn-div">
            <button onClick={(e)=>goPrevious(e)}>
            <GrPrevious></GrPrevious>
          </button>
            <button onClick={(e)=>goNext(e)}>
           <GrNext></GrNext>
          </button>
            </div>
      <div className="search">
        <input
          type="text"
          className="nav-right input-search"
          onChange={(e) => props.getUsersByValue(e.target.value)}
        ></input>

        <button className="button-reset" onClick={(e)=>resetSearch(e)}>
          <GrPowerReset></GrPowerReset>
        </button>
      </div>
      <div className="table-of-users">
        <Link to={"/korisnici/novo"}>
          <button className="button-add-user">Dodaj korisnika</button>
        </Link>

        <table className="table table-hover table-bordered">
          <thead>
            <tr>
              <th scope="col">Rb.</th>
              <th scope="col">Ime</th>
              <th scope="col">Prezime</th>
              <th scope="col">Broj članske karte</th>
              <th scope="col">Kontakt tel.</th>
              <th scope="col" className="operations">
                Operacije
              </th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={props.users.indexOf(user) + 1}>
                <td>{props.users.indexOf(user) + 1}</td>

                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.membershipCard.cardNumber}</td>
                <td>{user.contact}</td>
                <td>
                  <button className="button-details">
                    <Link to={"/korisnici/" + user.id}>
                      <FiMoreHorizontal></FiMoreHorizontal>
                    </Link>
                  </button>
                  <button
                    className="button-delete"
                    onClick={() => deleteUser(user.id)}
                  >
                    <AiFillDelete></AiFillDelete>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Users;
