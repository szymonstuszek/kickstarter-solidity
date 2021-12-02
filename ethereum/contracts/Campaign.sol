pragma solidity ^0.4.17;

contract CampaignFactory {
    address[] public deployedCampagins;

    function createCampaign(uint minimum) public {
        address campain = new Campaign(minimum, msg.sender);
        deployedCampagins.push(campain);
    }

    function getDeployedCampaigns() public view returns (address[]) {
        return deployedCampagins;
    }
}

contract Campaign {
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }

    Request[] public requests;
    address public manager;
    uint public minimumContribution;
    uint public approversCount;
    mapping(address => bool) public approvers;

    function Campaign(uint minimum, address creator) public {
        manager = creator;
        minimumContribution = minimum;
    }

    function contribute() public payable {
        require(msg.value > minimumContribution);
        approvers[msg.sender] = true;
        approversCount++;
    }

    function createRequest(string description, uint value, address recipient)
    public restricted {

        Request memory request = Request({
        description: description,
        value: value,
        recipient: recipient,
        complete: false,
        approvalCount: 0
        });

        requests.push(request);
    }

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    function approveRequest(uint index) public {
        Request storage request = requests[index];

        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];

        require(request.approvalCount > (approversCount) / 2);
        require(!request.complete);

        request.recipient.transfer(request.value);
        request.complete = true;
    }
}