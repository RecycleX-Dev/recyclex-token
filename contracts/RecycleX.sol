// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable2Step.sol";

contract RecycleX is ERC20, ERC20Burnable, ERC20Permit, Ownable2Step {
    constructor(address multisigWallet) ERC20("RecycleX", "RCX") ERC20Permit("RecycleX") {
        require(multisigWallet != address(0), "Invalid multisig wallet address");
        _mint(multisigWallet, 1500000000 * 10 ** decimals());
    }

    function permitAndTransfer(
        address owner,
        address spender,
        uint256 amount,
        uint256 deadline,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) public {
        uint256 currentAllowance = allowance(owner, spender);

        if (currentAllowance < amount) {
            permit(owner, spender, amount, deadline, v, r, s);
        }
        require(allowance(owner, spender) >= amount, "ERC20: insufficient allowance");

        _spendAllowance(owner, spender, amount);
        _transfer(owner, spender, amount);
    }
}
