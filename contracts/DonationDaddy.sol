pragma solidity ^0.4.4;

import "zeppelin-solidity/contracts/ownership/Ownable.sol";
import "./DonationToken.sol";

contract DonationDaddy is Ownable {

    uint8 private tax;

    event DonationTokenIssued(address receiver, address addr);

    mapping (bytes20 => address) public tokens;

    constructor() public {
        tax = 1;
    }

    function SetTax(uint8 tax_) public onlyOwner {
        tax = tax_;
    }

    function GetTax() public view returns(uint8) {
        return tax;
    }

    function IssueDonationToken(bytes20 for_) public payable {
        require(msg.sender != owner);
        DonationToken tok = new DonationToken(msg.sender);
        tokens[for_] = tok;
        emit DonationTokenIssued(msg.sender, tok);
    }
}
