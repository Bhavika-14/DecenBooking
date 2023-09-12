const { expect } = require("chai")

const NAME = "Booking"
const SYMBOL = "BOOK"

const EVENT_NAME = "ETHTalk India"
const EVENT_COST = ethers.utils.parseUnits('1', 'ether')
const EVENT_MAX_TICKETS = 100
const EVENT_DATE = "sep 15"
const EVENT_TIME = "10:00AM IST"
const EVENT_LOCATION = "Mumbai, India"

describe("Booking", () => {
  let booking
  let deployer, buyer

  beforeEach(async () => {
    // Setup accounts
    [deployer, buyer] = await ethers.getSigners()

    // Deploy contract
    const Booking = await ethers.getContractFactory("Booking")
    booking = await Booking.deploy()

    const transaction = await booking.connect(deployer).listEvent(
      EVENT_NAME,
      EVENT_MAX_TICKETS,
      EVENT_COST,
      EVENT_TIME,
      EVENT_LOCATION,
      EVENT_DATE
    )

    await transaction.wait()
  })

  describe("Deployment", () => {
    it("Sets the name", async () => {
      expect(await booking.name()).to.equal(NAME)
    })

    it("Sets the symbol", async () => {
      expect(await booking.symbol()).to.equal(SYMBOL)
    })

    it("Sets the owner", async () => {
      expect(await booking.owner()).to.equal(deployer.address)
    })
    
  })
 
  describe("Events", () => {
    it('Returns events attributes', async () => {
      const event = await booking.events(1)
      expect(event.id).to.be.equal(1)
      expect(event.name).to.be.equal(EVENT_NAME)
      expect(event.cost).to.be.equal(EVENT_COST)
      expect(event.tickets).to.be.equal(EVENT_MAX_TICKETS)
      expect(event.date).to.be.equal(EVENT_DATE)
      expect(event.time).to.be.equal(EVENT_TIME)
      expect(event.location).to.be.equal(EVENT_LOCATION)
    })

    it('Updates events count', async () => {
      const totalEvents = await booking.totalEvents()
      expect(totalEvents).to.be.equal(1)
    })
  })
  
 
  describe("Minting", () => {
    const ID = 1
    const SEAT = 50
    const AMOUNT = ethers.utils.parseUnits('1', 'ether')

    beforeEach(async () => {
      const transaction = await booking.connect(buyer).mint(ID, SEAT, { value: AMOUNT })
      await transaction.wait()
    })

    it('Updates ticket count', async () => {
      const event = await booking.events(1)
      expect(event.tickets).to.be.equal(EVENT_MAX_TICKETS - 1)
    })

    

    it('Updates seat status', async () => {
      const owner = await booking.seats(ID, SEAT)
      expect(owner).to.equal(buyer.address)
    })

    it('Updates overall seating status', async () => {
      const seatstaken = await booking.getSeatsTaken(ID)
      expect(seatstaken.length).to.equal(1)
      expect(seatstaken[0]).to.equal(SEAT)
    })

    it('Updates the contract balance', async () => {
      const balance = await ethers.provider.getBalance(booking.address)
      expect(balance).to.be.equal(AMOUNT)
    })
  })

  
  
})




