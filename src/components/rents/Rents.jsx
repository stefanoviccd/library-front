import React from "react";
import { useState } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import { GrPowerReset } from "react-icons/gr";
import LibrarianMemberService from "../../services/LibrarianMemberService";
import RentsService from "../../services/RentsService";
import "./rents.css";
import {MdOutlineCancel } from "react-icons/md"
import {GrStatusGood} from "react-icons/gr"

function Rents(props) {
  const [books, setBooks]=useState([])
  const [searchValue, setSearchValue]=useState("")
  const[cardNumber, setCardNumber]=useState("")
  const [user,setUser]=useState(null)
  const [errorMessage, setErrorMessage] = useState(false);
  const [message, setMessage]=useState("")
  const [checkButtonShow, setCheckButtonShow]=useState(false)
  function showMessage() {
    //  document.getElementById(elementId).style.visibility = "visible";
   setErrorMessage(true)
    setTimeout(function () {  setErrorMessage(false); }, 2000);

}

function showCheckButton() {
  //  document.getElementById(elementId).style.visibility = "visible";
 setCheckButtonShow(true)
  setTimeout(function () {  setCheckButtonShow(false); }, 2000);

}
const renderErrorMessage = (message) =>
(
    <><div className="error-msg-div">{errorMessage && message}</div></>
);
  const findBooks=(e)=>{
    e.preventDefault();
    setBooks(props.getBooksByValue(e.target.value))
    setSearchValue(e.target.value)

  }
  const findUser=(e)=>{
    e.preventDefault();

    LibrarianMemberService.getByUserCard(cardNumber).then((response) => {
      if (response.data.responseException == null) {
        if(response.data.responseData.length==0){
          setUser(null)
          showCheckButton()
    }
    else{
      setUser(response.data.responseData)
      showCheckButton()
    }
     
      } else {
      
        setUser(null)
        showCheckButton()
      }
    
     
  
  
  }).catch(error => {
    setUser(null)
  })
  showCheckButton()
  }
  const rentBook=(e,book)=>{
    e.preventDefault();
    if(user==null){
      setMessage("Nije pronadjen korisnik.")
      showMessage();
      return

    }
 
  const rent={
    book: book,
    byMember: user
  }
    RentsService.rentBook(rent).then((response) => {
    if (response.data.responseException == null) {
    console.log("Iznajmljena knjiga");
    setMessage("Uspešno iznajmljena knjiga");
    showMessage();
    setBooks(props.getBooksByValue(searchValue))
    
    } else {
      setMessage(response.data.responseException.message)
      showMessage()
      return;

    }
  
   


}).catch(error => {
    console.log(error)
})

    


  }
  return (
    <>
      <div className="centered-content">
        <div className="rent-form">
          <form>
            <h3>Iznajmljivanje knjige</h3>
           
         

            <label for="card-number">Broj članske karte</label>
            <input className="input" type="text" id="card-number" onChange={(e)=>setCardNumber(e.target.value)}></input>
            {
              
            (user==null & checkButtonShow) ?  <button disabled className="check-button unsuccess"><MdOutlineCancel></MdOutlineCancel></button> :  (user !=null & checkButtonShow) ?  <button disabled className="check-button success"><GrStatusGood></GrStatusGood></button> :<></> }
            <button className="btn-check" type="submit" onClick={(e)=>findUser(e)}>
              Pronadji člana
            </button>
            <label for="isbn">ISBN ili naziv knjige</label> <br></br>
            <input className="input" type="text" id="isbn" onChange={(e)=>findBooks(e)}></input><br></br>
          
           {
              errorMessage===true ? renderErrorMessage(<b>{message}</b>) : <></>
            }
          </form>
      
        </div>
      </div>
      <div className="div-books">
        <table className="table table-hover table-bordered">
          <thead>
            <tr>
              <th scope="col">ISBN</th>
              <th scope="col">Naziv</th>
              <th scope="col">Pisac</th>
              <th scope="col">Status</th>
              <th scope="col">Iznajmi</th>
            </tr>
          </thead>
          <tbody>
            {
              props.books.map((book)=>
              <tr>
              <td>{book.isbn}</td>
              <td>{book.title}</td>
              <td>{book.author.name+" "+book.author.lastName}</td>
              <td>{book.currentlyRented==true ? "Nedostupna" : "Dostupna"}</td>
              <td>{book.currentlyRented==true ? <button disabled className="btn-disabled" >X</button> : <button className="btn-return" onClick={(e)=>rentBook(e,book)}>Iznajmi</button>}</td>
            </tr>
              )
            }
   
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Rents;
