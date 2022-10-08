// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.15;

import "solmate/tokens/ERC721.sol";

contract SoulBoundToken is ERC721 {
    uint256 public nextId;
    address[] public members;

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {
        nextId = 0;
    }

    function mint(address to) public {
        _safeMint(to, nextId++);
        members.push(msg.sender);
    }

    function transferFrom(address /* from */, address /* to */, uint256 /* id */) public pure override {
        require(false, "SoulBoundTokens cannot be transferred once minted!");
    }

    function tokenURI(uint256 /* id */) public pure override returns (string memory) {
        // TODO: replace with url
        return "TODO";
    }
}
