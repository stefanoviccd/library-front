import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import BookService from "../../services/BookService";
import "./book.css";
import { useNavigate } from "react-router-dom";
import { validIssueYear } from "../../services/validation/Regex";
function Book(props) {
  const { id } = useParams();
  const [isbn, setIsbn] = useState("");
  const [title, setTitle] = useState("");
  const [issueYear, setIssueYear] = useState("");
  const [authorsName, setAuthorsName] = useState("");
  const [authorsLastName, setAuthorsLastName] = useState("");
  const [category, setCategory] = useState(null);
  const [rented, setIsRented] = useState(false);
  const [editable, setEditable] = useState(true);
  const [errorMessage, setErrorMessage] = useState(false);
  const [message, setMessage]=useState("")
  const navigate=useNavigate();






  useEffect(() => {

    props.getGenres();
    if (id != null) {
      setEditable(false);
    }
    if(id !=null ){
      
    BookService.getBookById(id)
    .then((response) => {
      if (response.data.responseException == null) {
        console.log(response.data.responseData)
        setIsRented(response.data.responseData.currentlyRented);
        setIsbn(response.data.responseData.isbn);
        setTitle(response.data.responseData.title);
        setIssueYear(response.data.responseData.issueYear);
        setAuthorsName(response.data.responseData.author.name);
        setAuthorsLastName(response.data.responseData.author.lastName);
        setCategory(response.data.responseData.genre);

       
      } else {
        console.log(response.data.responseException);
      }
    })
    .catch((error) => console.log(error));

    }

 
  },[]);
  function showMessage() {
    //  document.getElementById(elementId).style.visibility = "visible";
   setErrorMessage(true)
    setTimeout(function () {  setErrorMessage(false); }, 2000);

}
const renderErrorMessage = (message) =>
(
    <div className="error-msg">{errorMessage && message}</div>
);
  const saveOrUpdateBook = (e)=>{
    e.preventDefault();
    console.log("Saving book")
    if (isbn.trim() == "" | title.trim() == "" | authorsName.trim() == ""  | authorsLastName.trim() == "") {
      setMessage("Morate uneti sve podatke.")
      showMessage()
      console.log(message)
     
      return;
  } 
  if(isbn.length!=10){
    setMessage("ISBN broj mora sadržati tačno deset cifara.")
    showMessage()
    console.log(message)
   
    return;

  }
  if(category==null){
    setMessage("Morate izabrati književni žanr.")
    showMessage()
    console.log(message)
    return;

  }
  var i = 0;
  issueYear
    .toString()
    .split("")
    .forEach((c) => {
      if (!validIssueYear.test(c)) {
        i++;
      }
    });
  if (i > 0) {
    setMessage("Nevalidan unos za godinu izdanja.")
    showMessage()
    console.log(message)
    i=0;
    return;

  }
  
       const book={
        isbn: isbn,
        title: title,
        issueYear: issueYear,
        author:{
          name: authorsName,
          lastName: authorsLastName,
        },
        genre: category,
        isCurrentlyRented: false
      }
      console.log(book)
    if(id !=null ){
      book["id"]=id;
      book["isCurrentlyRented"]=rented;
      BookService.updateBook(book).then((response) => {
        if(response.data.responseException==null){
           console.log("Izmenjena knjiga")
           navigate("/knjige")
       
        }
        else{
          setMessage(response.data.responseException.message)
          showMessage()
          console.log(response.data.responseException)
  
         
        }
       


    }).catch(error => {
      setMessage("Došlo je do nepredvidjene greske. Pokušajte kasnije.")
      showMessage()
      console.log(error)
     

})
      
      

    }
    else{
      BookService.addBook(book).then((response) => {
        if(response.data.responseException==null){
           console.log("Dodata knjiga")
           navigate("/knjige")
      
        }
        else{
          setMessage(response.data.responseException.message)
          showMessage()
          console.log(response.data.responseException)
        
        }
       


    }).catch(error => {
      setMessage("Došlo je do nepredvidjene greske. Pokušajte kasnije.")
      showMessage()
      console.log(error)
    

    })


    }
    props.getAllBooks();
  }
  const changeCategory=(value)=>{

    
   props.genres.forEach(e =>{
    if(e===value){
      setCategory(e);
    console.log("*******************  category *********************")
      console.log(category);
      return;
    }
  })

  }
  return (

    <div className="centered-content-book">
      <div className="book-form">
       {id!=null ?  <button
          type="button"
          className="btn-change-book"
          onClick={()=>setEditable(true)}
        >
          Izmeni
        </button> : <></>}
        <form>
          <h3>{id ? "Detalji o knjizi" : "Nova knjiga"}</h3>

          <label for="isbn">ISBN</label>
          <input
            className="input"
            type="text"
            id="isbn"
            defaultValue={isbn}
            disabled={!editable}
            onChange={(e) => setIsbn(e.target.value)}
          ></input>
          <label for="title">Naslov</label>
          <input
            className="input"
            type="text"
            id="title"
            defaultValue={title}
            disabled={!editable}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
          <label for="issueYear">Godina izdanja</label>
          <input
            className="input"
            type="text"
            id="issueYear"
            defaultValue={issueYear}
            disabled={!editable}
            onChange={(e) => setIssueYear(e.target.value)}
          ></input>
          <label for="a-name">Autor</label> 
          <input
            className="input"
            type="text"
            id="a-name"
            defaultValue={authorsName}
            disabled={!editable}
            onChange={(e) => setAuthorsName(e.target.value)}
          ></input>
          <input
            className="input"
            type="text"
            id="a-lastName"
            defaultValue={authorsLastName}
            disabled={!editable}
            onChange={(e) => setAuthorsLastName(e.target.value)}
          ></input>
          <label for="category">Kategorija</label>
          <select
            name="book-categories"
            id="book-categories"
            disabled={!editable}
            value={category}
            onChange={(e) => changeCategory(e.target.value)}
            
          >
                <option value={null}>Izaberi kategoriju..</option>
              
              {
                props.genres.map(g => 
                  <option value={g}>{g}</option>

                )
              }
            
          </select>
          <br></br>
          {id ? (
            <>
              {" "}
              <label for="isCurrentlyRented">Status</label>
              <input
                readonly={true}
                className="input"
                type="text"
                id="isCurrentlyRented"
                value={rented === true ? "Nedostupna" : "Dostupna"}
                disabled
              ></input>
            </>
          ) : (
            <></>
          )}
          <button className="btn-save" type="submit" disabled={!editable} onClick={(e)=>saveOrUpdateBook(e)}>
            Sačuvaj
          </button>
          {
              errorMessage===true ? renderErrorMessage(<b>{message}</b>) : <></>
            }
        </form>
  
      </div>
    </div>
  );
}

export default Book;
