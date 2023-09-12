"use client"
import React,{ useState,useEffect } from 'react'
import Navbar from "./navbar"
import { ethers } from "ethers"

const App = () => {
  const [provider,setProvider]=useState(null)
  const [account,setAccount]=useState(null)
  const [booking,setBooking]=useState(null)

  const [events, setEvents] = useState([])

  const [event, setEvent] = useState({})
  const [toggle, setToggle] = useState(false)

  const loadBlockchainData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    setProvider(provider)

    const network = await provider.getNetwork()
    const booking = new ethers.Contract(config[network.chainId].Booking.address, Booking, provider)
    setBooking(booking)

    const totalEvents = await booking.totalEvents()
    const events = []

    for (var i = 1; i <= totalEvents; i++) {
      const event = await booking.events(i)
      events.push(event)
    }

    setEvents(events)

    window.ethereum.on('accountsChanged', async () => {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const account = ethers.utils.getAddress(accounts[0])
      setAccount(account)
    })
  }

  useEffect(()=>{loadBlockchainData()},[])

    
  return (
    <div>
        <Navbar account={account} setAccount={setAccount} />

        {events && 
        events.map((event,key)=>{
          return(
            <Event event={event} />
            
          )
        })
        }
    </div>
  )
}

export default App