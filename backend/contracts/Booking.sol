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
 

    /**
    function safeMint(address to) public onlyRole(MINTER_ROLE) {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }
     */

}

    
