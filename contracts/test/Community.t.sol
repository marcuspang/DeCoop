// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/core/Community.sol";
import "../src/core/CommunityFactory.sol";

contract CommunityTest is Test, ERC721TokenReceiver, CallbackERC20Receiver {
    CommunityFactory public communityFactory;

    Community public community;
    CallbackERC20 public communityToken;
    SoulBoundToken public soulboundToken;

    event Deposit(address indexed from, uint256 amount);
    event Withdraw(address indexed to, uint256 amount);


    function setUp() public {
        communityFactory = new CommunityFactory();

        community = Community(communityFactory.create("DECOOP")); 
        communityToken = CallbackERC20(community.communityToken()); 
        soulboundToken = SoulBoundToken(community.soulboundToken()); 

        communityToken.mint(address(this), 10e8);

        vm.etch(address(this), "");
    }

    function testEverything() public {
        // Join community
        community.joinCommunity();

        vm.expectEmit(true, true, false, true);
        emit Deposit(address(this), 1e8);


        // Deposit
        communityToken.transfer(address(community), 1e8);

        assertEq(communityToken.balanceOf(address(community)), 1e8);


        vm.expectEmit(true, true, false, true);
        emit Withdraw(address(this), 1e6);

        community.withdraw(1e6);

        assertEq(communityToken.balanceOf(address(community)), 1e8 - 1e6);
        assertEq(communityToken.balanceOf(address(this)), 10e8 - 1e8 + 1e6);
    }

}
