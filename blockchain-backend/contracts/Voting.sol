// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract Voting {
    struct Candidate {
        uint256 id;
        string name;
        uint256 voteCount;
    }

    mapping(uint256 => Candidate) public candidates;
    uint256 public candidateCount;
    address public admin;

    event CandidateAdded(uint256 candidateId, string name);
    event VoteCasted(uint256 candidateId);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    constructor() {
        admin = msg.sender;
        addCandidate("Chandrababu Naidu");
        addCandidate("Jagan Mohan Reddy");
        addCandidate("Pawan Kalyan");
    }

    function addCandidate(string memory name) public onlyAdmin {
        candidateCount++;
        candidates[candidateCount] = Candidate(candidateCount, name, 0);
        emit CandidateAdded(candidateCount, name);
    }

    function vote(uint256 candidateId) public {
        require(candidateId > 0 && candidateId <= candidateCount, "Invalid candidate ID");

        candidates[candidateId].voteCount++;  // ✅ Simply update vote count
        emit VoteCasted(candidateId);
    }

    function getVotes(uint256 candidateId) public view returns (uint256) {
        require(candidateId > 0 && candidateId <= candidateCount, "Invalid candidate ID");
        return candidates[candidateId].voteCount;
    }
}
