import "./App.css";
import Book from "./components/book/Book";
import Books from "./components/books/Books";
import Home from "./components/home/Home";
import Navbar from "./components/navbar/Navbar";
import User from "./components/user/User";
import Users from "./components/users/Users";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Rents from "./components/rents/Rents";
import Statistics from "./components/statistics/Statistics";
import { useState } from "react";
import { useEffect } from "react";
import BookService from "./services/BookService";
import LibrarianMemberService from "./services/LibrarianMemberService";
import Error from "./components/error/Error";
import NotFound from "./components/notFound/NotFound";
import { useNavigate } from "react-router-dom";
import UserService from "./services/UserService";





function App() {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [openModal, setOpenModal]=useState(false);
  const[genres, setGenres]=useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(JSON.parse(window.localStorage.getItem('isLoggedIn')));
  const [sessionExpired, setSessionExpired] = useState(false);




  const isSessionExpired=function(){
    const currentDate=new Date();
    const tokenExpirationDate=new Date(localStorage.getItem("expiration"));
    if(currentDate>tokenExpirationDate){
      setSessionExpired(true)
     return true;
    }
    else{
      setSessionExpired(false)
      return false;
    }
  }
  useEffect(() => {
    if(isLoggedIn){
      if(isSessionExpired())
      setOpenModal(true)
    }
  });
  

  useEffect(() => {
    window.localStorage.setItem('isLoggedIn', isLoggedIn);
  }, [isLoggedIn]);

  function login() {
    setIsLoggedIn(true);

 

  }
  function logout() {
    setIsLoggedIn(false);

    window.localStorage.removeItem("token");
    window.localStorage.removeItem("expiration");
    window.localStorage.removeItem("username");
    window.localStorage.removeItem("password");

  }

  function getAllBooks() {
    BookService.getAllBooks()
      .then((response) => {
        if (response.data.responseException == null) {
          setBooks(response.data.responseData);
        } else {
          setBooks([]);
        }
        console.log(response.data.responseData);
      })
      .catch((error) => {
        console.log(error);
        setBooks([]);
      });
  }
  function getAllUsers() {
    LibrarianMemberService.getAllUsers()
      .then((response) => {
        if (response.data.responseException == null) {
          setUsers(response.data.responseData);
          console.log("Pronadjeni korisnici")
        } else {
          setUsers([]);
          console.log("Nisu pronadjeni korisnici")
          console.log(response.data.responseException)
        }
        console.log(response.data.responseData);
      })
      .catch((error) => {
        console.log(error);
        setUsers([]);
      });
  }
  function getUsersByValue(value) {
    LibrarianMemberService.getUsersByValue(value).then((response) => {
      if (response.data.responseException == null) {
        setUsers(response.data.responseData);
      } else {
        setUsers([]);
      }
      console.log(response.data.responseData);
    }).catch(error => {
       setUsers([]);
    })

}

  function getGenres(){
    
    BookService.getBookCategories()
      .then((response) => {
        if (response.data.responseException == null) {
          setGenres(response.data.responseData);
          
          console.log(response.data.responseData)
        } else {
          console.log(response.data.responseException);
        }
      })
      .catch((error) => console.log(error));
  }
  function getBooksByValue(value){
    BookService.getBooksByValue(value).then((response) => {
      if (response.data.responseException == null) {
        setBooks(response.data.responseData);
      
      } else {
        setBooks([]);
      }
      console.log(response.data.responseData);
    }).catch(error => {
       // console.log(error)
    })

}

const logoutAndRedirectToHome=function(e){
  e.preventDefault();
  logout();
  setOpenModal(false)

}
const reloadSession=function(){
  const username=window.localStorage.getItem("username");
  const password=window.localStorage.getItem("password");
  console.log(username)
  console.log(password)
  const user = {
    username: username,
    password: password,
  };
  UserService.login(user)
    .then((response) => {
      if (response.data.responseException == null) {
        login();
        console.log("RESPONSE")
        console.log(response)
        window.localStorage.setItem("token", response.data.responseData[0] )
        window.localStorage.setItem("expiration", response.data.responseData[1] )
        window.localStorage.setItem("username", username )
        window.localStorage.setItem("password", password)        
      
      }
    })
    .catch((error) => {
      console.log(error);
    });
    setOpenModal(false)
  
}


  return (
    <>
    <div className="header-div">
    
      <Router>
      <Navbar isLoggedIn={isLoggedIn} logout={logout}></Navbar>
        <Routes>
          <Route
            path="/"
            element={<Home login={login} isLoggedIn={isLoggedIn} redirectPath={"/"}></Home>}
          ></Route>
          <Route path="/knjige" element={isLoggedIn ? <Books books={books} getAllBooks={getAllBooks} getBooksByValue={getBooksByValue}></Books> :  <Error></Error> }></Route>
          <Route path="/korisnici" element={isLoggedIn ? <Users  users={users} getAllUsers={getAllUsers} getUsersByValue={getUsersByValue}></Users>  :  <Error></Error> }></Route>
          <Route path="/knjige/novo" element={isLoggedIn ? <Book genres={genres} getAllBooks={getAllBooks} getGenres={getGenres}></Book>  :  <Error></Error> }></Route>
          <Route path="/knjige/:id" element={ isLoggedIn ? <Book genres={genres} getAllBooks={getAllBooks} getGenres={getGenres}></Book> : <Error></Error> }></Route>
          <Route path="/korisnici/novo" element={isLoggedIn ? <User getAllUsers={getAllUsers}></User> :  <Error></Error> }></Route>
          <Route path="/korisnici/:id" element={ isLoggedIn ? <User  getAllUsers={getAllUsers}></User>: <Error></Error>  }></Route>
          <Route path="/iznajmljivanja" element={isLoggedIn ? <Rents books={books} getBooksByValue={getBooksByValue}></Rents>  :  <Error></Error> }></Route>
          <Route path="/statistika" element={isLoggedIn ? <Statistics></Statistics>  :  <Error></Error> }></Route>
          <Route path="/*" element={<NotFound></NotFound>}></Route>
        </Routes>
      </Router>
    </div>
    {openModal===true ? <>
      <div className="whole-page-layer">
    <div className="sessionExpiredDiv" id="sessionExpiredDiv">
      Vaša sesija je istekla. 
      <div className="session-buttons"> <button className="session-btn" onClick={(e)=>logoutAndRedirectToHome(e)}>OK</button>
      <button className="session-btn" onClick={(e)=>reloadSession(e)}>Obnovi</button></div>
     </div>
      </div></> : <></>}
   </>
   
  );
}

export default App;
