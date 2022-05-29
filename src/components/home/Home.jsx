import React from "react";
import { useState } from "react";
import UserService from "../../services/UserService";
import { useNavigate } from "react-router-dom";
import "./home.css";

function Home(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [message, setMessage]=useState("")
  const navigate=useNavigate();
  const loginUser = (e) => {
    e.preventDefault();
    if(username==null || username.trim()==="" || password==null || password.trim()===""){
      setMessage("Morate uneti kredencijale.")
      showMessage();
      return;
    }
   
    const user = {
      username: username,
      password: password,
    };
    UserService.login(user)
      .then((response) => {
        if (response.data.responseException == null) {
          props.login();
          console.log(response)
          window.localStorage.setItem("token", response.data.responseData[0] )
          window.localStorage.setItem("expiration", response.data.responseData[1] )
          window.localStorage.setItem("username", username )
          window.localStorage.setItem("password", password)
          navigate(props.redirectPath)
          
          
        
        } else
        { setMessage(response.data.responseException.message)
          showMessage()
        }
         
      })
      .catch((error) => {
        console.log(error);
      });
  };
  function showMessage() {
    //  document.getElementById(elementId).style.visibility = "visible";
   setErrorMessage(true)
    setTimeout(function () {  setErrorMessage(false); }, 2000);

}

  const renderErrorMessage = (message) =>
  (
      <div className="error-msg-login">{errorMessage && message}</div>
  );
  return (
    <div className="header-div">
      <div className="header-text">
        <div className="text">
          <p className="heading-text">BIBLIOTEKA GRADA ŠAPCA</p>
          <br></br>
          <p className="normal-text">
            Osim što se smatra centrom pismenosti, ovo zdanje smatra se jednim
            od najstarijih javnih objekata. Od svoje izgradnje ono je vršilo
            mnoge funkcije i danas čuva mnogo istorijskih podataka o Šapcu i
            okolini. Vladičanski dvor, i Biblioteka koja je u njemu nikla
            postavili su temelje za pojavu Narodnog muzeja i Arhiva Šapca.
          </p>
        </div>
        {!props.isLoggedIn ?   <div className="form-right">
          <form>
            <div>PRIJAVA NA SISTEM</div>
            <br></br>
            <label for="username">Korisničko ime</label>
            <input
              type="text"
              id="username"
              onChange={(e) => setUsername(e.target.value)}
            ></input>
            <label for="password">Šifra</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <button
              className="btn-login"
              type="submit"
              onClick={(e) => loginUser(e)}
            >
              Prijavi se
            </button>
            {
              errorMessage==true ? renderErrorMessage(<b>{message}</b>) : <></>
            }
     
            
          </form>
        </div> : <></>}
      
      </div>
    </div>
  );
}

export default Home;
