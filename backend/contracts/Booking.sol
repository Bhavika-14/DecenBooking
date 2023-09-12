// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";


contract Booking is ERC721 {
    
    uint256 public totalEvents=0;
    uint256 public totalSupply=0;
    address public owner;

    constructor() ERC721("Booking", "BOOK") {
        owner=msg.sender;
    }


    struct Event{
        uint256 id;
        string name;
        uint256 tickets;
        uint256 maxTickets;
        uint256 cost;
        string date;
        string time;
        string location;
        address listedBy;
    }


    mapping(uint256=>Event) public events;
    mapping(uint256=>uint256[]) public seatsTaken;
    mapping(uint256=>mapping(uint256=>address)) public seats;

    event EventListed(
        uint256 id,
        string name,
        uint256 maxTickets,
        uint256 cost,
        string date,
        string time,
        string location,
        address listedBy

    );

    function listEvent(
        string memory _name,
        uint256 _maxTickets,
        uint256 _cost,
        string memory _time,
        string memory _location,
        string memory _date
    ) public {
        
        // Create new event
        totalEvents=totalEvents+1;
        events[totalEvents]=Event(totalEvents,_name,_maxTickets,_maxTickets,_cost,_date,_time,_location,msg.sender);

        // Publist the event
        emit EventListed(totalEvents, _name, _maxTickets, _cost, _date, _time, _location, msg.sender);
    }

    function mint(uint256 _id, uint256 _seat) public payable {
        require(_id<=totalEvents,"event does not exist");
        require(msg.value >= events[_id].cost,"less amount");
        require(_seat<=events[_id].maxTickets,"seat does not exist");

        events[_id].tickets=events[_id].tickets-1;
        seats[_id][_seat]=msg.sender;
        seatsTaken[_id].push(_seat);

        totalSupply=totalSupply+1;
        _safeMint(msg.sender, totalSupply);

    }

    function getSeatsTaken(uint256 _id) public view returns(uint256[] memory){
        return seatsTaken[_id];
    }

    
 

}

    
