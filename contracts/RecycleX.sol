// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RecycleX is ERC20, ERC20Burnable, ERC20Permit, Ownable {

    constructor() ERC20("RecycleX", "RCX") ERC20Permit("RecycleX") Ownable(msg.sender) {
        _mint(msg.sender, 1500000000 * 10 ** decimals());
    }

    // Permit (EIP-2612)
    function permitAndTransfer(
        address owner,
        address spender,
        uint256 amount,
        uint256 deadline,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) public {
        permit(owner, spender, amount, deadline, v, r, s);
        _transfer(owner, spender, amount);
    }
}