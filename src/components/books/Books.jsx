import React from "react";
import "./books.css";
import { FiMoreHorizontal } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import { GrPowerReset } from "react-icons/gr";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import BookService from "../../services/BookService";
import {GrNext, GrPrevious} from "react-icons/gr"


function Books(props) {
const [search, setSearch]=useState("")
const [errorMessage, setErrorMessage] = useState(false);
const [message, setMessage]=useState("")
const [currentPage, setCurrentPage]=useState(1);
const [booksPerPage, setBooksPerPage]=useState(10);


function showMessage() {
  //  document.getElementById(elementId).style.visibility = "visible";
 setErrorMessage(true)
  setTimeout(function () {  setErrorMessage(false); }, 2000);

}
const renderErrorMessage = (message) =>
(
  <div className="error-msg-books">{errorMessage && message}</div>
);
  useEffect(() => {
    props.getAllBooks();

}, [])
const resetSearch= (e)=>{
  e.preventDefault();
  props.getAllBooks();

}
const deleteBook = (bookId) => {
    BookService.deleteBook(bookId).then((response) => {
      if (response.data.responseException == null) {
       props.getAllBooks()
      } else {
        console.log(response.data.responseException)
        setMessage(response.data.responseException.message)
        showMessage()

      }
     


  }).catch(error => {
      console.log(error)
  })

}
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
  const maxPageNumber=props.books.length/booksPerPage;
  if(currentPage+1>Math.ceil(maxPageNumber)) return;
  setCurrentPage(currentPage+1);
  console.log(currentPage)
  return;
}
const indexOfLastBook=booksPerPage*currentPage;
const indexOfFirstBook= indexOfLastBook-booksPerPage;
const currentBooks=props.books.slice(indexOfFirstBook, indexOfLastBook);

  return (
    <>
      {
              errorMessage===true ? renderErrorMessage(<b>{message}</b>) : <></>
            }
            <div className="pgn-div">
            <button onClick={(e)=>goPrevious(e)}>
            <GrPrevious></GrPrevious>
          </button>
            <button onClick={(e)=>goNext(e)}>
           <GrNext></GrNext>
          </button>
            </div>
            <div className="search">
          <input type="text" className="nav-right input-search"onChange={(e)=>props.getBooksByValue(e.target.value)} defaultValue={search}></input>

          <button className="button-reset" onClick={(e)=>resetSearch(e)}>
            <GrPowerReset></GrPowerReset>
          </button>
         
        </div>
      <div className="table-of-books">
      <Link to={"/knjige/novo"}>
            <button className="button-add-book">Dodaj knjigu</button>
          </Link>


        <table className="table table-hover table-bordered">
          <thead>
            <tr>
              <th scope="col">Rb.</th>
              <th scope="col">ISBN</th>
              <th scope="col">Naziv</th>
              <th scope="col">Godina izdanja</th>
              <th scope="col">Pisac</th>
              <th scope="col">Žanr</th>
              <th scope="col">Status</th>
              <th scope="col" className="operations">
                Operacije
              </th>
            </tr>
          </thead>
          <tbody>
            {currentBooks.map((book) => (
              <tr key={props.books.indexOf(book) + 1}>
                <td>{props.books.indexOf(book) + 1}</td>

                <td>{book.isbn}</td>
                <td>{book.title}</td>
                <td>{book.issueYear}</td>
                <td>{book.author.name + " " + book.author.lastName}</td>
                <td>{book.genre}</td>
                <td>
                  {book.currentlyRented === false ? "Dostupna" : "Nedostupna"}
                </td>
                <td>
                  <button className="button-details">
                    <Link to={"/knjige/"+book.id}><FiMoreHorizontal></FiMoreHorizontal></Link>
                    
                  </button>
                  <button className="button-delete"  onClick={() =>deleteBook(book.id)}>
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

export default Books;
