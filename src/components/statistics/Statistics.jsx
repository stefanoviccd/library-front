
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import StatisticsService from '../../services/StatisticsService'
import "./statistics.css"
import {BiArrowBack} from "react-icons/bi"

function Statistics() {
  const[bookNum, setBookNum]=useState(0);
  const[userNum, setUserNum]=useState(0);
  const[titleNum, setTitleNum]=useState(0);
  const[rentedBookNum, setrentedBookNum]=useState(0);

  useEffect(()=>{
    StatisticsService.getStatistics().then((response) => {
      if (response.data.responseException == null) {
        setBookNum(response.data.responseData.bookNumber);
        setTitleNum(response.data.responseData.titleNumber);
        setUserNum(response.data.responseData.userNumber);
        setrentedBookNum(response.data.responseData.currentlyRentedBooksNumber);


      } else {
      }
      console.log(response.data.responseData);
    }).catch(error => {
       // console.log(error)
    })
  })
  return (
    <>
    <div className='twoXtwo-grid'>
      <div className='quadrant'><img src='../images/knjige.jpg'>
        </img>
        <div className='text-stat'>Ukupan broj knjiga: {bookNum}</div></div>
      <div className='quadrant'><img src='../images/naslovi.jfif'></img>
      <div className='text-stat'>Ukupan broj naslova: {titleNum}</div></div>
      <div className='quadrant'><img src='../images/korisnici.png'></img>
      <div className='text-stat'>Ukupan broj korisnika: {userNum}</div></div>
      <div className='quadrant'><img src='../images/rent.png'></img>
      <div className='text-stat'>Broj trenutno iznajmljenih knjiga: {rentedBookNum}</div></div>
    </div>
    <button className='redirect-to-home'><Link to={"/"}><BiArrowBack></BiArrowBack>{"\t Nazad na početku stranu"}</Link></button>
    </>
    
  )
}

export default Statistics