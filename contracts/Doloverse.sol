//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Doloverse is ERC1155, Ownable {
    uint256 public constant GOLD = 0;

    uint256 public tokenIds = 1;

    constructor() ERC1155("https://doloverse.com/api/metadata/{id}.json") {
        _mint(msg.sender, GOLD, 10**18, "");
    }

    function accountHasTicket(address _account) public view returns (bool) {
        bool _hasTicket = false;
        for (uint256 i = 1; i < tokenIds; i++) {
            if (balanceOf(_account, i) > 0) {
                _hasTicket = true;
            }
        }
        return _hasTicket;
    }

    function printTicket(address _recipient) public onlyOwner {
        _mint(_recipient, tokenIds, 1, "");
        tokenIds++;
    }

    function printBatchToOne(address _recipient, uint8 _amount)
        public
        onlyOwner
    {
        uint256[] memory _amounts;
        uint256[] memory _ids;
        uint256 _tokenId = tokenIds;
        for (uint256 i = 0; i < _amount; i++) {
            _amounts[i] = 1;
            _ids[i] = _tokenId;
            _tokenId++;
        }
        _mintBatch(_recipient, _ids, _amounts, "");
    }

    function printBatchToOneAdmin(
        address _recipient,
        uint256[] memory _tokenIds,
        uint256[] memory _amounts
    ) public onlyOwner {
        _mintBatch(_recipient, _tokenIds, _amounts, "");
        tokenIds = tokenIds + _tokenIds.length;
    }

    function printBatchToMany(address[] memory _recipients) public onlyOwner {
        uint256[] memory _ids;
        uint256 _tokenId = tokenIds;
        for (uint256 i = 0; i < _recipients.length; i++) {
            _ids[i] = _tokenId;
            _mint(_recipients[i], 1, _tokenId, "");
            _tokenId++;
        }
    }

    function getTicketsOfAccount(address _account)
        public
        view
        returns (uint256[] memory)
    {
        uint256[] memory _tickets = new uint256[](tokenIds);
        for (uint256 i = 1; i < tokenIds; i++) {
            _tickets[i] = balanceOf(_account, i);
        }
        return _tickets;
    }
}
