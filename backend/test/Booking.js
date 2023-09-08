const { expect } = require("chai")

const NAME = "Booking"
const SYMBOL = "BOOK"

const OCCASION_NAME = "ETH Texas"
const OCCASION_COST = ethers.utils.parseUnits('1', 'ether')
const OCCASION_MAX_TICKETS = 100
const OCCASION_DATE = "Apr 27"
const OCCASION_TIME = "10:00AM CST"
const OCCASION_LOCATION = "Austin, Texas"

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
      OCCASION_NAME,
      OCCASION_MAX_TICKETS,
      OCCASION_COST,
      OCCASION_TIME,
      OCCASION_LOCATION,
      OCCASION_DATE
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
      expect(event.name).to.be.equal(OCCASION_NAME)
      expect(event.cost).to.be.equal(OCCASION_COST)
      expect(event.tickets).to.be.equal(OCCASION_MAX_TICKETS)
      expect(event.date).to.be.equal(OCCASION_DATE)
      expect(event.time).to.be.equal(OCCASION_TIME)
      expect(event.location).to.be.equal(OCCASION_LOCATION)
    })

    it('Updates events count', async () => {
      const totalEvents = await booking.totalEvents()
      expect(totalEvents).to.be.equal(1)
    })
  })
  
 /** 
  describe("Minting", () => {
    const ID = 1
    const SEAT = 50
    const AMOUNT = ethers.utils.parseUnits('1', 'ether')

    beforeEach(async () => {
      const transaction = await tokenMaster.connect(buyer).mint(ID, SEAT, { value: AMOUNT })
      await transaction.wait()
    })

    it('Updates ticket count', async () => {
      const occasion = await tokenMaster.getOccasion(1)
      expect(occasion.tickets).to.be.equal(OCCASION_MAX_TICKETS - 1)
    })

    it('Updates buying status', async () => {
      const status = await tokenMaster.hasBought(ID, buyer.address)
      expect(status).to.be.equal(true)
    })

    it('Updates seat status', async () => {
      const owner = await tokenMaster.seatTaken(ID, SEAT)
      expect(owner).to.equal(buyer.address)
    })

    it('Updates overall seating status', async () => {
      const seats = await tokenMaster.getSeatsTaken(ID)
      expect(seats.length).to.equal(1)
      expect(seats[0]).to.equal(SEAT)
    })

    it('Updates the contract balance', async () => {
      const balance = await ethers.provider.getBalance(tokenMaster.address)
      expect(balance).to.be.equal(AMOUNT)
    })
  })

  describe("Withdrawing", () => {
    const ID = 1
    const SEAT = 50
    const AMOUNT = ethers.utils.parseUnits("1", 'ether')
    let balanceBefore

    beforeEach(async () => {
      balanceBefore = await ethers.provider.getBalance(deployer.address)

      let transaction = await tokenMaster.connect(buyer).mint(ID, SEAT, { value: AMOUNT })
      await transaction.wait()

      transaction = await tokenMaster.connect(deployer).withdraw()
      await transaction.wait()
    })

    it('Updates the owner balance', async () => {
      const balanceAfter = await ethers.provider.getBalance(deployer.address)
      expect(balanceAfter).to.be.greaterThan(balanceBefore)
    })

    it('Updates the contract balance', async () => {
      const balance = await ethers.provider.getBalance(tokenMaster.address)
      expect(balance).to.equal(0)
    })
  })
  */
})




