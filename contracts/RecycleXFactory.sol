// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./RecycleX.sol";

contract RecycleXFactory {
    event Deployed(address indexed contractAddress);

    function deploy(bytes32 salt) public {
        RecycleX rcx = new RecycleX{salt: salt}();
        emit Deployed(address(rcx));
    }

    function getAddress(bytes32 salt) public view returns (address) {
        return address(uint160(uint(keccak256(abi.encodePacked(
            bytes1(0xff),
            address(this),
            salt,
            keccak256(type(RecycleX).creationCode)
        )))));
    }
}
