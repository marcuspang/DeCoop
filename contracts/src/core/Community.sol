// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.15;

import "../tokens/CallbackERC20.sol";
import "../tokens/SoulBoundToken.sol";

contract Community is CallbackERC20Receiver {
    string public name;
    ERC20 public communityToken;
    SoulBoundToken public soulboundToken;

    mapping(address => int256) public netAmount;

    event Deposit(address indexed from, uint256 amount);
    event Withdraw(address indexed to, uint256 amount);

    constructor(string memory _name, address _communityToken, address _soulboundToken) {
        name = _name;
        communityToken = CallbackERC20(_communityToken);
        soulboundToken = SoulBoundToken(_soulboundToken);
    }

    function withdraw(uint256 amount) external {
        require(soulboundToken.balanceOf(msg.sender) >= 1, "Community SoulBoundToken not present"); // TODO: >= 1 or == 1

        unchecked {
            netAmount[msg.sender] -= int256(amount);
        }

        // Custom logic
        require(
            int256(communityToken.balanceOf(address(this)) * 20 / 100) >= -netAmount[msg.sender],
            "Individual cannot borrow more than 20% of the total fund"
        );

        communityToken.transfer(address(this), amount);
    }

    function onTransfer(address token, address from, uint256 amount) external override returns (bytes4) {
        // Called when user deposits to fund
        require(token == address(communityToken));

        require(soulboundToken.balanceOf(from) >= 1, "Community SoulBoundToken not present"); // TODO: >= 1 or == 1

        // Bookkeeping
        unchecked {
            netAmount[from] += int256(amount);
        }

        emit Deposit(from, amount);

        return CallbackERC20Receiver.onTransfer.selector;
    }

    function joinCommunity() external {
        require(soulboundToken.balanceOf(msg.sender) == 0, "SoulBoundToken already exists");

        soulboundToken.mint(msg.sender);
    }
}
