import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import { GrPowerReset } from "react-icons/gr";
import { useParams } from "react-router-dom";
import LibrarianMemberService from "../../services/LibrarianMemberService";
import RentsService from "../../services/RentsService";
import { useNavigate } from "react-router-dom";
import "./user.css";

function User(props) {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contact, setContact] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardId, setCardId]=useState("")
  const [cardissueDate, setCardissueDate]=useState("")
  const [cardexpiryDate, setCardexpiryDate]=useState("")
  const [editable, setEditable] = useState(true);
  const [errorMessage, setErrorMessage] = useState(false);
  const [message, setMessage]=useState("")
  const [userRents, setUserRents]=useState([])
  const navigate = useNavigate();

  
  useEffect(() => {
    if (id != null) {
      setEditable(false);
    }
    if(id !=null){
      
    LibrarianMemberService.getUserById(id)
    .then((response) => {
      if (response.data.responseException == null) {
        console.log("PRONADJEN")
        console.log(response.data.responseData);
        setName(response.data.responseData.firstName);
        setLastName(response.data.responseData.lastName);
        setContact(response.data.responseData.contact);
        setCardNumber(response.data.responseData.membershipCard.cardNumber);
        setCardId(response.data.responseData.membershipCard.id)
        setCardissueDate(response.data.responseData.membershipCard.issueDate)
        setCardexpiryDate(response.data.responseData.membershipCard.expiryDate)
        
      } else {
        console.log(response.data.responseException);
      }
    })
    .catch((error) => console.log(error));
    getUserRents();

    }

 
  }, []);
  function getUserRents(){
    RentsService.getUserRents(id)
    .then((response) => {
      if (response.data.responseException == null) {
        console.log("PRONADJENE KNJIGE KORISNIKA")
        console.log(response.data.responseData);
       setUserRents(response.data.responseData)
        
      } else {
        console.log(response.data.responseException);
      }
    })
    .catch((error) => console.log(error));

  }
  function showMessage() {
    //  document.getElementById(elementId).style.visibility = "visible";
   setErrorMessage(true)
    setTimeout(function () {  setErrorMessage(false); }, 2000);

}
const renderErrorMessage = (message) =>
(
    <div className="error-msg-usr">{errorMessage && message}</div>
);
const saveOrUpdateUser= (e)=>{

  e.preventDefault();
  if (name.trim() == "" | lastName.trim() == "" | contact.trim() == "" | cardNumber.trim() == "") {
    setMessage("Morate uneti sve podatke.")
    showMessage()
    console.log(message)
    return;
} 
     const user={
      firstName: name,
      lastName: lastName,
      contact: contact,
      membershipCard:{
        cardNumber: cardNumber,
      }
    }
  if(id !=null ){
    user["id"]=id;
    user["membershipCard"]["id"]=cardId;
    LibrarianMemberService.updateUser(user).then((response) => {
      if(response.data.responseException==null){
         console.log("Izmenjen korisnik")
         navigate("/korisnici")
     
      }
      else{
        setMessage(response.data.responseException)
        showMessage()
      }
     


  }).catch(error => {
    setMessage("Došlo je do nepredvidjene greske. Pokušajte kasnije.")
    showMessage()
    console.log(error)


})
    
    

  }
  else{
    LibrarianMemberService.addUser(user).then((response) => {
      if(response.data.responseException==null){
         console.log("Dodat korisnik")
         navigate("/korisnici")
         
         
    
      }
      else{
        console.log(response.data.responseException)
      }
     


  }).catch(error => {
        console.log(error)


  })


  }
  props.getAllUsers();

}
const restoreBook=(e, rent)=>{
  e.preventDefault();
  RentsService.restoreBook(rent).then((response) => {
    if (response.data.responseException == null) {
    console.log("Razdužena knjiga");
    getUserRents();
    
    } else {
      console.log(response.data.responseException)

    }
  
   


}).catch(error => {
    console.log(error)
})

}

const generateCardNumber= (e)=>{
  e.preventDefault();
  console.log("Generisanje clanske karte.")
  LibrarianMemberService.generateCardNumber()
  .then((response) => {
    if (response.data.responseException == null) {
      setCardNumber(response.data.responseData);
    } else {
      console.log(response.data.responseException);
    }
  })
  .catch((error) => console.log(error));

}


  return (
    <>
      <div className="centered-content-user">
        <div className="user-form">
          {
            id!=null ? <><button type="button" className="btn-change" onClick={(e)=>setEditable(true)}>Izmeni</button></>  : <></>
          }
         
          <form>
            {id==null ?  <h3>Novi korisnik</h3> :  <h3>Detalji u korisniku</h3> }
           

            <label for="firstname">Ime</label>
            <input className="input" type="text" id="firstname" defaultValue={name} onChange={(e)=>setName(e.target.value)} disabled={!editable}></input>
            <label for="lastname">Prezime</label>
            <input className="input" type="text" id="lastname" defaultValue={lastName} onChange={(e)=>setLastName(e.target.value)} disabled={!editable}></input>
            <label for="contact">Kontakt tel.</label>
            <input className="input" type="text" id="contact"  defaultValue={contact} onChange={(e)=>setContact(e.target.value)} disabled={!editable}></input>
            <br></br>
            {!editable ?  <label for="contact">Broj članske karte</label> : <><br></br> <button className="btn-generate-card-number" onClick={(e)=>generateCardNumber(e)} disabled={!editable}>
              Generiši broj članske karte
            </button></>}
            
            <input className="input" type="text" id="card-num" disabled defaultValue={cardNumber}></input>
            {id!=null & !editable ? <><label for="contact">Vazi do</label>
            <input className="input" type="text" id="expiryDate"  defaultValue={cardexpiryDate} disabled={true}></input>
           </> : <></>}
            {id==null | editable==true ? 
            <>
            <button className="btn-save" type="submit"  onClick={(e)=>saveOrUpdateUser(e)}>
              Sačuvaj
            </button></> : <></>
            }
            {
              errorMessage===true ? renderErrorMessage(<b>{message}</b>) : <></>
            }
          </form>
        </div>
      </div>
      {id !=null ? 
      <div className="user-books">
        <table className="table table-hover table-bordered">
          <thead>
         
            <tr>
              <th scope="col">ISBN</th>
              <th scope="col">Naziv</th>
              <th scope="col">Datum iznajmljivanja</th>
              <th scope="col">Datum vracanja</th>
              <th scope="col">Razduži</th>
            </tr>
          </thead>
          <tbody>
          {
              userRents.map(rent =>
                <tr>
                <td>{userRents.indexOf(rent)+1}</td>
                <td>{rent.book.title}</td>
                <td>{rent.rentDate}</td>
                <td>{rent.returnDate==null ? "Nije vraćena" : rent.returnDate}</td>
                <td>{rent.returnDate==null ? <button className="btn-return" onClick={(e)=>restoreBook(e,rent)}>Razduži</button> : "/"}</td>
              </tr>
                )
            }
           
          </tbody>
        </table>
      </div> : <></>}
    </>
  );
}

export default User;
