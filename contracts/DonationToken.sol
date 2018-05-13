pragma solidity ^0.4.4;

import "zeppelin-solidity/contracts/ownership/Ownable.sol";
import "./DonationDaddy.sol";

contract DonationToken is Ownable {

    address public receiver; 

    string public goal_descr;
    uint256 public goal_target;
    uint256 public goal_progress;

    event GoalReached(string descr);
    event GotDonation(address addr, string from, string message, uint256 sum);

    function DonationToken(address recv_) public {
        receiver = recv_;
        
        goal_target = 0;
        goal_progress = 0;
    }

    function SetGoal(string descr_, uint256 target_) public {
        require(msg.sender == receiver);
        goal_descr = descr_;
        goal_target = target_;
        goal_progress = 0;
    }

    function processDonation(address sender_, uint256 value_, string from_, string message_) private {
        emit GotDonation(sender_, from_, message_, value_);
        if (goal_progress < goal_target) {
            goal_progress += value_;
            if (goal_progress >= goal_target) {
                emit GoalReached(goal_descr);
            }
        }
    }

    function FakeDonate(uint256 value_, string from_, string message_) public {
        require(msg.sender == receiver);
        processDonation(receiver, value_, from_, message_);
    }

    function Donate(string from_, string message_) public payable returns(bool) {
        processDonation(msg.sender, msg.value, from_, message_);
        uint256 commission = msg.value * DonationDaddy(owner).GetTax() / 100;
        return owner.send(commission);
    }
}
