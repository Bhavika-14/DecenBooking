"use client"
import React,{ useState,useEffect } from 'react'
import { ethers } from "ethers"

const Navbar = ({account,setAccount}) => {
  const [buttonContent,setButonContent]=useState("Connect")
  const connectHandler=async()=>{
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    const account = ethers.utils.getAddress(accounts[0])
    setAccount(account)
    setButonContent(account)
  }
  {!account && setButonContent("Connect")}
  return (
    <div className='flex justify-between'>
        <div>DecenBooking</div>
        <div><button onClick={connectHandler}>{buttonContent}</button></div>
    </div>
  )
}

export default Navbar