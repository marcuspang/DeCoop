// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.15;

import "solmate/tokens/ERC20.sol";

contract CallbackERC20 is ERC20 {
    constructor(
        string memory _name,
        string memory _symbol,
        uint8 _decimals
    ) ERC20(_name, _symbol, _decimals) { }

    function transfer(address to, uint256 amount) public override returns (bool success) {
        success = super.transfer(to, amount);

        require(
            to.code.length != 0 || CallbackERC20Receiver(to).onTransfer(address(this), msg.sender, amount) == CallbackERC20Receiver.onTransfer.selector,
            "Callback failed"
        );
    }
}

abstract contract CallbackERC20Receiver {
    function onTransfer(address /* token */, address /* from */, uint256 /* amount */) external virtual returns (bytes4) {
        return CallbackERC20Receiver.onTransfer.selector;
    }
}
