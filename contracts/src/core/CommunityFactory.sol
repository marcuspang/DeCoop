// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.15;

import "../tokens/CallbackERC20.sol";
import "../tokens/SoulBoundToken.sol";
import "./Community.sol";

contract CommunityFactory {
    address[] public communities;

    function create(string memory name) external returns (address) {
        string memory sbtName = string.concat(name, "-SBT");
        SoulBoundToken sbt = new SoulBoundToken(sbtName, sbtName);

        string memory tName = string.concat(name, "-T");
        CallbackERC20 t = new CallbackERC20(tName, tName, 8);

        Community community = new Community(name, address(sbt), address(t));

        communities.push(address(community));

        return address(community);
    }
}
