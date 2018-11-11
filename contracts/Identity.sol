pragma solidity ^0.4.24;

import "../daostack/contracts/votingMachines/GenesisProtocol.sol";
import "../daostack/contracts/Reputation.sol";
import "../daostack/contracts/votingMachines/VotingMachineCallbacksInterface.sol";


contract Identity is VotingMachineCallbacksInterface, ProposalExecuteInterface {
    event ProfileProposal(address indexed _address, bytes32 indexed _proposalId, bytes32 indexed _identityHash);
    event ProfileApproved(address indexed _address, bytes32 indexed _proposalId, bytes32 indexed _identityHash);
    event ProfileDeclined(address indexed _address, bytes32 indexed _proposalId, bytes32 indexed _identityHash);

    struct Profile {
        uint state; // 0 - Does not exist
                    // 1 - On Vote
                    // 2 - declined
                    // 3 - approved
        bytes32 proposalId;
        bytes32 identityHash;
    }

    mapping (address=>Profile) public profiles;
    mapping (bytes32=>address) public proposals;
    Reputation public reputation;
    GenesisProtocol public genesis;
    bytes32 public votingParams;

    modifier onlyVotingMachine () {
        require(msg.sender == address(genesis));
        _;
    }

    constructor(GenesisProtocol _genesis, bytes32 _votingParams, bytes32 _founderIdentityHash) public {
        reputation = new Reputation();
        genesis = _genesis;
        votingParams = _votingParams;
        emit ProfileApproved(msg.sender, bytes32(0), _founderIdentityHash);
        profiles[msg.sender].state = 3;
        profiles[msg.sender].identityHash = _founderIdentityHash;
        reputation.mint(msg.sender, 10**18); // Mint 1 Reputation
    }

    function proposeProfile(bytes32 _identityHash) payable public {
        // Check user is not listed:
        require(profiles[msg.sender].state == 0);

        // Open proposal:
        bytes32 id = genesis.propose(2, votingParams, msg.sender, this);
        emit ProfileProposal(msg.sender, id, _identityHash);
        proposals[id] = msg.sender;
        profiles[msg.sender] = Profile({
            state: 1,
            proposalId: id,
            identityHash: _identityHash
        });
    }

    function executeProposal(bytes32 _proposalId, int _decision) onlyVotingMachine public  {
        address profile = proposals[_proposalId];
        if (_decision == 1) {
            emit ProfileApproved(profile, _proposalId, profiles[profile].identityHash);
            profiles[profile].state = 3;
            reputation.mint(profile, 10**18); // Mint 1 Reputation
        } else {
            emit ProfileDeclined(profile, _proposalId, profiles[profile].identityHash);
            profiles[profile].state = 2;
        }
    }

    function reputationOf(address _owner, bytes32) external view returns(uint) {
        reputation.balanceOf(_owner);
    }

    function getTotalReputationSupply(bytes32) external view returns(uint256) {
        reputation.totalSupply();
    }

    function mintReputation(uint, address , bytes32) external returns(bool) {
    }

    function burnReputation(uint, address, bytes32) external returns(bool) {
    }

    function stakingTokenTransfer(StandardToken, address, uint, bytes32) external returns(bool) {
    }

    function balanceOfStakingToken(StandardToken, bytes32) external view returns(uint) {
    }
}
