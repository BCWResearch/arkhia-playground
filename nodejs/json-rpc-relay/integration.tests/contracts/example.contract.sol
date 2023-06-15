// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.6.0 <0.9.0;
 
 contract FairTradeCoffee  {

    receive() external payable {}

    fallback() external payable {}

    event FairTradeEvent(
        address indexed from,
        uint256 timestamp,
        string name,
        string message,
        uint256 amount
    );
    
    // Memo struct.
    struct FairTradeBuyer {
        address from;
        uint256 timestamp;
        string name;
        string message;
        uint256 amount;
    }

    struct FairTradeMetadata {
        string creatorName;
        string tokenSymbol;
        string tokenName;
        uint256 tokenSupply;
        address tokenAddress;
    }
    
    address payable owner;

    FairTradeBuyer[] fairTradeBuyers;
    FairTradeMetadata fairTradeMetadata;

    constructor(string memory _creatorName, string memory _tokenSymbol, string memory _tokenName, uint256 _tokenSupply) {
        owner = payable(msg.sender);
        fairTradeMetadata.creatorName = _creatorName;
        fairTradeMetadata.tokenSymbol = _tokenSymbol;
        fairTradeMetadata.tokenName = _tokenName;
        fairTradeMetadata.tokenSupply = _tokenSupply;
    }

    function getContractBalance() public view returns (uint) {
        return address(this).balance;
    }

    function getTokenRemainingBalance() public view returns (uint) {
        return fairTradeMetadata.tokenSupply;
    }

    function setCreator(string memory _name) external {
        fairTradeMetadata.creatorName = _name;
    }

    function makeDonationHbars(string memory _name, string memory _message, uint256 _amount) external payable returns (uint)  {

        require(_amount > 0, "Please send some hbars :)");

        if (fairTradeMetadata.tokenSupply < _amount) {
            revert ("Transfer Failed. Not enough tokens to go around");
        } 

        fairTradeBuyers.push(FairTradeBuyer(
            msg.sender,
            block.timestamp,
            _name,
            _message,
            _amount
        ));

        fairTradeMetadata.tokenSupply -= _amount;

         // Emit a FairTrade event with details.
        emit FairTradeEvent(
            msg.sender,
            block.timestamp,
            _name,
            _message,
            _amount
        );

        return msg.value;
    }

    function withdrawDonations() public {
        require(fairTradeMetadata.tokenSupply <= 90000, "Not yet, we need more donations!");
        require(owner.send(address(this).balance));
    }

    function getFairTradeBuyerNumbers() public view returns (uint) {
        return fairTradeBuyers.length;
    }

    function getFairTradeBuyers() public view returns (FairTradeBuyer[] memory) {
        return fairTradeBuyers;
    }

    function getContractMetadata() public view returns (FairTradeMetadata memory) {
        return fairTradeMetadata;
    }
}
